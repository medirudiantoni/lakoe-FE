
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
import { Center, VStack } from '@chakra-ui/react';
import LogoIcon from '@/components/icons/logo';

import { fetchCurrentAdminData } from '@/features/auth/services/auth-admin';
import toast from 'react-hot-toast';
import LoadingLottie from '@/components/icons/lottie';
import { useAdminAuthStore } from '@/features/auth/store/auth-admin-store';
import LayoutAdmin from '@/components/layout/layout-admin';

const PrivateRouteAdmin = () => {
  const { setAdmin, admin } = useAdminAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (admin === null) {
      retrieveCurrentAdmin();
    }
  }, [admin]);

  function retrieveCurrentAdmin() {
    const token = Cookies.get('token-admin');
    fetchCurrentAdminData(token!)
      .then((res) => {
        setAdmin(res.admin);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Anda belum login');
      });
  }

  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get('token-admin');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.post(apiURL + 'admin/validate-token', { token });
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 500);
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
          <LogoIcon />
          <LoadingLottie />
        </VStack>
      </Center>
    );
  }

  return isAuthenticated ? <LayoutAdmin /> : <Navigate to="/login-admin" replace />;
};

export default PrivateRouteAdmin;
