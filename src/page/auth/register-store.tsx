import LogoIcon from '@/components/icons/logo';
import { Field } from '@/components/ui/field';

import { CreatedStore } from '@/features/auth/services/store-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
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
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import BankDropdown from './dropdown';
// import BankForm from './formBank';


type Bank = {
  id: string;
  name: string;
};

export function RegisterStore() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreFormProps>();

  const [isLoading, setIsLoading] = useState(false);
  const [previewLogoUrl, setPreviewLogoUrl] = useState<string | null>(null);
  const [previewBannerUrl, setPreviewBannerUrl] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // State untuk akun bank
  const [accName, setAccName] = useState('');
  const [accNumber, setAccNumber] = useState('');

  // State untuk menyimpan bank yang dipilih
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleFileLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setLogoFile(file);
      setPreviewLogoUrl(URL.createObjectURL(file));
    }
  };

  const handleFileBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setBannerFile(file);
      setPreviewBannerUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: StoreFormProps) => {
    setIsLoading(true);
    const token = Cookies.get('token');
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    const userId = user.id;
    const updatedData = {
      ...data,
      userId,
      logoAttachment: logoFile ?? null,
      bannerAttachment: bannerFile ?? null,
      accName: accName || null,
      accNumber: accNumber || null,
      bankId: selectedBank ? selectedBank.id : null, // Tambahkan bankId
    };

    toast.promise(
      CreatedStore(updatedData, userId, token!)
        .then((res) => {
          if (res.status === 201) {
            const data = res.data;
            console.log('data', data);
            setUser({ ...user, Stores: data.store });
            navigate('/dashboard');
            return res.data.message;
          } else {
            throw new Error('Unexpected status code: ' + res.status);
          }
        })
        .catch((error) => {
          throw error.message || 'Terjadi kesalahan saat memproses permintaan.';
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        loading: 'Sedang membuat toko...',
        success: (message) => `${message}`,
        error: (err) => `${err}`,
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
    <Box display={'flex'} alignItems={'center'} mt={24} flexDirection={'column'}>
      <LogoIcon />
      <Box width={'30%'} mt={5}>
        <Text py={'5'} textAlign={'center'} fontSize={'28px'} fontWeight={'semibold'}>
          Daftarkan toko anda
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Box gap={3} py={'5'}>
            <Box>
              <Stack gap="4" align="flex-start" width={'full'}>
                <Field label="Nama Toko" invalid={!!errors.name} errorText={errors.name?.message}>
                  <Input {...register('name', { required: 'Nama Toko is required' })} placeholder="Buat nama untuk toko" />
                </Field>

                <Field label="Slogan" invalid={!!errors.slogan} errorText={errors.slogan?.message}>
                  <Input {...register('slogan', { required: 'Slogan is required' })} placeholder="Buat slogan untuk toko" />
                </Field>

                <Field label="Deskripsi" invalid={!!errors.description} errorText={errors.description?.message}>
                  <Textarea {...register('description', { required: 'Deskripsi is required', maxLength: { value: 500, message: 'Deskripsi tidak boleh lebih dari 500 karakter.' } })} placeholder="Masukkan deskripsi untuk toko..." h={'124px'} />
                </Field>

                {/* Tambahan Input Akun Bank */}
                <Field label="Nama Pemilik Rekening">
                  <Input value={accName} onChange={(e) => setAccName(e.target.value)} placeholder="Masukkan nama pemilik rekening" />
                </Field>

                <Field label="Nomor Rekening">
                  <Input type="number" value={accNumber} onChange={(e) => setAccNumber(e.target.value)} placeholder="Masukkan nomor rekening" />
                </Field>

                {/* Dropdown Pilihan Bank */}
                <Field label="Pilih Bank">
                  <BankDropdown onSelect={(bank) => setSelectedBank(bank)} />
                </Field>

                <Field label="Banner Picture">
                  <Box position="relative" width="full" height="150px" borderRadius="md" overflow="hidden" display="flex" alignItems="center" justifyContent="center" cursor="pointer" border={previewBannerUrl ? 'none' : '2px dashed'} borderColor={previewBannerUrl ? 'none' : 'gray.200'}>
                    {previewBannerUrl ? (
                      <Image src={previewBannerUrl} alt="Preview Banner" objectFit="cover" width="100%" height="100%" />
                    ) : (
                      <Box position="absolute" width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" color="gray.500">
                        Upload banner toko
                      </Box>
                    )}
                    <Input type="file" accept="image/*" position="absolute" width="100%" height="100%" opacity="0" cursor="pointer" onChange={handleFileBannerChange} />
                  </Box>
                </Field>

                <Field label="Logo Picture">
                  <Box position="relative" width="250px" height="200px" borderRadius="md" overflow="hidden" display="flex" alignItems="center" justifyContent="center" cursor="pointer" border={previewLogoUrl ? 'none' : '2px dashed'} borderColor={previewLogoUrl ? 'none' : 'gray.200'}>
                    {previewLogoUrl ? (
                      <Image src={previewLogoUrl} alt="Preview Logo" objectFit="cover" width="100%" height="100%" />
                    ) : (
                      <Box position="absolute" width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" color="gray.500">
                        Upload logo toko
                      </Box>
                    )}
                    <Input type="file" accept="image/*" position="absolute" width="100%" height="100%" opacity="0" cursor="pointer" onChange={handleFileLogoChange} />
                  </Box>
                </Field>

                <Button colorPalette={'blue'} type="submit" w={'full'} disabled={isLoading}>
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

