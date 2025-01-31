import { Box, Heading, HStack, Text } from "@chakra-ui/react"
import SellerNavbar from "../components/navbar"
import SellerFooter from "../components/footer";
import { dummy_product } from "./home-page";
import CartCard from "../components/cart-card";

const SellerCartPage = () => {
    return (
        <Box w="full" minH="100vh" className="font-poppins">
            <SellerNavbar />
            <Box w="full" maxW="6xl" mx="auto" py="32">

                {/* Heading start */}
                <HStack justifyContent="space-between" w="full" pb="10" mb="4" borderBottomWidth={1} borderColor="gray.300">
                    <HStack gap={4} alignItems="end">
                        <Heading size="2xl" fontWeight="bold">Keranjang</Heading>
                        <Text>3 Item</Text>
                    </HStack>
                    <HStack gap={4}>
                        <Text>Total:</Text>
                        <Text fontSize="2xl" fontWeight="bold">Rp 40.000.000</Text>
                        {/* <Text fontSize="2xl" fontWeight="bold">{formatRupiah(totalPrice)}</Text> */}
                    </HStack>
                </HStack>
                {/* Heading end */}

                {/* card product start */}
                {dummy_product.map(product => (
                    <CartCard 
                        key={product.id}
                        productName={product.name}
                        category={product.category}
                        imageUrl={product.attachments[0]}
                        price={product.price}
                        quantity={1}
                    />
                ))}
                {/* card product end */}

            </Box>
            <SellerFooter />
        </Box>
    )
}

export default SellerCartPage