import LogoIcon from '@/components/icons/logo';
import { useAuthStore } from '@/features/auth/auth-store/auth-store';
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router';

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
  const { user } = useAuthStore();
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

  const [isPaymentMehtod, setIsPaymentMethod] = useState('');
  if (!user || !user.name || !user.email) {
    return <Navigate to="/register" />;
  }
  return (
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
                    bg={isPaymentMehtod === item.name ? 'blue.100' : 'gray.100'}
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
                    bg={isPaymentMehtod === item.name ? 'blue.100' : 'gray.100'}
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
              {!isPaymentMehtod ? (
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
                  Bayar dengan {isPaymentMehtod}
                </Button>
              )}
            </Box>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default PaymentPage;
