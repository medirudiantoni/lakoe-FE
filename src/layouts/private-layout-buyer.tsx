import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
import { Center, Image, VStack } from '@chakra-ui/react';

import LayoutBuyer from '@/components/layout/layout-buyer';
import LoadingLottieBuyer from '@/components/icons/loading-buyer';
import { useSellerStore } from '@/hooks/store';

const PrivateRouteBuyer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const {store} = useSellerStore()

  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get(`token-buyer-${store?.name}`);
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
