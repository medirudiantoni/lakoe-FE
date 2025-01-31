import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Box, Center, Flex, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { X } from "lucide-react";
import { formatRupiah } from "@/lib/rupiah";

interface CartCardProps {
    imageUrl: string;
    productName: string;
    category: string;
    price: number;
    quantity: number;
    onX?: () => void;
}

const CartCard: React.FC<CartCardProps> = ({ imageUrl, productName, category, price, quantity, onX }) => {
    const [isQuantity, setQuantity] = useState(quantity);
    // const { products, setProducts } = useProductCartStore();
    const [isTotalPricePerItem, setTotalPricePerItem] = useState(0);
    // const { setTotalPrice, totalPrice } = useTotalPrice();

    // useEffect(() => {
    //     const theProduct = products?.find(product => product.name === productName);
        
    // }, [isTotalPricePerItem])

    useEffect(() => {
        setTotalPricePerItem(isQuantity * price);
    }, [isQuantity]);

    const handlePlus = () => {
        setQuantity(prev => prev + 1);
    };

    const handleMinus = () => {
        if(isQuantity > 1){
            setQuantity(prev => prev - 1)
        }
    };
    
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
                        <Text fontSize="xl" fontWeight="medium" lineHeight={1.2}>{formatRupiah(price)}</Text>
                        <Text fontSize="sm" fontWeight="medium">/Item</Text>
                    </HStack>
                </VStack>
                <HStack w="60" h="full">
                    <Box flex={1} h="full" pt="1">
                        <Text fontSize="lg" fontWeight="medium" color="gray.900">{isQuantity}x</Text>
                    </Box>
                    <VStack alignItems="end" justifyContent="space-between" w="52" h="full">
                        <Heading size="xl" fontWeight="medium">{formatRupiah(isTotalPricePerItem)},-</Heading>
                        <HStack w="full" justifyContent="space-between">
                            <HStack gap="5">
                                <Button onClick={handleMinus} _active={{ bg: "gray.700", transform: "scale(0.95)" }}>-</Button>
                                <Text fontSize="md" fontWeight="medium" color="gray.600">{isQuantity}</Text>
                                <Button onClick={handlePlus} _active={{ bg: "gray.700", transform: "scale(0.95)" }}>+</Button>
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