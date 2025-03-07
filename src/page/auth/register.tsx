import LogoIcon from '@/components/icons/logo';
import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { fetchRegister } from '@/features/auth/services/auth-service';
import { apiURL } from '@/utils/baseurl';
import { Box, Button, Image, Input, Spinner, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(12, 'Invalid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    setIsLoading(true);

    toast
      .promise(
        fetchRegister(data),
        {
          loading: 'Sedang mendaftarkan akun',
          success: (res) => {
            const responseData = res.data;
            navigate('/login');
            return responseData.message;
          },
          error: (error) => {
            return (
              error.message ||
              'An error occurred while registering. Please try again later.'
            );
          },
        },
        {
          success: {
            style: {
              background: '#ffffff',
              color: '#1d1d1d',
            },
          },
          error: {
            style: {
              background: '#ffffff',
              color: '#1d1d1d',
            },
          },
        }
      )
      .finally(() => setIsLoading(false));
  };

  const onClickGoogle = () => {
    setIsLoading(true);
    // window.location.href = 'http://localhost:5000/api/v1/auth/google';
    window.location.href = `${apiURL}auth/google`;
  };

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      // justifyContent={'center'}
      pt={20}
      flexDirection={'column'}
      width={'full'}
      height={'100vh'}
      position={'relative'}
    >
      <LogoIcon />
      <Link to={'/login'}>
        <Text
          position={'absolute'}
          top={25}
          right={30}
          color={'blue.600'}
          fontWeight={'semibold'}
        >
          Masuk
        </Text>
      </Link>

      <Box width={'25%'} mt={5}>
        <Text
          py={'5'}
          textAlign={'center'}
          fontSize={'28px'}
          fontWeight={'semibold'}
        >
          Register
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Field label="Nama">
            <Input placeholder="Nama lengkap" {...register('name')} />
            {errors.name && (
              <Text
                color="red.500"
                fontSize="xs"
                textAlign={'left'}
                marginTop="1.5"
              >
                {errors.name.message}
              </Text>
            )}
          </Field>

          <Field label="Phone" mt={2}>
            <Input placeholder="Masukan no telepon" {...register('phone')} />
            {errors.phone && (
              <Text
                color="red.500"
                fontSize="xs"
                textAlign={'left'}
                marginTop={1.5}
              >
                {errors.phone.message}
              </Text>
            )}
          </Field>

          <Field label="Email" mt={2}>
            <Input placeholder="Masukan email" {...register('email')} />
            {errors.email && (
              <Text
                color="red.500"
                fontSize="xs"
                textAlign={'left'}
                marginTop="1.5"
              >
                {errors.email.message}
              </Text>
            )}
          </Field>
          <Field label="Password" mt={2}>
            <PasswordInput
              placeholder="Masukan password"
              {...register('password')}
            />
            {errors.password && (
              <Text
                color="red.500"
                fontSize="xs"
                textAlign={'left'}
                marginTop={1.5}
              >
                {errors.password.message}
              </Text>
            )}
          </Field>

          {/* <Field label="Konfirmasi Password" mt={2}>
            <Input
              placeholder="Masukan ulang password"
              {...register('password')}
            />
            {errors.password && (
              <Text
                color="red.500"
                fontSize="xs"
                textAlign={'left'}
                marginTop={1.5}
              >
                {errors.password.message}
              </Text>
            )}
          </Field> */}

          <Button
            colorPalette={'blue'}
            width={'full'}
            borderRadius={'7px'}
            mt={3}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : 'Daftar'}
          </Button>
          <Button
            bg="white"
            color="black"
            width={'full'}
            borderRadius={'7px'}
            mt={3}
            type="button"
            disabled={isLoading}
            onClick={onClickGoogle}
          >
            <Image w="10" h="10" src="/google-icon.webp"></Image>
          </Button>
        </form>
        <Text textAlign={'center'} mt={'2'}>
          Dengan menekan tombol Daftar maka kamu setuju dengan{' '}
          <span className="text-blue-400"> Syarat & Ketentuan </span> dan{' '}
          <span className="text-blue-400"> Kebijakan Privasi </span>
        </Text>
      </Box>
    </Box>
  );
}
