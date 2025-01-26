import LogoIcon from '@/components/icons/logo';
import { Field } from '@/components/ui/field';
import { fetchRegister } from '@/features/auth/services/auth-service';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {

    fetchRegister(data) //api
    .then((res) => {
      console.log(res);
      const data = res.data;
      if (res.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: data.message,
          icon: 'success',
          confirmButtonColor: 'blue',
          background: '#FFFF',
          color: '#1d1d1d',
          allowOutsideClick: false,
        }).then(() => {
          navigate('/login');
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
          <Field label="Nama"  >
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
         
          <Field label="Email"  mt={2}>
            <Input placeholder="Masukan email"       {...register('email')}/>
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
          <Field label="Password" mt={2} >
            <Input placeholder="Masukan password" {...register('password')}  />
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
          {/* <Field label="Konfirmasi Password" mt={2} >
                <Input placeholder="Masukan password kembali" />
                </Field> */}
      
            <Button
              colorPalette={'blue'}
              width={'full'}
              borderRadius={'7px'}
              mt={3}
              type="submit"
            >
              Daftar
            </Button>
        
        </form>
        <Text textAlign={'center'} mt={'2'}>
          Dengan menekan tombol Daftar maka kamu setuju dengan{' '}
          <span className="text-blue-400"> Syarat & Ketentuan </span> dan 
          <span className="text-blue-400"> Kebijakan Privasi </span>
        </Text>
      </Box>
    </Box>
  );
}
