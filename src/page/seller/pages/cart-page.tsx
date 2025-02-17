import { Box, Button, Center, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import SellerNavbar from "../components/navbar"
import SellerFooter from "../components/footer";
import CartCard from "../components/cart-card";
import useCart from "@/hooks/cart-store";
import { formatRupiah } from "@/lib/rupiah";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useSellerStore } from "@/hooks/store";
import { useEffect } from "react";
import EmptyCartLottie from "@/components/icons/lottie-empty-cart";
import { fetchBuyerCart } from "@/features/auth/services/cart-service";
import { useAuthBuyerStore } from "@/features/auth/store/auth-buyer-store";
import { CartItemType, CartType } from "@/features/auth/types/prisma-types";

const SellerCartPage = () => {
    const navigate = useNavigate();
    
    const { store } = useSellerStore();
    const { buyer } = useAuthBuyerStore();
    const { cart, setManyCart, totalPrice, totalQuantity } = useCart();

    useEffect(() => {
        console.log("cartnya 24: ", cart);
        if(cart.length === 0 && buyer){
            retrieveBuyerCart();
        }
    }, [cart, buyer]);

    function retrieveBuyerCart(){
        fetchBuyerCart()
            .then((res: CartType) => {
                const data: CartItemType[] = res.cartItems ? res.cartItems : []; 
                setManyCart(data);
            })
            .catch((error) => {
                toast.error(error);
            })
    }

    const handleCheckout = () => {
        if (cart.length === 0) {
            return toast.error("Kamu belum memilih produk")
        }
        return navigate(`/${store?.name}/checkout`);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Box w="full" minH="100vh" className="font-poppins">
            <SellerNavbar />
            <Box w="full" px={{ base: "5", lg: "10" }} maxW="6xl" mx="auto" py="32">

                {/* Heading start */}
                <HStack justifyContent="space-between" w="full" pb="10" mb="4" borderBottomWidth={1} borderColor="gray.300">
                    <HStack gap={4} alignItems="end">
                        <Heading size="2xl" fontWeight="bold">Keranjang</Heading>
                        <Text>{totalQuantity} Item</Text>
                    </HStack>
                    <HStack gap={4}>
                        <Text>Total:</Text>
                        <Text fontSize="2xl" fontWeight="bold">{formatRupiah(totalPrice)}</Text>
                    </HStack>
                </HStack>
                {/* Heading end */}

                {/* card product start */}
                {cart.length > 0 ? cart.map((product) => (
                    <CartCard
                        key={product.name}
                        id={String(product.id)}
                        productName={product.name}
                        category={String(product.categoryName)}
                        imageUrl={product.product?.attachments[0]}
                        price={product.price ? product.price : 0}
                        quantity={product.quantity}
                    />
                )) : (
                    <Center w="full" h={'fit-content'}>
                        <VStack>
                            <Box mb={4}>
                                <EmptyCartLottie />
                            </Box>
                            <Button onClick={() => navigate(`/${store?.name}`)}>Tambah produk</Button>
                        </VStack>
                    </Center>
                )}
                {/* card product end */}

                <Flex w="full" pt="40" justifyContent="space-between" alignItems="end" fontWeight="semibold">
                    <Text py={3} borderBottomWidth={2} borderColor="black" fontSize="md" cursor="pointer" onClick={() => navigate(`/${store?.name}`)}>Lanjut Belanja</Text>
                    <Button fontSize="md" py={6} px={10} onClick={handleCheckout}>Lanjut Checkout</Button>
                </Flex>

            </Box>
            <SellerFooter />
        </Box>
    )
}

export default SellerCartPage