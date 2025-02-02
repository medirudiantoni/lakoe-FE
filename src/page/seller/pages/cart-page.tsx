import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react"
import SellerNavbar from "../components/navbar"
import SellerFooter from "../components/footer";
import CartCard from "../components/cart-card";
import useCart from "@/hooks/cart-store";
import { formatRupiah } from "@/lib/rupiah";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const SellerCartPage = () => {
    const navigate = useNavigate();
    const { cart, totalPrice, totalQuantity } = useCart();

    const handleCheckout = () => {
        if(cart.length === 0){
            return toast.error("Kamu belum memilih produk")
        }
        return navigate('/seller/checkout');
    }

    return (
        <Box w="full" minH="100vh" className="font-poppins">
            <SellerNavbar />
            <Box w="full" maxW="6xl" mx="auto" py="32">

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
                {cart.map((product) => (
                    <CartCard 
                        key={product.id}
                        id={product.id}
                        productName={product.name}
                        category={product.category}
                        imageUrl={product.attachment[0]}
                        price={product.price ? product.price : 0}
                        quantity={product.quantity}
                    />
                ))}
                {/* card product end */}

                <Flex w="full" pt="40" justifyContent="space-between" alignItems="end" fontWeight="semibold">
                    <Text py={3} borderBottomWidth={2} borderColor="black" fontSize="md" cursor="pointer" onClick={() => navigate("/seller")}>Lanjut Belanja</Text>
                    <Button fontSize="md" py={6} px={10} onClick={handleCheckout}>Lanjut Checkout</Button>
                </Flex>

            </Box>
            <SellerFooter />
        </Box>
    )
}

export default SellerCartPage