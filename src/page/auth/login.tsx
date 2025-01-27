import LogoIcon from '@/components/icons/logo';
import { Field } from '@/components/ui/field';
import { fetchLogin } from '@/features/auth/services/auth-service';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/features/auth/auth-store/auth-store';


const loginSchema = z.object({
  email: z.string().min(1, 'Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function Login() {
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
    fetchLogin(data)
      .then((res) => {
        const data = res.data;
        setUser(data.user);
    
        Cookies.set('token', data.token);
        if (res.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: data.message,
            icon: 'success',
            confirmButtonColor: 'blue',
            background: '#FFFF',
            color: '#1d1d1d',
            allowOutsideClick: true,
          }).then(() => {
            navigate('/dashboard');
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text:
            error.message ||
            'An error occurred while logging in. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#E53E3E',
          background: '#FFFF',
          color: '#1d1d1d',
          allowOutsideClick: false,
        });
      });
  };
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
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
        <Field label="Email" >
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
        <Field label="Password" mt={5} >
          <Input placeholder="Masukan password" {...register('password')} />
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
            type='submit'
          >
            Masuk
          </Button>
        </form>
        
        <Text textAlign={'center'}>
          Belum punya akun? silakan{' '}
          <Link to={'/register'} className="text-blue-400">
            daftar di sini
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
