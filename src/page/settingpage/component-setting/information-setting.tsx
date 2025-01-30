import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { Field } from '@/components/ui/field';
import { useAuthStore } from '@/features/auth/auth-store/auth-store';
import {
  fetchStore,
  updateStore,
} from '@/features/auth/services/store-service';
import { StoreFormProps } from '@/features/auth/types/store-types';
import LoadingButtonLottie from '@/components/icons/loading-button';

export function InformationSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StoreFormProps>();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [storeData, setStoreData] = useState<StoreFormProps>();
  const [isFetching, setIsFetching] = useState(true); 
  const { user, setUser } = useAuthStore();
  const [previewLogoUrl, setPreviewLogoUrl] = useState<string | null>(null);
  const [previewBannerUrl, setPreviewBannerUrl] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const storeId = user?.Stores.id;

  useEffect(() => {
    const token = Cookies.get("token")
    console.log("storeId: ", storeId)
    if (storeId) {
      setIsFetching(true);
      fetchStore(storeId, token!)
        .then((data) => {
          setStoreData(data);
          setPreviewLogoUrl(data.logoAttachment || null);
          setPreviewBannerUrl(data.bannerAttachment || null);
        })
        .catch(() => {
          toast.error('Gagal mengambil data toko.');
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [storeId]);

  useEffect(() => {
    if (storeData) {
      setValue('name', storeData.name || '');
      setValue('slogan', storeData.slogan || '');
      setValue('description', storeData.description || '');
    }
  }, [storeData, setValue]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: StoreFormProps) => {
    if (!storeId) {
      toast.error('Store ID tidak ditemukan.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slogan', data.slogan);
    formData.append('description', data.description);
    if (logoFile) {
      formData.append('logoAttachment', logoFile);
    }
    if (bannerFile) {
      formData.append('bannerAttachment', bannerFile);
    }

    toast
      .promise(
        updateStore(formData, storeId)
          .then((response) => {
            setStoreData(response.data);
            setUser({ ...user, Stores: response.data });
            setIsEditing(false);
          })
          .catch((error) => {
            console.error('Gagal memperbarui toko:', error);
            throw error;
          }),
        {
          loading: 'Memperbarui toko...',
          success: 'Toko berhasil diperbarui.',
          error: 'Gagal memperbarui toko.',
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFileBannerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setBannerFile(file);
      setPreviewBannerUrl(URL.createObjectURL(file));
    }
  };

  const handleFileLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setLogoFile(file);
      setPreviewLogoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="semibold" fontSize="20px">
          Informasi Pribadi
        </Text>
      </Flex>
      {isFetching ? (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Grid templateColumns={'repeat(2, 1fr)'} gap={3} py={'5'}>
              <GridItem>
                <Box>
                  <Stack gap="4" align="flex-start" width={'full'}>
                    <Skeleton height="25px" width={'full'} />
                    <Skeleton height="25px" width={'full'} />
                  </Stack>
                </Box>
              </GridItem>
              <GridItem>
                <Skeleton height="66px" width={'full'} />
              </GridItem>
            </Grid>
            <Grid templateColumns={'1fr 4fr'}>
              <GridItem>
                <Skeleton height="25px" width={'120px'} />
                <Box display={'flex'} width={'full'} gap={3} mt={3}>
                  <Skeleton height="185px" width={'90%'} />
                </Box>
              </GridItem>
              <GridItem>
                <GridItem>
                  <Skeleton height="25px" width={'140px'} />
                  <Box display={'flex'} width={'full'} gap={3} mt={3}>
                    <Skeleton height="185px" width={'full'} />
                  </Box>
                </GridItem>
              </GridItem>
            </Grid>
          </form>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Grid templateColumns="repeat(2, 1fr)" gap={3} py="5">
            <GridItem>
              <Field
                label="Slogan"
                invalid={!!errors.slogan}
                errorText={errors.slogan?.message}
              >
                <Input
                  {...register('slogan', { required: 'Slogan wajib diisi.' })}
                  placeholder="Buat slogan untuk toko"
                  disabled={!isEditing}
                />
              </Field>
              <Field
                label="Nama Toko"
                invalid={!!errors.name}
                errorText={errors.name?.message}
                mt={4}
              >
                <Input
                  {...register('name', { required: 'Nama Toko wajib diisi.' })}
                  placeholder="Buat nama untuk toko"
                  disabled={!isEditing}
                />
              </Field>
            </GridItem>
            <GridItem>
              <Field
                label="Deskripsi"
                invalid={!!errors.description}
                errorText={errors.description?.message}
              >
                <Textarea
                  {...register('description', {
                    required: 'Deskripsi wajib diisi.',
                    maxLength: {
                      value: 500,
                      message: 'Maksimal 500 karakter.',
                    },
                  })}
                  placeholder="Masukkan deskripsi untuk toko..."
                  h={'122px'}
                  disabled={!isEditing}
                />
              </Field>
            </GridItem>
          </Grid>
          <Grid templateColumns="1fr 4fr">
            <GridItem>
              <Text fontWeight="semibold" fontSize="20px" mb={3}>
                Logo Toko
              </Text>
              <Box
                width="200px"
                height="200px"
                borderRadius="md"
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border={!previewLogoUrl ? '2px dashed gray' : 'none'}
              >
                {previewLogoUrl ? (
                  <Image
                    src={previewLogoUrl}
                    alt="Logo Toko"
                    width="100%"
                    height="100%"
                    border={'1px solid'}
                    borderColor={'gray.200'}
                    borderRadius={'md'}
                  />
                ) : (
                  <Text color="gray.500">Upload logo toko</Text>
                )}
                {isEditing && (
                  <Input
                    type="file"
                    accept="image/*"
                    position="absolute"
                    width="200px"
                    height="200px"
                    opacity="0"
                    cursor="pointer"
                    onChange={handleFileLogoChange}
                  />
                )}
              </Box>
            </GridItem>
            <GridItem>
              <Text fontWeight="semibold" fontSize="20px" mb={3}>
                Banner Toko
              </Text>
              <Box
                width="full"
                height="200px"
                borderRadius="md"
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border={!previewBannerUrl ? '2px dashed gray' : 'none'}
              >
                {previewBannerUrl ? (
                  <Image
                    src={previewBannerUrl}
                    alt="Banner Toko"
                    width="100%"
                    height="100%"
                    border={'1px solid'}
                    borderColor={'gray.200'}
                    borderRadius={'md'}
                  />
                ) : (
                  <Text color="gray.500">Upload banner toko</Text>
                )}
                {isEditing && (
                  <Input
                    type="file"
                    accept="image/*"
                    position="absolute"
                    width="80%"
                    px={0}
                    height="200px"
                    opacity="0"
                    cursor="pointer"
                    onChange={handleFileBannerChange}
                  />
                )}
              </Box>
            </GridItem>
          </Grid>

          <Box textAlign="right" mt={10}>
            <Button onClick={toggleEdit} colorPalette={isEditing ? 'red' : 'blue'}>
              {isEditing ? 'Batal' : 'Edit'}
            </Button>
            {isEditing && (
              <Button colorPalette="blue" type="submit" disabled={isLoading}>
                {isLoading ? <LoadingButtonLottie /> : 'Perbarui'}
              </Button>
            )}
          </Box>
        </form>
      )}
    </Box>
  );
}
