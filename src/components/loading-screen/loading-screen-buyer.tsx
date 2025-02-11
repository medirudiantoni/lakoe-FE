import { Box, Image, Stack, Text } from '@chakra-ui/react';
import LogoIcon from '../icons/logo';
import { useEffect, useState } from 'react';
import { useAuthStore, UserType } from '@/features/auth/store/auth-store';
import { useNavigate, useParams } from 'react-router';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import LoadingLottie from '@/components/icons/lottie';
import { useSellerStore } from '@/hooks/store';
import LoadingLottieBuyer from '../icons/loading-buyer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
import { StoreType } from '@/features/auth/types/prisma-types';

interface ParamsType extends UserType {
  token: string;
  phone: string;
  role: string;
  updatedAt: string;
  createdAt: string;
}

export function LoadingScreenBuyer() {
  const [params, setParams] = useState<ParamsType | null>(null);
  const { setUser } = useAuthStore();
  const { store, setStore} = useSellerStore();
  const navigate = useNavigate();

  
  const { storeName } = useParams()



  const { data, error, isLoading } = useQuery<StoreType>({
    queryKey: ["store", storeName],  // Pastikan query berubah saat storeName berubah
    queryFn: async () => {
      if (!storeName) return null; // Hindari request jika storeName belum ada
      const response = await axios.get(apiURL + `store/public/${storeName}`);
      return response.data;
    },
    enabled: !!storeName, // Query hanya dijalankan jika storeName sudah tersedia
  });
  
  useEffect(()=>{
    console.log('store ini apa', storeName)
  },[storeName])


  useEffect(()=>{
      if(data){
        setStore(data)
      }
  }, [store])


  console.log('inistore', store)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.size == 0) {
      setParams(null);
    } else {
      // const store = searchParams.get('store');
      setParams({
        token: String(searchParams.get('token')),
        name: String(searchParams.get('name')),
        email: String(searchParams.get('email')),
        phone: String(searchParams.get('phone')),
        role: String(searchParams.get('role')),
        updatedAt: String(searchParams.get('updatedAt')),
        createdAt: String(searchParams.get('createdAt')),
        id: String(searchParams.get('id')),
      });
    }
  }, []);

  useEffect(() => {
    if (params !== null) {
      setUser(params);
      Cookies.set('token', params.token as string);

      toast.success(
        <Box display="flex" alignItems="center" gap="10px">
      
          <Text font={'12px'}>Berhasil login menggunakan Google</Text>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" width="20px" />
        </Box>
      );
      navigate(`/${storeName}`);
      // if (params.Stores) {
      //   navigate('/dashboard');
      // } else {
      //   navigate('/register-store');
      // }
    }
  }, [params]);
  return (
    <Stack
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      h={'100vh'}
    >
      <Image src={store?.logoAttachment} width={140}/>
      <LoadingLottieBuyer />
    </Stack>
  );
}
