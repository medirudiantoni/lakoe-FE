import {
  Box,
  Button,
  // Flex,
  Heading,
  HStack,
  Image,
  // RadioGroupRoot,
  Spacer,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import SellerFooter from '../components/footer';
// import { Radio, RadioGroup } from '@/components/ui/radio';
// import { eWallets, virtualAccount } from '@/page/payment-page/PaymentPage';
import LoadingButtonLottie from '@/components/icons/loading-button';
import { ArrowLeft, CheckIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
// import toast from 'react-hot-toast';
import { useProductStore } from '@/features/auth/store/product-store';
import { formatRupiah } from '@/lib/rupiah';
import { apiURL } from '@/utils/baseurl';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LocationSettingCheckout } from './user/location-checkout';
import { v4 as uuidv4 } from 'uuid';
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import { useSellerStore } from '@/hooks/store';
import { fetchClearCart } from '@/features/auth/services/cart-service';
import Cookies from 'js-cookie';


type Courier = {
  courier_name: string;
  courier_service_name: string;
  price: number;
  duration: string;
};

// interface OrderItemMidtrans {
//   productId: string,
//   quantity: number,
//   price: number,
//   name: string,
//   image: string
// }

const SellerCheckoutPage = () => {
  const navigate = useNavigate();
  const { store } = useSellerStore();
  // const [isPaymentMethod, setIsPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const [couriers, setCouriers] = useState<Courier[]>([]);
  // const [selectedCourier, setSelectedCourier] = useState<string>('');
  // const [selectedCourierName, setSelectedCourierName] = useState<string>('Pilih Kurir');
  // const [selectedCourierImage, setSelectedCourierImage] = useState<string>('');
  const [selectedCouriers, setSelectedCouriers] = useState<Courier[]>([]);
  // const [finalCourier, setFinalCourier] = useState<Courier | null>(null);

  // const [selectedCourierForNext, setSelectedCourierForNext] = useState<Courier | null>(null);
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  // const [isOpenSecond, setIsOpenSecond] = useState(false);
  // const [isOpenFirstDropdown, setIsOpenFirstDropdown] = useState(false);
  // const [isOpenSecondDropdown, setIsOpenSecondDropdown] = useState(false);
  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);

  const { products, selectedVariantOption } = useProductStore();
  const { buyer } = useAuthBuyerStore();

  useEffect(() => {
    const total = products.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );
    setTotalProductPrice(total);
  }, [products]);

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
    address: string;
    cityDistrict: string;
    village: string;
  } | null>(null);

  const postCourierRates = useMutation({
    mutationFn: async () => {
      if (!selectedLocation) {
        console.warn('selectedLocation masih null, tidak mengirim request');
        return;
      }

      let dataOrderItem: { name: string; value: number }[] = [];
      products.map((item) => {
        const itemToOrder = {
          name: item.name,
          value: item.price * item.quantity,
        };
        dataOrderItem.push(itemToOrder);
      });

      const body = {
        origin_postal_code: selectedLocation.postalCode,
        destination_latitude: selectedLocation.latitude,
        destination_longitude: selectedLocation.longitude,
        couriers: 'tiki,jne,pos,ninja,jnt,paxel,sicepat',
        items: dataOrderItem,
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

  // const postCheckout = useMutation({
  //   mutationFn: async () => {
  //     setLoading(true)
  //     const formData = new FormData();

  //     const selectedCourier = selectedCouriers[0];

  //     let dataOrderItem: OrderItemMidtrans[] = [];

  //     products.map(item => {
  //       const data: OrderItemMidtrans = {
  //         productId: item.productId,
  //         name: item.name,
  //         quantity: item.quantity,
  //         image: item.image,
  //         price: item.price,
  //       };
  //       dataOrderItem.push(data);
  //     })

  //     formData.append('buyerId', buyer?.id || '');
  //     formData.append(
  //       'orderItems',
  //       JSON.stringify(dataOrderItem)
  //     );
  //     formData.append(
  //       'recipient',
  //       JSON.stringify({
  //         receiverName: buyer?.name,
  //         receiverDistrict: selectedLocation?.cityDistrict,
  //         receiverVillage: selectedLocation?.village,
  //         receiverAddress: selectedLocation?.address,
  //         receiverPhone: buyer?.phone,
  //         receiverEmail: buyer?.email.split('-')[0],
  //         receiverLatitude: selectedLocation?.latitude,
  //         receiverLongitude: selectedLocation?.longitude,
  //       })
  //     );

  //     formData.append('courier', selectedCourier.courier_name);
  //     formData.append('shippingCost', selectedCourier.price.toString());

  //     return toast.promise(checkout(formData), {
  //       loading: 'Memproses pesanan...',
  //       success: 'Pesanan berhasil dibuat!',
  //       error: 'Gagal membuat pesanan!',
  //     });
  //   },
  //   onSuccess: (data) => {
  //     setLoading(false)
  //     queryClient.invalidateQueries({ queryKey: ['locations-buyer'] });
  //     if (data?.snapRedirectUrl) {
  //       window.location.href = data.snapRedirectUrl;
  //     }

  //     console.log('redirect_url', data);
  //   },
  //   onError: (error) => {
  //     setLoading(false)
  //     console.error('Error menambahkan lokasi:', error);
  //     toast.error('Gagal menambahkan lokasi!');
  //   },
  // });

  // // const handlePlaceOrder = () => {
  // //   setLoading(true);
  // //   setTimeout(() => {
  // //     navigate(`/${store?.name}/payment`);
  // //     setLoading(false);
  // //     alert('Pesanan anda telah dibuat');
  // //   }, 2000);
  // // };

  // const handlePayment = async () => {
  //   setLoading(true)
  //   const formData = new FormData();

  //   const selectedCourier = selectedCouriers[0];

  //   const dataOrderItem: OrderItemMidtrans[] = products.map(item => ({
  //     productId: item.productId,
  //     name: item.name,
  //     quantity: item.quantity,
  //     image: item.image,
  //     price: item.price,
  //   }));
    

  //   formData.append('buyerId', buyer?.id || '');
  //   formData.append(
  //     'orderItems',
  //     JSON.stringify(dataOrderItem)
  //   );
  //   formData.append(
  //     'recipient',
  //     JSON.stringify({
  //       receiverName: buyer?.name,
  //       receiverDistrict: selectedLocation?.cityDistrict,
  //       receiverVillage: selectedLocation?.village,
  //       receiverAddress: selectedLocation?.address,
  //       receiverPhone: buyer?.phone,
  //       receiverEmail: buyer?.email.split('-')[0],
  //       receiverLatitude: selectedLocation?.latitude,
  //       receiverLongitude: selectedLocation?.longitude,
  //     })
  //   );

  //   formData.append('courier', selectedCourier.courier_name);
  //   formData.append('shippingCost', selectedCourier.price.toString());

  //   const cartItemIds = products.map(e => String(e.cartItemId));

  //   console.log("productsss: ", cartItemIds);


  //   const data: DataRequestOrder = {
  //     buyerId: String(buyer?.id),
  //     cartItemIds: JSON.stringify(cartItemIds),
  //     courier: selectedCourier.courier_name,
  //     recipient: JSON.stringify({
  //       receiverName: buyer?.name,
  //       receiverDistrict: selectedLocation?.cityDistrict,
  //       receiverVillage: selectedLocation?.village,
  //       receiverAddress: selectedLocation?.address,
  //       receiverPhone: buyer?.phone,
  //       receiverEmail: buyer?.email ? buyer?.email.split('-')[0] : '',
  //       receiverLatitude: selectedLocation?.latitude,
  //       receiverLongitude: selectedLocation?.longitude,
  //     }),
  //     shippingCost: selectedCourier.price.toString(),
  //     singleQuantity: products.length === 1 ? products[0].quantity : 1,
  //     variantOptionId: String(selectedVariantOption?.id)
  //   }

  //   const res = await createOrder(data);

  //   console.log("ressssssssss", res.data);

  //   if (res.status === 201) {
  //     console.log("suksess coy!! -----");
  //     setOnSnap(true);
  //     setSnapToken(res.data.data.snap_token);

  //   }
  // }

  const handleCreateOrder = async () => {
    setLoading(true);
    const selectedCourier = selectedCouriers[0];
  
    const dataOrderItem = products.map(item => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      image: item.image,
      price: item.price,
    }));
  
    const orderData = {
      buyerId: String(buyer?.id),
      cartItemIds: JSON.stringify(products.map(e => String(e.cartItemId))),
      courier: selectedCourier.courier_name,
      recipient: JSON.stringify({
        receiverName: buyer?.name,
        receiverDistrict: selectedLocation?.cityDistrict,
        receiverVillage: selectedLocation?.village,
        receiverAddress: selectedLocation?.address,
        receiverPhone: buyer?.phone,
        receiverEmail: buyer?.email ? buyer?.email.split('-')[0] : '',
        receiverLatitude: selectedLocation?.latitude,
        receiverLongitude: selectedLocation?.longitude,
      }),
      shippingCost: selectedCourier.price.toString(),
      singleQuantity: products.length === 1 ? products[0].quantity : 1,
      variantOptionId: String(selectedVariantOption?.id),
      storeName: store?.name
    };

    const localOrderId = uuidv4();
  
    // Menyimpan lebih banyak detail ke localStorage
    localStorage.setItem(`pendingOrder-${localOrderId}`, JSON.stringify({
      orderData,
      totalAmount: totalProductPrice + selectedCourier.price,
      products: dataOrderItem,
      shippingDetails: selectedCourier,
      subtotal: totalProductPrice
    }));

    navigate(`/${store?.name}/payment/${localOrderId}`);
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
    setSelectedCouriers(() => (isCourierSelected(courier) ? [] : [courier]));
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

      {/* <PaymentButtonMidtrans onPopup={onSnap} snapToken={snapToken} /> */}

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

            <Box width={'full'} mb={10}>
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

              {products.map((product) => (
                <Box display={'flex'} alignItems={'center'} gap={5} mb={2}>
                  <Image src={product?.image} width={'70px'} />
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    width={'full'}
                  >
                    <Box flex={1}>
                      <Text fontSize={'lg'} fontWeight={'medium'}>
                        {product?.name}
                      </Text>
                      <Text color={'gray.400'}>{product?.category}</Text>
                    </Box>
                    <HStack w={'2/6'} justifyContent="space-between">
                      <Text fontWeight={'medium'} color={'gray.600'}>
                        {product.quantity}x
                      </Text>
                      <Text fontSize={'18px'} fontWeight={'semibold'}>
                        {formatRupiah(`${product?.price * product.quantity}`)}
                      </Text>
                    </HStack>
                  </Box>
                </Box>
              ))}
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
                                Estimasi:{' '}
                                {c.duration.replace('days', 'hari')}{' '}
                              </Text>
                            </Box>
                          ))}
                        </Text>
                      </Box>
                    ) : (
                      <Text>Pilih Kurir <span className='text-red-500'>*</span></Text>
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
                    {formatRupiah(`${totalProductPrice}`)}
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
                      (totalProductPrice ?? 0) +
                      selectedCouriers.reduce(
                        (total, c) => total + (c.price ?? 0),
                        0
                      )
                    )}
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Footer>
            </Table.Root>

            <Button
              w="full"
              onClick={() => handleCreateOrder()}
              mt="5"
              disabled={selectedCouriers.length === 0}
            >
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
