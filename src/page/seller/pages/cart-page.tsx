import { Box, Button, Center, Flex, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"
import SellerNavbar from "../components/navbar"
import SellerFooter from "../components/footer";
import { X } from "lucide-react";
import { dummy_product } from "./home-page";
import CartCard from "../components/cart-card";

const imageLink = "https://i.pinimg.com/736x/d1/9d/84/d19d84c83abfaf4ce3c296a4910f1bfe.jpg"

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
                        <Text fontSize="2xl" fontWeight="bold">Rp 2.000.000,-</Text>
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
                        totalPrice={""}
                    />
                ))}
                <Flex py="5" gap="10" w="full" maxW="6xl">
                    <Box w="40" h="40" bg="gray.300">
                        <Image w="full" h="full" src={imageLink} />
                    </Box>
                    <HStack flex={1} borderBottomWidth={1} h="52" pb="12">
                        <VStack flex={1} alignItems="start" justifyContent="space-between" h="full">
                            <Box>
                                <Heading size="2xl" fontWeight="medium">Turcois Sweater Brown</Heading>
                                <Text fontSize="md" fontWeight="medium" color="gray.600">Pakaian Pria</Text>
                            </Box>
                            <HStack alignItems="end" gap={0}>
                                <Text fontSize="xl" fontWeight="medium" lineHeight={1.2}>Rp 463.000,-</Text>
                                <Text fontSize="sm" fontWeight="medium">/Item</Text>
                            </HStack>
                        </VStack>
                        <HStack w="60" h="full">
                            <Box flex={1} h="full" pt="1">
                                <Text fontSize="lg" fontWeight="medium" color="gray.900">1x</Text>
                            </Box>
                            <VStack alignItems="end" justifyContent="space-between" w="52" h="full">
                                <Heading size="xl" fontWeight="medium">Rp 463.000,-</Heading>
                                <HStack w="full" justifyContent="space-between">
                                    <HStack gap="5">
                                        <Button>-</Button>
                                        <Text fontSize="md" fontWeight="medium" color="gray.600">1</Text>
                                        <Button>+</Button>
                                    </HStack>
                                    <Center role="button" cursor="pointer" bg="white" color="black" borderWidth={1} borderRadius="md" p={2}>
                                        <X />
                                    </Center>
                                </HStack>
                            </VStack>
                        </HStack>
                    </HStack>
                </Flex>
                {/* card product end */}

            </Box>
            <SellerFooter />
        </Box>
    )
}

export default SellerCartPage