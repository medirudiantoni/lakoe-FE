import { Field } from '@/components/ui/field';
import { fetchRegister } from '@/features/auth/services/auth-buyer-services';
import { useSellerStore } from '@/hooks/store';
import { apiURL } from '@/utils/baseurl';
import { Box, Button, Image, Input, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import { z } from 'zod';
import { StoreType } from '@/features/auth/types/prisma-types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PasswordInput } from '@/components/ui/password-input';

const registerSchema = z.object({
  name: z.string().min(2, 'Nama user harus diisi'),
  email: z.string().email('Format email salah'),
  phone: z.string().min(12, 'Nomer telepon harus diisi'),
  password: z.string().min(6, 'Password harus diisi'),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;
export function RegisterBuyer() {
    const navigate = useNavigate();
    const {store, setStore} = useSellerStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const { storeName } = useParams()

// useEffect(()=>{
//   console.log('storname', storeName)
// },[storeName])


  const { data } = useQuery<StoreType>({
    queryKey:["store"],
    queryFn:async ()=> {
      const response = await axios.get(apiURL + `store/public/${storeName}`)
      return response.data
    }
  })

  useEffect(()=>{
      console.log('dataStore', data)
      console.log('dataStoreName', storeName)
      if(!store){
        setStore(data!)
      }
  }, [store])
  const onSubmit = (data: RegisterFormInputs) => {    
    const requestData = { ...data, storeName: store?.name };
  
    toast.promise(
      fetchRegister(requestData).then(() => {
        navigate(`/${store?.name}/login-buyer`);
        if (store?.name) {
          Cookies.set('StoreNameBuyer', String(store?.name));
        }
      }),
      {
        loading: 'Sedang mendaftarkan akun...',
        success: 'Akun berhasil didaftarkan!',
        error: 'Email sudah digunakan',
      },
      {
        success: {
          style: {
            background: '#FFFF',
            color: '#1d1d1d',
          },
        },
        error: {
          style: {
            background: '#FFFF',
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
  return (
    <Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        width={'full'}
        pt={'8'}
        alignItems={'center'}
        justifyContent={'center'}
        position={'relative'}
        
      >
        <Box w={'full'} maxW={'sm'} mx={'auto'}>
          <VStack w={'full'}>
            <Image
              src={store?.logoAttachment}
              width={133}
            ></Image>
                <Link to={`/${store?.name}/login-buyer`}>
        <Text
          position={'absolute'}
          top={25}
          right={30}
          fontWeight={'semibold'}
        >
          Masuk
        </Text>
      </Link>
            <Text mb={3} fontSize={'22px'} fontWeight={'semibold'}>
              Daftar akun ke {store?.name}
            </Text>
          </VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Field label="Nama">
              <Input placeholder="Masukan Nama" {...register('name')}/>
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
            <Field label="Phone">
              <Input placeholder="Masukan Phone" {...register('phone')}/>
               {errors.phone && (
                <Text
                  color="red.500"
                  fontSize="xs"
                  textAlign={'left'}
                  marginTop="1.5"
                >
                  {errors.phone.message}
                </Text>
              )}
            </Field>
            <Field label="Email">
              <Input placeholder="Masukan Email" {...register('email')}/>
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
              <PasswordInput placeholder="Masukan Password" {...register('password')}/>
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
            <Button width={'full'} type='submit'>Register</Button>
            <Box>
              
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
              <Text textAlign={'center'} mt={'2'}>
                Dengan menekan tombol Daftar maka kamu setuju dengan{' '}
                <span className="text-blue-400"> Syarat & Ketentuan </span> dan{' '}
                <span className="text-blue-400"> Kebijakan Privasi </span>
              </Text>
            </Box>
          </Box>
          </form>
         
        </Box>
      </Box>
    </Box>
  );
}