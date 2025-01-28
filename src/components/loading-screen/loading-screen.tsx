import { Stack } from '@chakra-ui/react';
import LogoIcon from '../icons/logo';
import { useEffect, useState } from 'react';
import { useAuthStore, UserType } from '@/features/auth/auth-store/auth-store';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import LoadingLottie from '../icons/Loading';

interface ParamsType extends UserType {
  token: string;
  phone: string;
  role: string;
  updatedAt: string;
  createdAt: string;
}

export function LoadingScreen() {
  const [params, setParams] = useState<ParamsType | null>(null);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.size == 0) {
      setParams(null);
    } else {
      const store = searchParams.get('store');
      setParams({
        token: String(searchParams.get('token')),
        name: String(searchParams.get('name')),
        email: String(searchParams.get('email')),
        phone: String(searchParams.get('phone')),
        role: String(searchParams.get('role')),
        store: JSON.parse(store!),
        updatedAt: String(searchParams.get('updatedAt')),
        createdAt: String(searchParams.get('createdAt')),
        id: String(searchParams.get('id')),
      });
    }
  }, [window.location]);

  useEffect(() => {
    if (params !== null) {
      setUser(params);
      Cookies.set('token', params.token as string);

      console.log(params.store);
      // const storeParse = JSON.parse(params.store);
      toast.success('success');
      if (params.store) {
        navigate('/dashboard');
      } else {
        navigate('/register-store');
      }
    }
  }, [params]);
  return (
    <Stack
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      h={'100vh'}
    >
      <LogoIcon />
      <LoadingLottie />
    </Stack>
  );
}
