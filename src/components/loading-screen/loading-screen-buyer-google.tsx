import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import { useSellerStore } from '@/hooks/store';
import { Box, Image, Stack, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import LoadingLottieBuyer from '../icons/loading-buyer';

interface ParamsType {
  token: string;
  phone: string;
  role: string;
  updatedAt: string;
  createdAt: string;
  name: string;
  email: string;
  id: string;
}

export function LoadingScreenBuyerGoogle() {
  const { store, setStore } = useSellerStore();
  const [params, setParams] = useState<ParamsType | null>(null);
  const { setBuyer } = useAuthBuyerStore();
  const navigate = useNavigate();  

  useEffect(() => {
    console.log('store di LoadingScreenBuyer:', store);

    if (!store) {
      const storedData = Cookies.get('store');
      if (storedData) {
        const parsedStore = JSON.parse(storedData);
        setStore(parsedStore);
      }
    }
  }, [store, setStore]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log("searchParams: -----------------: ", searchParams);
    if (searchParams.size === 0) {
      setParams(null);
    } else {
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
    if (params !== null && params.token) {
      setBuyer(params);
      Cookies.set(`token-buyer-${store?.name}`, params.token, {
        secure: true,
        sameSite: "None",
        expires: 7
      });

      toast.success(
        <Box display="flex" alignItems="center" gap="10px">
          <Text fontSize={'12px'}>Berhasil login menggunakan Google</Text>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
            width="20px"
          />
        </Box>
      );

      // Tunggu hingga store tersedia sebelum navigasi
      if (store) {
        navigate(`/${store.name}`);
      }
    }
  }, [params, store, navigate]);

  useEffect(() => {
    const storedToken = localStorage.getItem(`token-buyer-${store?.name}`);
    if (!Cookies.get(`token-buyer-${store?.name}`) && storedToken) {
      Cookies.set(`token-buyer-${store?.name}`, storedToken, {
        secure: true,
        sameSite: "None",
        expires: 7,
      });
    }
  }, []);

  return (
    <Stack
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      h={'100vh'}
    >
      {store && <Image src={store.logoAttachment} width={140} mb={20} />}
      <LoadingLottieBuyer />
    </Stack>
  );
}
