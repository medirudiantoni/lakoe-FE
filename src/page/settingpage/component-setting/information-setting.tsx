import { Field } from '@/components/ui/field';
import { useAuthStore } from '@/features/auth/auth-store/auth-store';
import {
  fetchStore,
  updateStore,
} from '@/features/store/services/store-service';
import { StoreFormProps } from '@/features/store/types/store-types';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function InformationSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<StoreFormProps>();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Kontrol mode edit
  const [storeData, setStoreData] = useState<StoreFormProps>();
  const { setUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const [previewLogoUrl, setPreviewLogoUrl] = useState<string | null>(null);
  const [previewBannerUrl, setPreviewBannerUrl] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const storeId = user?.stores.id;

  // Fetch data store dari backend
  useEffect(() => {
    if (storeId) {
      fetchStore(storeId)
        .then((data) => {
          setStoreData(data);
          setPreviewLogoUrl(data.logoAttachment || null);
          setPreviewBannerUrl(data.bannerAttachment || null);
          console.log('logoooo:', data);
        })
        .catch(() => {
          setError('Failed to fetch store data.');
        });
    }
  }, [storeId]);

  // Mengisi nilai default form saat data store tersedia
  useEffect(() => {
    if (storeData) {
      setValue('name', storeData.name || '');
      setValue('slogan', storeData.slogan || '');
      setValue('description', storeData.description || '');
    }
  }, [storeData, setValue]);

  const toggleEdit = () => {
    setIsEditing(!isEditing); // Mengaktifkan/menonaktifkan mode edit
  };

  const onSubmit = async (data: StoreFormProps) => {
    if (!storeId) {
      setError('Store ID not found.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
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

      console.log('FormData contents:', Object.fromEntries(formData.entries()));

      const response = await updateStore(formData, storeId);
      setStoreData(response.data);
      setUser({ ...user, stores: response.data }); // Update user store
      toast.success('Store updated successfully!');
      setIsEditing(false); // Nonaktifkan mode edit setelah sukses
    } catch (error) {
      toast.error('Failed to update store.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileBannerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setBannerFile(file);
        setPreviewBannerUrl(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoFile(file);
        setPreviewLogoUrl(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'semibold'} fontSize={'20px'}>
          Informasi Pribadi
        </Text>
        <Button onClick={toggleEdit} colorScheme="blue">
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Grid
          templateColumns={'repeat(2, 1fr)'}
          gap={3}
          borderBottom={'1px solid'}
          borderColor={'gray.300'}
          py={'5'}
        >
          <GridItem>
            <Box>
              <Stack gap="4" align="flex-start" width={'full'}>
                <Field
                  label="Slogan"
                  invalid={!!errors.slogan}
                  errorText={errors.slogan?.message}
                >
                  <Input
                    {...register('slogan', {
                      required: 'Slogan is required',
                    })}
                    placeholder="Buat slogan untuk toko"
                    disabled={!isEditing}
                  />
                </Field>
                <Field
                  label="Nama Toko"
                  invalid={!!errors.name}
                  errorText={errors.name?.message}
                >
                  <Input
                    {...register('name', {
                      required: 'Nama Toko is required',
                    })}
                    placeholder="Buat nama untuk toko"
                    disabled={!isEditing}
                  />
                </Field>
              </Stack>
            </Box>
          </GridItem>
          <GridItem>
            <Field
              label="Deskripsi"
              invalid={!!errors.description}
              errorText={errors.description?.message}
            >
              <Textarea
                {...register('description', {
                  required: 'Deskripsi is required',
                  maxLength: {
                    value: 500,
                    message: 'Deskripsi tidak boleh lebih dari 500 karakter.',
                  },
                })}
                placeholder="Masukkan deskripsi untuk toko..."
                h={'124px'}
                disabled={!isEditing}
              />
            </Field>
          </GridItem>
        </Grid>
        <Grid templateColumns={'1fr 4fr'}>
          <GridItem>
            <Flex justifyContent={'space-between'} alignItems={'center'} my={5}>
              <Text fontWeight={'semibold'} fontSize={'20px'}>
                Logo Toko
              </Text>
            </Flex>
            <Box display={'flex'} width={'full'} gap={3}>
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
                    objectFit="cover"
                    width="100%"
                    height="100%"
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
            </Box>
          </GridItem>
          <GridItem>
            <Flex justifyContent={'space-between'} alignItems={'center'} my={5}>
              <Text fontWeight={'semibold'} fontSize={'20px'}>
                Banner Toko
              </Text>
            </Flex>
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
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              ) : (
                <Text color="gray.500">Upload banner toko</Text>
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
                  onChange={handleFileBannerChange}
                />
              )}
            </Box>
          </GridItem>
        </Grid>

        {isEditing && (
          <Box textAlign={'right'}>
            <Button colorScheme="blue" type="submit" mt={10}>
              Update
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
}
