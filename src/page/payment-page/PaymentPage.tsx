import LogoIcon from '@/components/icons/logo';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { fetchCurrentUserData } from '@/features/auth/services/auth-service';
import { apiURL } from '@/utils/baseurl';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import LoadingLottie from '@/components/icons/Loading';

const eWallets = [
  {
    name: 'gopay',
    image: '/gopay.webp',
  },
  {
    name: 'ovo',
    image: '/ovo.png',
  },
  {
    name: 'dana',
    image: '/dana.png',
  },
  {
    name: 'shopee pay',
    image: '/shopeepay.png',
  },
];

const virtualAccount = [
  {
    name: 'bca',
    image: '/bca.png',
  },
  {
    name: 'bsi',
    image: '/bsi.png',
  },
  {
    name: 'bri',
    image: '/bri.png',
  },
  {
    name: 'mandiri',
    image: '/mandiri.webp',
  },
  {
    name: 'bni',
    image: '/bni.png',
  },
];

interface ParamsType {
  name: string | null;
  price: string | null;
  limit: string | null;
}

const PaymentPage = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if(user === null){
      retrieveCurrentUser()
    }
  }, [user]);

  function retrieveCurrentUser(){
    const token = Cookies.get("token");
    fetchCurrentUserData(token!)
      .then(res => {
        setUser(res.user)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Oops!, Something went wrong");
      });
  }

  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get('token');
      if(!token){
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.post(apiURL + 'auth/validate-token', { token });
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, []);

  const [params, setParams] = useState<ParamsType>({
    name: null,
    price: null,
    limit: null,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setParams({
      name: searchParams.get('name'),
      price: searchParams.get('price'),
      limit: searchParams.get('limit'),
    });
  }, []);

  const [isPaymentMethod, setIsPaymentMethod] = useState('');
  
  if( isAuthenticated === null ) {
    return (
      <Center w="100vw" h="100vh">
        <VStack gap="10">
          <LogoIcon />
          <LoadingLottie />
        </VStack>
      </Center>
    )
  };
  return isAuthenticated ? (
    <Box w="full" minH="100vh" pb="20" className="bg-slate-100">
      <VStack py="10" position="relative">
        <Button
          onClick={() => navigate(-1)}
          alignSelf="self-start"
          position="absolute"
          left="10"
        >
          <ArrowLeft />
          <Text>Back</Text>
        </Button>
        <LogoIcon />
      </VStack>
      <VStack>
        <Heading
          size="4xl"
          fontWeight="semibold"
          className="font-bricolage-grosteque"
          mb="5"
        >
          Pembayaran
        </Heading>
        <Box
          w="xl"
          mx="auto"
          py="5"
          bg="white"
          borderWidth={2}
          borderColor="gray.200"
          borderRadius="2xl"
        >
          <Heading
            px="8"
            size="xl"
            fontWeight="semibold"
            pb="4"
            borderBottomWidth={2}
            borderColor="gray.200"
            mb="4"
          >
            Rincian
          </Heading>
          <Box px="8" w="full">
            <HStack>
              <Text w="14" fontWeight="medium">
                Nama
              </Text>
              <Text px={2}>:</Text>
              <Text>{params.name}</Text>
            </HStack>
            <HStack>
              <Text w="14" fontWeight="medium">
                Harga
              </Text>
              <Text px={2}>:</Text>
              <Text>{params.price}</Text>
            </HStack>
            <HStack>
              <Text w="14" fontWeight="medium">
                Limit
              </Text>
              <Text px={2}>:</Text>
              <Text>{params.limit}</Text>
            </HStack>
          </Box>
        </Box>
        <VStack mx="auto" flexWrap="wrap" alignItems="start">
          <Box
            w="xl"
            py="5"
            borderWidth={2}
            borderColor="gray.200"
            bg="white"
            borderRadius="2xl"
          >
            <Heading
              px="8"
              size="xl"
              fontWeight="semibold"
              pb="4"
              borderBottomWidth={2}
              borderColor="gray.200"
              mb="4"
            >
              Pilih Metode Pembayaran
            </Heading>
            <Box px="8" w="full" mb="5">
              <Text fontSize="md" mb="2" fontWeight="semibold">
                E-Wallet
              </Text>
              <HStack flexWrap="wrap">
                {eWallets.map((item, id) => (
                  <HStack
                    role="button"
                    onClick={() => setIsPaymentMethod(item.name)}
                    key={id}
                    w="28"
                    justifyContent="center"
                    py="2"
                    px="6"
                    borderWidth={2}
                    borderColor="gray.100"
                    _hover={{ bg: 'blue.100' }}
                    bg={isPaymentMethod === item.name ? 'blue.100' : 'gray.100'}
                    borderRadius="xl"
                    aspectRatio="4/2"
                  >
                    <Image
                      w="full"
                      h="full"
                      objectFit="contain"
                      src={item.image}
                    ></Image>
                  </HStack>
                ))}
              </HStack>
            </Box>
            <Box px="8" w="full" mb="5">
              <Text fontSize="md" mb="2" fontWeight="semibold">
                Transfer Bank (Virtual Account)
              </Text>
              <HStack flexWrap="wrap">
                {virtualAccount.map((item, id) => (
                  <HStack
                    role="button"
                    onClick={() => setIsPaymentMethod(item.name)}
                    key={id}
                    w="28"
                    justifyContent="center"
                    py="2"
                    px="6"
                    borderWidth={2}
                    borderColor="gray.100"
                    _hover={{ bg: 'blue.100' }}
                    bg={isPaymentMethod === item.name ? 'blue.100' : 'gray.100'}
                    borderRadius="xl"
                    aspectRatio="4/2"
                  >
                    <Image
                      w="full"
                      h="full"
                      objectFit="contain"
                      src={item.image}
                    ></Image>
                  </HStack>
                ))}
              </HStack>
            </Box>
          </Box>
          <Box
            w="xl"
            py="5"
            borderWidth={2}
            borderColor="gray.200"
            bg="white"
            borderRadius="2xl"
          >
            <Heading
              px="8"
              size="xl"
              fontWeight="semibold"
              pb="4"
              borderBottomWidth={2}
              borderColor="gray.200"
              mb="4"
            >
              Detail Pembayaran
            </Heading>
            <HStack
              px="8"
              w="full"
              justifyContent="space-between"
              mb="4"
              fontSize="lg"
            >
              <Text>Total:</Text>
              <Text>Rp 300.000,-</Text>
            </HStack>
            <Box px="4" w="full">
              {!isPaymentMethod ? (
                <Button
                  w="full"
                  disabled
                  bg="gray.400"
                  color="white"
                  borderRadius="xl"
                >
                  Bayar
                </Button>
              ) : (
                <Button w="full" bg="blue.600" color="white" borderRadius="xl">
                  Bayar dengan {isPaymentMethod}
                </Button>
              )}
            </Box>
          </Box>
        </VStack>
      </VStack>
    </Box>
  ) : <Navigate to="/login" replace />;
};

export default PaymentPage;
