import LoadingButtonLottie from '@/components/icons/loading-button';
import LogoIcon from '@/components/icons/logo';
import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { fetchLogin } from '@/features/auth/services/auth-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { apiURL } from '@/utils/baseurl';
import { Box, Button, Image, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, 'Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    setIsLoading(true);
    toast.promise(
      fetchLogin(data)
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            setUser(data.user);
            console.log('text', data);
            Cookies.set('token', data.token);
            data.user.Stores
              ? navigate('/dashboard')
              : navigate('/register-store');
            return data.message;
          }
        })
        .catch((error) => {
          throw error.message || 'An error occurred while logging in.';
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        loading: 'Sedang login...',
        success: (message) => <div>{message}</div>,
        error: (err) => <div>{err}</div>,
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

  const onClickGoogle = () => {
    setIsLoading(true);
    window.location.href = `${apiURL}auth/google`;
  };

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      pt={20}
      flexDirection={'column'}
      width={'100vw'}
      height={'100vh'}
    >
      <LogoIcon />
      <Box width={'25%'} mt={5}>
        <Text
          py={'5'}
          textAlign={'center'}
          fontSize={'28px'}
          fontWeight={'semibold'}
        >
          Login
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field label="Email">
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
          <Field label="Password" mt={5}>
            <PasswordInput
              placeholder="Masukan password"
              {...register('password')}
            />

            {errors.password && (
              <Text
                color="red.500"
                fontSize="xs"
                textAlign={'left'}
                marginTop="1.5"
              >
                {errors.password.message}
              </Text>
            )}
          </Field>
          <Text textAlign={'right'} mt={2} color={'blue.400'}>
            Lupa password?
          </Text>
          <Button
            colorPalette={'blue'}
            width={'full'}
            borderRadius={'7px'}
            mt={3}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <LoadingButtonLottie /> : 'Masuk'}
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

        <Text textAlign={'center'} mt={2}>
          Belum punya akun? silakan{' '}
          <Link to={'/register'} className="text-blue-400">
            daftar di sini
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
