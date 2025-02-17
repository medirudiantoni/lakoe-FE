import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  RadioGroupRoot,
  Spacer,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react';
import SellerFooter from '../components/footer';
import { useNavigate } from 'react-router';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { eWallets, virtualAccount } from '@/page/payment-page/PaymentPage';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, CheckIcon } from 'lucide-react';
import LoadingButtonLottie from '@/components/icons/loading-button';
import toast from 'react-hot-toast';
import { useSellerStore } from '@/hooks/store';
import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
import { LocationSettingCheckout } from './user/location-checkout';
import { useMutation } from '@tanstack/react-query';
import { formatRupiah } from '@/lib/rupiah';
import { useProductStore } from '@/features/auth/store/product-store';

type Courier = {
  courier_name: string;
  courier_service_name: string;
  price: number;
  duration: string;
};

const SellerCheckoutPage = () => {
  const navigate = useNavigate();
  const { store } = useSellerStore();
  const [isPaymentMethod, setIsPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<string>('');
  const [selectedCourierName, setSelectedCourierName] =
    useState<string>('Pilih Kurir');
  const [selectedCourierImage, setSelectedCourierImage] = useState<string>('');
  const [selectedCouriers, setSelectedCouriers] = useState<Courier[]>([]);
  const [finalCourier, setFinalCourier] = useState<Courier | null>(null);

  const [selectedCourierForNext, setSelectedCourierForNext] =
    useState<Courier | null>(null);
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenFirstDropdown, setIsOpenFirstDropdown] = useState(false);
  const [isOpenSecondDropdown, setIsOpenSecondDropdown] = useState(false);

  const { selectedProduct, selectedVariantOption } = useProductStore();

  useEffect(() => {
    console.log('priceeeeeee', selectedProduct?.price);
  }, [selectedProduct?.price]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenFirst(false);
      }
    }

    if (isOpenFirst) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenFirst]);

  const [selectedLocation, setSelectedLocation] = useState<{
    postalCode: string;
    latitude: string;
    longitude: string;
  } | null>(null);

  const postCourierRates = useMutation({
    mutationFn: async () => {
      if (!selectedLocation) {
        console.warn('selectedLocation masih null, tidak mengirim request');
        return;
      }

      const body = {
        origin_postal_code: selectedLocation.postalCode,
        destination_latitude: selectedLocation.latitude,
        destination_longitude: selectedLocation.longitude,
        couriers: 'tiki,jne,pos,ninja,jnt,paxel,sicepat',
        items: [
          {
            name: selectedProduct?.name,
            value: selectedProduct?.price,
            // length: 30,
            // width: 15,
            // height: 20,
            // weight: 200,
            // quantity: 2,
          },
        ],
      };

      console.log('Mengirim request ke API dengan data:', body);

      try {
        const response = await axios.post(`${apiURL}rates-couriers`, body);
        console.log('Response dari API:', response.data);
        return response.data;
      } catch (error) {
        console.error('Gagal mengirim request:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('🚚 Data kurir diperbarui:', data);
      setCouriers(data || []);
    },
  });

  useEffect(() => {
    if (selectedLocation) {
      console.log('🔥 selectedLocation berubah, kirim request...');
      postCourierRates.mutate();
    }
  }, [selectedLocation]);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/${store?.name}/payment`);
      setLoading(false);
      alert('Pesanan anda telah dibuat');
    }, 2000);
  };

  useEffect(() => {
    if (selectedLocation) {
      console.log('🔥 selectedLocation berubah, kirim request...');
      postCourierRates.mutate();
    }
  }, [selectedLocation]);

  const isCourierSelected = (courier: Courier) =>
    selectedCouriers.some(
      (c) =>
        c.courier_name === courier.courier_name && c.price === courier.price
    );

  const toggleCourier = (courier: Courier) => {
    setSelectedCouriers(
      (prev) => (isCourierSelected(courier) ? [] : [courier]) // Hanya satu kurir yang bisa dipilih
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <Box w="full" className="font-poppins">
      <Button
        onClick={() => navigate(-1)}
        position="absolute"
        top="10"
        left="10"
        bg={'none'}
        border={'none'}
        color={'#1D1D1D'}
      >
        <ArrowLeft />
        {/* <Text>Back</Text> */}
      </Button>

      <Box w="full" maxW="6xl" mx="auto" py="20">
        <HStack
          alignItems="start"
          w="full"
          h="fit"
          gap="10"
          position="relative"
          flexWrap={{ base: 'wrap', lg: 'nowrap' }}
        >
          <Box flex={1} h="fit" position={'relative'}>
            <Heading size="2xl" fontWeight="bold" mb="5" fontFamily="inherit">
              Checkout
            </Heading>

            <Box width={'full'} mb={'8'}>
              <Heading
                size="xl"
                fontWeight="medium"
                pb="3"
                mb="2"
                borderBottomWidth={1}
                borderColor="gray.200"
                fontFamily="inherit"
              >
                Produk yang ingin dicheckout
              </Heading>

              <Box display={'flex'} alignItems={'center'} gap={'3'}>
                <Image src={selectedProduct?.image} width={'150px'} />
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  width={'full'}
                >
                  <Box>
                    <Text fontSize={'20px'} fontWeight={'semibold'}>
                      {selectedProduct?.name}
                    </Text>
                    <Text color={'gray.400'}>{selectedProduct?.category}</Text>
                  </Box>

                  <Text fontSize={'18px'} fontWeight={'semibold'}>
                    {formatRupiah(`${selectedProduct?.price}`)}
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* Alamat Pengiriman start */}
            <Box mb="10">
              <Heading
                size="xl"
                fontWeight="medium"
                pb="3"
                mb="2"
                borderBottomWidth={1}
                borderColor="gray.200"
                fontFamily="inherit"
              >
                Alamat Pengiriman
              </Heading>
              <LocationSettingCheckout onLocationSelect={setSelectedLocation} />
            </Box>
            {/* Alamat Pengiriman end */}

            {/* Metode Pengiriman start */}
            <Box mb="200px">
              <Heading
                size="xl"
                fontWeight="medium"
                pb="3"
                mb="2"
                borderBottomWidth={1}
                borderColor="gray.200"
                fontFamily="inherit"
              >
                Metode Pengiriman
              </Heading>

              {/* Dropdown Pertama (Memilih lebih dari satu ekspedisi) */}
              <Box
                border="1px solid"
                borderColor="gray.200"
                p={3}
                borderRadius="md"
              >
                <Box
                  w="full"
                  p="3"
                  cursor="pointer"
                  onClick={() => setIsOpenFirst(!isOpenFirst)}
                  position="relative"
                >
                  <HStack>
                    {selectedCouriers.length > 0 ? (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        width="full"
                        alignItems="center"
                      >
                        <Text>
                          {selectedCouriers.map((c, index) => (
                            <Box key={index}>
                              <Text fontSize="md">
                                {c.courier_name} - {c.courier_service_name}
                                <span className="text-[14px] ml-1">
                                  ({formatRupiah(c.price)})
                                </span>
                              </Text>
                              <Text fontSize={'12px'} color={'gray.500'}>
                                Estimasi: {c.duration.replace('days', 'hari')}{' '}
                              </Text>
                            </Box>
                          ))}
                        </Text>
                      </Box>
                    ) : (
                      <Text>Pilih Kurir</Text>
                    )}
                  </HStack>
                </Box>

                {/* Daftar Kurir */}
                {isOpenFirst && (
                  <VStack
                    position="absolute"
                    w="97%"
                    mt="1"
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    zIndex="9999"
                    p={2}
                    maxH="260px"
                    overflowY="auto"
                    ref={dropdownRef}
                  >
                    {couriers.map((courier, index) => (
                      <HStack
                        key={index}
                        w="full"
                        p="2"
                        cursor="pointer"
                        borderRadius="md"
                        _hover={{ bg: 'gray.100' }}
                        bg={isCourierSelected(courier) ? 'gray.100' : 'white'}
                        onClick={() => toggleCourier(courier)}
                      >
                        <Box>
                          <Text>
                            {courier.courier_name} -{' '}
                            {courier.courier_service_name}{' '}
                            <span className="text-[14px]">
                              ({formatRupiah(courier.price)})
                            </span>
                          </Text>
                          <Text color={'gray.500'} fontSize={'12px'}>
                            Estimasi :{' '}
                            {courier.duration.replace('days', 'hari')}
                          </Text>
                        </Box>

                        <Spacer />
                        {selectedCouriers.some(
                          (c) =>
                            c.courier_name === courier.courier_name &&
                            c.courier_service_name ===
                              courier.courier_service_name
                        ) && <CheckIcon />}
                      </HStack>
                    ))}
                  </VStack>
                )}
              </Box>
            </Box>
          </Box>

          <Box
            w={{ base: 'full', lg: '96' }}
            pl="5"
            h="50vh"
            position="sticky"
            top={10}
            mb={100}
          >
            <Heading size="2xl" fontWeight="bold" mb="5" fontFamily="inherit">
              Ringkasan Pesanan
            </Heading>
            <Table.Root size="lg">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader px="0" fontWeight="semibold">
                    Product
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    px="0"
                    textAlign="end"
                    fontWeight="semibold"
                  >
                    Price
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell px="0">{'Subtotal'}</Table.Cell>
                  <Table.Cell px="0" textAlign="end">
                    {formatRupiah(`${selectedProduct?.price}`)}
                  </Table.Cell>
                </Table.Row>
                {selectedCouriers.map((c, index) => (
                  <Table.Row key={index}>
                    <Table.Cell px="0">
                      Metode Pengiriman <br />
                      <Text fontSize="sm" color="gray.500">
                        {c.courier_name} - {c.courier_service_name}
                      </Text>
                    </Table.Cell>
                    <Table.Cell px="0" textAlign="end">
                      {formatRupiah(c.price)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.ColumnHeader
                    px="0"
                    py="5"
                    borderBottom={0}
                    fontWeight="semibold"
                  >
                    Total
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    px="0"
                    py="5"
                    borderBottom={0}
                    textAlign="end"
                    fontWeight="semibold"
                  >
            {formatRupiah(
        (selectedProduct?.price ?? 0) +
        selectedCouriers.reduce((total, c) => total + (c.price ?? 0), 0)
      )}
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Footer>
            </Table.Root>

            <Button w="full" onClick={handlePlaceOrder} mt={'5'}>
              {loading ? <LoadingButtonLottie /> : 'Buat Pesanan'}
            </Button>
          </Box>
        </HStack>
      </Box>

      <SellerFooter />
    </Box>
  );
};

export default SellerCheckoutPage;
