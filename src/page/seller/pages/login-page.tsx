import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { fetchLogin } from '@/features/auth/services/auth-buyer-services';
import { fetchInitCart } from '@/features/auth/services/cart-service';
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import { useSellerStore } from '@/hooks/store';
import { apiURL } from '@/utils/baseurl';
import { Box, Button, Image, Input, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email yang anda masukan salah'),
  password: z.string().min(6, 'Password yang anda masukan salah'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function LoginBuyer() {
  const { store } = useSellerStore();
  const navigate = useNavigate();
  const { setBuyer } = useAuthBuyerStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const requestData = {
      email: data.email,
      password: data.password,
      storeName: store?.name,
    };
    toast.promise(
      fetchLogin(requestData),
      {
        loading: 'Sedang login...',
        success: (res) => {
          const data = res.data;
          setBuyer(data.buyer);
          Cookies.set(`token-buyer-${store?.name}`, data.token);
          initOrCheckBuyerCart(data.buyer.id, String(store?.id), data.token);
          navigate(`/${store?.name}/`);
          return data.message;
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
  const onClickGoogle = () => {
    //   setIsLoading(true);
    window.location.href = `${apiURL}auth-buyer/google/`;
  };

  function initOrCheckBuyerCart(
    buyerId: string,
    storeId: string,
    tokenBuyer: string
  ) {
    fetchInitCart(buyerId, storeId, tokenBuyer)
      .then((res) => {
        console.log('res init cart: ', res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
                <Input placeholder="Masukan Email" {...register('email')} />
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
              <Field label="Password">
                <PasswordInput
                  placeholder="Masukan Password"
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
              <Box>
                <Button width={'full'} type="submit">
                  Login
                </Button>
                <Button
                  bg="white"
                  color="black"
                  width={'full'}
                  borderRadius={'7px'}
                  type="button"
                  mt={2}
                  onClick={onClickGoogle}
                >
                  <Image w="10" h="10" src="/google-icon.webp"></Image>
                </Button>
                <Text textAlign={'center'} mt={2}>
                  Belum punya akun? silakan{' '}
                  <Link
                    to={`/${store?.name}/register-buyer`}
                    className="text-blue-400"
                  >
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
