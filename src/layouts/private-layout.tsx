import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
import { Center, VStack } from '@chakra-ui/react';
import LogoIcon from '@/components/icons/logo';

import { useAuthStore } from '@/features/auth/store/auth-store';
import { fetchCurrentUserData } from '@/features/auth/services/auth-service';
import toast from 'react-hot-toast';
import LoadingLottie from '@/components/icons/Loading';

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
        }, 3000);
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
