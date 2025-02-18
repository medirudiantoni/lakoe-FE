import EmptyCartLottie from '@/components/icons/lottie-empty-cart';
import { useProductStore } from '@/features/auth/store/product-store';
import {
  CartItemType,
  OrderItemType,
} from '@/features/auth/types/prisma-types';
import useCart from '@/hooks/cart-store';
import { useSellerStore } from '@/hooks/store';
import { formatRupiah } from '@/lib/rupiah';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import CartCard from '../components/cart-card';
import SellerFooter from '../components/footer';
import SellerNavbar from '../components/navbar';

const SellerCartPage = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<CartItemType[]>([]);

  const { store } = useSellerStore();
  // const { buyer } = useAuthBuyerStore();
  const { cart, totalPrice, totalQuantity } = useCart();
  const { setProducts } = useProductStore();

  useEffect(() => {
    setSelectedItem(cart);
  }, [cart]);

  useEffect(() => {
    let data: OrderItemType[] = [];
    selectedItem.map((item) => {
      const dataItem: OrderItemType = {
        name: item.name,
        image: `${item.product?.attachments[0]}`,
        price: item.price,
        productId: String(item.product?.id),
        quantity: item.quantity,
      };
      data.push(dataItem);
    });
    setProducts(data);
  }, [selectedItem]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      return toast.error('Kamu belum memilih produk');
    }
    return navigate(`/${store?.name}/checkout`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box w="full" minH="100vh" className="font-poppins">
      <SellerNavbar />
      <Box w="full" px={{ base: '5', lg: '10' }} maxW="6xl" mx="auto" py="32">
        {/* Heading start */}
        <HStack
          justifyContent="space-between"
          w="full"
          pb="10"
          mb="4"
          borderBottomWidth={1}
          borderColor="gray.300"
        >
          <HStack gap={4} alignItems="end">
            <Heading size="2xl" fontWeight="bold">
              Keranjang
            </Heading>
            <Text>{totalQuantity} Item</Text>
          </HStack>
          <HStack gap={4}>
            <Text>Total:</Text>
            <Text fontSize="2xl" fontWeight="bold">
              {formatRupiah(totalPrice)}
            </Text>
          </HStack>
        </HStack>
        {/* Heading end */}

        {/* card product start */}
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartCard
              key={item.name}
              cartItemId={String(item.id)}
              productName={item.name}
              category={item.product?.category}
              imageUrl={item.product?.attachments[0]}
              price={item.price ? item.price : 0}
              quantity={item.quantity}
            />
          ))
        ) : (
          <Center w="full" h={'fit-content'}>
            <VStack>
              <Box mb={4}>
                <EmptyCartLottie />
              </Box>
              <Button onClick={() => navigate(`/${store?.name}`)}>
                Tambah produk
              </Button>
            </VStack>
          </Center>
        )}
        {/* card product end */}

        <Flex
          w="full"
          pt="40"
          justifyContent="space-between"
          alignItems="end"
          fontWeight="semibold"
        >
          <Text
            py={3}
            borderBottomWidth={2}
            borderColor="black"
            fontSize="md"
            cursor="pointer"
            onClick={() => navigate(`/${store?.name}`)}
          >
            Lanjut Belanja
          </Text>
          <Button fontSize="md" py={6} px={10} onClick={handleCheckout}>
            Lanjut Checkout
          </Button>
        </Flex>
      </Box>
      <SellerFooter />
    </Box>
  );
};

export default SellerCartPage;
