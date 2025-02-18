import LogoIcon from '@/components/icons/logo';
import Layout from '@/components/layout/Layout';
import { apiURL } from '@/utils/baseurl';
import { Center, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

import LoadingLottie from '@/components/icons/lottie';
import { fetchCurrentUserData } from '@/features/auth/services/auth-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import toast from 'react-hot-toast';

const PrivateRoute = () => {
  const { setUser, user } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (user === null) {
      retrieveCurrentUser();
    }
  }, [user]);

  function retrieveCurrentUser() {
    const token = Cookies.get('token');
    fetchCurrentUserData(token!)
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Oops!, Something went wrong');
      });
  }

  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.post(apiURL + 'auth/validate-token', { token });
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

  return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
