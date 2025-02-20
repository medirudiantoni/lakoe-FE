import LoadingButtonLottie from '@/components/icons/loading-button';
import { Field } from '@/components/ui/field';
import { fetchStore, updateStore } from '@/features/auth/services/store-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { StoreFormProps } from '@/features/auth/types/store-types';
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
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
export function InformationSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
 } = useForm<StoreFormProps>();
 
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();
  const storeId = user?.Stores?.id;
  const [isEditing, setIsEditing] = useState(false);
  const [previewLogoUrl, setPreviewLogoUrl] = useState<string | null>(null);
  const [previewBannerUrl, setPreviewBannerUrl] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [ isLoading, setIsLoading] = useState(false)

  const { data: storeData, isFetching} = useQuery({
    queryKey: ["store", storeId],
    queryFn: async () => {
      const token = Cookies.get("token");
      if (!storeId || !token) throw new Error("Store ID atau token tidak ditemukan.");
      return await fetchStore(storeId, token);
    },
    enabled: !!storeId,
  });
  

  const { data: banks = []} = useQuery({
    queryKey: ["banks"],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}bank`);
      return response.data;
    },
  });

  useEffect(() => {
    if (storeData) {
      setValue("name", storeData.name || "");
      setValue("slogan", storeData.slogan || "");
      setValue("description", storeData.description || "");
      setPreviewLogoUrl(storeData.logoAttachment || null);
      setPreviewBannerUrl(storeData.bannerAttachment || null);
      if (storeData.bankAccounts?.length) {
        setValue("bankAccounts", storeData.bankAccounts);
      }
    }
  }, [storeData, setValue]);

  const onSubmit = (data: StoreFormProps, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    mutation.mutate(data);
  };
  const mutation = useMutation({
    mutationFn: async (data: StoreFormProps) => {
      if (!storeId) throw new Error("Store ID tidak ditemukan.");
      setIsLoading(true);
  
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slogan", data.slogan);
      formData.append("description", data.description);
  
      if (logoFile) formData.append("logoAttachment", logoFile);
      if (bannerFile) formData.append("bannerAttachment", bannerFile);
  
      if (data.bankAccounts.length > 0) {
        formData.append("bankAccounts", JSON.stringify(data.bankAccounts));
      }
  
      return await updateStore(formData, storeId);
    },
  
    onSuccess: async (response) => {
      console.log("Response dari server:", response);
  
      if (!user?.id) {
        console.error("User ID tidak ditemukan");
        setIsLoading(false);
        return;
      }

      queryClient.setQueryData<StoreFormProps>(["store", storeId], response.data.store);

      queryClient.setQueryData<StoreFormProps["bankAccounts"]>(["banks"], (oldBanks) => {
        return response.data.store.bankAccounts
          ? oldBanks?.map((bank) =>
              response.data.store.bankAccounts.some((updatedBank: StoreFormProps["bankAccounts"][number]) => 
                updatedBank.bankId === bank.bankId
              )
                ? response.data.store.bankAccounts.find(
                    (updatedBank: StoreFormProps["bankAccounts"][number]) => updatedBank.bankId === bank.bankId
                  )
                : bank
            ) ?? []
          : oldBanks ?? [];
      });
      
      if (!user?.id) {
        console.error("User ID tidak ditemukan");
        return;
      }
      
      setUser({
        ...user,
        Stores: response.data,
      });
      
  
      setPreviewLogoUrl(
        logoFile ? URL.createObjectURL(logoFile) : response.data.store.logoAttachment
      );
      setPreviewBannerUrl(
        bannerFile ? URL.createObjectURL(bannerFile) : response.data.store.bannerAttachment
      );
  
      reset({
        ...response.data.store,
        bankAccounts: response.data.store.bankAccounts || [],
      });
  
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 500)),
        {
          loading: "Menyimpan perubahan...",
          success: "Toko berhasil diperbarui!",
          error: "Gagal memperbarui toko.",
        }
      );
  
      setIsEditing(false);
      setIsLoading(false);
    },
  
    onError: () => {
      toast.error("Gagal memperbarui toko.");
      setIsLoading(false);
    },
  });
  

  
  const toggleEdit = () => setIsEditing(!isEditing);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event, setLogoFile, setPreviewLogoUrl);
  };
  
  const handleFileBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event, setBannerFile, setPreviewBannerUrl);
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
              <Skeleton height="25px" width={'140px'} />
              <Box display={'flex'} width={'full'} gap={3} mt={3}>
                <Skeleton height="185px" width={'full'} />
              </Box>
            </GridItem>
          </Grid>
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
          <Grid templateColumns="repeat(2, 1fr)" gap={3} py="5">
            <GridItem>
            <Field label="Pilih Bank" invalid={!!errors.bankAccounts?.[0]?.bankId} errorText={errors.bankAccounts?.[0]?.bankId?.message} mt={4}>
  <select
    {...register('bankAccounts.0.bankId', { required: 'Bank wajib dipilih.' })}
    disabled={!isEditing}
    style={{
      width: '100%',
      padding: '8px',
      borderRadius: '6px',
      border: '1px solid #ccc',
    }}
  >
    <option value="">Bank</option>
    {banks.map((bank: any) => (
      <option key={bank.id} value={bank.id}>
        {bank.name}
      </option>
    ))}
  </select>
</Field>

<Field label="Nama Pemilik Rekening" invalid={!!errors.bankAccounts?.[0]?.accName} errorText={errors.bankAccounts?.[0]?.accName?.message} mt={4}>
  <Input
    {...register('bankAccounts.0.accName', { required: 'Nama pemilik rekening wajib diisi.' })}
    placeholder="Nama pemilik rekening"
    disabled={!isEditing}
  />
</Field>


            </GridItem>
            <GridItem>

            <Field label="Nomor Rekening" invalid={!!errors.bankAccounts?.[0]?.accNumber} errorText={errors.bankAccounts?.[0]?.accNumber?.message} mt={4}>
  <Input
    {...register('bankAccounts.0.accNumber', { required: 'Nomor rekening wajib diisi.' })}
    placeholder="Masukkan nomor rekening"
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
            <Button
              onClick={toggleEdit}
              colorPalette={isEditing ? 'red' : 'blue'}
            >
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
