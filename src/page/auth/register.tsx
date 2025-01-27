import LogoIcon from '@/components/icons/logo';
import { Field } from '@/components/ui/field';
import { fetchRegister } from '@/features/auth/services/auth-service';
import { Box, Button, Input, Spinner, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email address'),
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
        fetchRegister(data), // API call
        {
          loading: 'Registering your account...',
          success: (res) => {
            const responseData = res.data;
            navigate('/login');
            return responseData.message || 'Registration successful!';
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

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      // justifyContent={'center'}
      pt={20}
      flexDirection={'column'}
      width={'100vw'}
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
            <Input placeholder="Masukan password" {...register('password')} />
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
