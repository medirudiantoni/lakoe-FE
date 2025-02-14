import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
import { Center, Image, VStack } from '@chakra-ui/react';
import LogoIcon from '@/components/icons/logo';

import { useAuthStore } from '@/features/auth/store/auth-store';
import { fetchCurrentUserData } from '@/features/auth/services/auth-service';
import toast from 'react-hot-toast';
import LoadingLottie from '@/components/icons/lottie';
import { fetchCurrentUserBuyerData } from '@/features/auth/services/buyer'; 
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import LayoutBuyer from '@/components/layout/layout-buyer';
import LoadingLottieBuyer from '@/components/icons/loading-buyer';
import { useSellerStore } from '@/hooks/store';

const PrivateRouteBuyer = () => {
  const { setBuyer, buyer } = useAuthBuyerStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const {store} = useSellerStore()

  useEffect(()=> {
    console.log('is', isAuthenticated)
  }, [isAuthenticated])

  useEffect(() => {
    console.log('buyer', buyer)
    if (buyer === null) {
      console.log("tes is null?")
      retrieveCurrentUser();
    }
  }, [buyer]);

  function retrieveCurrentUser() {
    console.log('hai dinda')
    const token = Cookies.get('token-buyer');
    fetchCurrentUserBuyerData(token!)
      .then((res) => {
        console.log('res buyer', res)
        setBuyer(res.user);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Oops!, Something went wrong');
      });
  }

  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get('token-buyer');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.post(apiURL + 'auth-buyer/validate-token', { token });
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 2000);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <Center w="100vw" h="100vh">
        <VStack gap="10">
          <Image src={store?.logoAttachment} width={145}/>
          <LoadingLottieBuyer/>
        </VStack>
      </Center>
    );
  }

  return isAuthenticated ? <LayoutBuyer /> : <Navigate to={`/${store?.name}/login-buyer`} replace />;
};

export default PrivateRouteBuyer;
