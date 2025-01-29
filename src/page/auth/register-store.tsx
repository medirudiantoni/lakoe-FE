import LogoIcon from '@/components/icons/logo';
import { Field } from '@/components/ui/field';
import { useAuthStore } from '@/features/auth/auth-store/auth-store';
import { CreatedStore } from '@/features/auth/services/store-service';
import { StoreFormProps } from '@/features/auth/types/store-types';
import {
  Box,
  Button,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export function RegisterStore() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreFormProps>();

  // useEffect(() => {
  //   console.log('user data:', user);
  // }, [user]);

  const [isLoading, setIsLoading] = useState(false);
  const [previewLogoUrl, setPreviewLogoUrl] = useState<string | null>(null);
  const [previewBannerUrl, setPreviewBannerUrl] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { user, setUser } = useAuthStore();

  const navigate = useNavigate();
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

  const onSubmit = (data: StoreFormProps) => {
    setIsLoading(true);
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    const userId = user.id;
    const updatedData = {
      ...data,
      userId,
      logoAttachment: bannerFile ?? null,
      bannerAttachment: logoFile ?? null,
    };

    toast.promise(
      CreatedStore(updatedData, userId)
        .then((res) => {
          if (res.status === 201) {
            const data = res.data;
            console.log('data', data);

            setUser({ ...user, stores: data.store });
            navigate('/dashboard');
            return res.data.message;
          } else {
            throw new Error('Unexpected status code: ' + res.status);
          }
        })
        .catch((error) => {
          throw (
            error.message || 'An error occurred while processing the request.'
          );
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        loading: 'Submitting your information...',
        success: (message) => `Success: ${message}`,
        error: (err) => `Error: ${err}`,
      },
      {
        position: 'top-center',
        style: {
          background: '#FFFF',
          color: '#1d1d1d',
          fontWeight: 'normal',
        },
      }
    );
  };

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      //   justifyContent={'center'}
      mt={24}
      flexDirection={'column'}
    >
      <LogoIcon />
      <Box width={'30%'} mt={5}>
        <Text
          py={'5'}
          textAlign={'center'}
          fontSize={'28px'}
          fontWeight={'semibold'}
        >
          Daftarkan toko anda
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Box gap={3} py={'5'}>
            <Box>
              <Stack gap="4" align="flex-start" width={'full'}>
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
                  />
                </Field>
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
                  />
                </Field>

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
                        message:
                          'Deskripsi tidak boleh lebih dari 500 karakter.',
                      },
                    })}
                    placeholder="Masukkan deskripsi untuk toko..."
                    h={'124px'}
                  />
                </Field>
                <Field label="Banner Picture">
                  <Box
                    position="relative"
                    width="full"
                    height="150px"
                    borderRadius="md"
                    overflow="hidden"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    border={previewBannerUrl ? 'none' : '2px dashed'}
                    borderColor={previewBannerUrl ? 'none' : 'gray.200'}
                  >
                    {previewBannerUrl ? (
                      <Image
                        {...register('logoAttachment')}
                        src={previewBannerUrl}
                        alt="Preview Logo"
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    ) : (
                      <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="gray.500"
                      >
                        Upload banner toko
                      </Box>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      position="absolute"
                      width="100%"
                      height="100%"
                      opacity="0"
                      cursor="pointer"
                      onChange={handleFileBannerChange}
                    />
                  </Box>
                </Field>
                <Field label="Logo Picture">
                  <Box
                    position="relative"
                    width="250px"
                    height="200px"
                    borderRadius="md"
                    overflow="hidden"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    border={previewLogoUrl ? 'none' : '2px dashed'}
                    borderColor={previewLogoUrl ? 'none' : 'gray.200'}
                  >
                    {previewLogoUrl ? (
                      <Image
                        src={previewLogoUrl}
                        alt="Preview Logo"
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    ) : (
                      <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="gray.500"
                      >
                        Upload logo toko
                      </Box>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      position="absolute"
                      width="100%"
                      height="100%"
                      opacity="0"
                      cursor="pointer"
                      onChange={handleFileLogoChange}
                    />
                  </Box>
                </Field>
                <Button
                  colorPalette={'blue'}
                  type="submit"
                  w={'full'}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="sm" /> : 'Buat toko'}
                </Button>
              </Stack>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
