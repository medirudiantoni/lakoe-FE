import { Field } from '@/components/ui/field';
import { fetchLogin } from '@/features/auth/services/auth-buyer-services';
import { useSellerStore } from '@/hooks/store';
import { Box, Button, Image, Input, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/features/auth/store/auth-store';

const loginSchema = z.object({
  email: z.string().email('Email yang anda masukan salah'),
  password: z.string().min(6, 'Password yang anda masukan salah'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function LoginBuyer() {
  const { store } = useSellerStore();
  const navigate = useNavigate();
  const{setUser} = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    toast.promise(
      fetchLogin(data),
      {
        loading: 'Sedang login...',
        success: (res) => {
          const responseData = res.data;
            setUser(responseData.user)
          Cookies.set('token', responseData.token)
          navigate(`/${store?.name}/`);
          return responseData.message;
        },
      },
      {
        success: {
          style: {
            backgroundColor: '#FFFF',
            color: '#1d1d1d',
          },
        },
        error: {
          style: {
            backgroundColor: '#FFFF',
            color: '#1d1d1d',
          },
        },
      }
    );
  };
  return (
    <Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        width={'100vw'}
        pt={'8'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box w={'full'} maxW={'sm'} mx={'auto'}>
          <VStack w={'full'}>
            <Image src={store?.logoAttachment} width={133}></Image>
            <Text mb={5} fontSize={'22px'} fontWeight={'semibold'}>
              Login ke {store?.name}
            </Text>
          </VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Box display={'flex'} flexDirection={'column'} gap={5}>
            <Field label="Email">
              <Input placeholder="Masukan Email" {...register('email')}/>
              {errors.email && (
                <Text    color="red.500"
                fontSize="xs"
                textAlign={'left'}
                marginTop="1.5">
                    {errors.email.message}
                </Text>
              )}
            </Field>
            <Field label="Password">
              <Input placeholder="Masukan Password" {...register('password')} />
              {errors.password && (
                <Text
                color="red.500"
                fontSize="xs"
                textAlign={'left'}
                marginTop="1.5">
                    {errors.password.message}
                </Text>
              )}
            </Field>
            <Box>
              <Button width={'full'} type='submit'>Login</Button>
              <Button
                bg="white"
                color="black"
                width={'full'}
                borderRadius={'7px'}
                type="button"
                mt={2}
              >
                <Image w="10" h="10" src="/google-icon.webp"></Image>
              </Button>
              <Text textAlign={'center'} mt={2}>
                Belum punya akun? silakan{' '}
                <Link to={'/register-buyer'} className="text-blue-400">
                  daftar di sini
                </Link>
              </Text>
            </Box>
          </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
