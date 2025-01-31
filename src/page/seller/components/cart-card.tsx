import React from "react";
import { Button } from "@/components/ui/button";
import { Box, Center, Flex, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { X } from "lucide-react";

interface CartCardProps {
    imageUrl: string;
    productName: string;
    category: string;
    price: string;
    totalPrice: string;
    quantity: number;
    onPlus?: () => void;
    onMinus?: () => void;
    onX?: () => void;
}

const CartCard: React.FC<CartCardProps> = ({ imageUrl, productName, category, price, totalPrice, quantity, onPlus, onMinus, onX }) => {
    // const [isQuantity, setQuantity] = useState(quantity);
    
    return (
        <Flex py="5" gap="10" w="full" maxW="6xl">
            <Box w="40" h="40" bg="gray.300">
                <Image w="full" h="full" src={imageUrl} />
            </Box>
            <HStack flex={1} borderBottomWidth={1} h="52" pb="12">
                <VStack flex={1} alignItems="start" justifyContent="space-between" h="full">
                    <Box>
                        <Heading size="2xl" fontWeight="medium">{productName}</Heading>
                        <Text fontSize="md" fontWeight="medium" color="gray.600">{category}</Text>
                    </Box>
                    <HStack alignItems="end" gap={0}>
                        <Text fontSize="xl" fontWeight="medium" lineHeight={1.2}>Rp {price}</Text>
                        <Text fontSize="sm" fontWeight="medium">/Item</Text>
                    </HStack>
                </VStack>
                <HStack w="60" h="full">
                    <Box flex={1} h="full" pt="1">
                        <Text fontSize="lg" fontWeight="medium" color="gray.900">{quantity}x</Text>
                    </Box>
                    <VStack alignItems="end" justifyContent="space-between" w="52" h="full">
                        <Heading size="xl" fontWeight="medium">Rp {totalPrice},-</Heading>
                        <HStack w="full" justifyContent="space-between">
                            <HStack gap="5">
                                <Button onClick={onMinus}>-</Button>
                                <Text fontSize="md" fontWeight="medium" color="gray.600">1</Text>
                                <Button onClick={onPlus}>+</Button>
                            </HStack>
                            <Center onClick={onX} role="button" cursor="pointer" bg="white" color="black" borderWidth={1} borderRadius="md" p={2}>
                                <X />
                            </Center>
                        </HStack>
                    </VStack>
                </HStack>
            </HStack>
        </Flex>
    )
};

export default CartCard;