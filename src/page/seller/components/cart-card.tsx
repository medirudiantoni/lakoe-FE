import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Box, Center, Flex, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { X } from "lucide-react";
import { formatRupiah } from "@/lib/rupiah";
import useCart from "@/hooks/cart-store";
import { CategoryType } from "@/features/auth/types/prisma-types";
import { removeCartItem, updateCartItemQty } from "@/features/auth/services/cart-service";

interface CartCardProps {
    cartItemId?: string,
    imageUrl?: string;
    productName: string;
    category: CategoryType | undefined;
    price: number;
    quantity: number;
};

const CartCard: React.FC<CartCardProps> = ({ cartItemId, imageUrl, productName, category, price, quantity }) => {
    const { increase, decrease, removeCart, cart } = useCart();
    const [decreaseAble, setDecreaseAble] = useState<boolean>(true);
    const [cat, setCat] = useState<string>("");
    const [pendingUpdate, setPendingUpdate] = useState<{case: "plus" | "minus", quantity: number}>({
        case: "plus",
        quantity: 0
    });

    useEffect(() => {
        setPendingUpdate({...pendingUpdate, quantity: quantity})
    }, [quantity]);

    useEffect(() => {
        const productIndex = cart.findIndex(e => e.name === productName);
        if (cart[productIndex].quantity < 2) {
            setDecreaseAble(false);
        } else {
            setDecreaseAble(true)
        }
    }, [cart]);
    useEffect(() => {
        if (category) {
            const data =
                category.parent ?
                    category.parent.parent ?
                        `${category.parent.parent.name}/${category.parent.name}/${category.name}`
                        : `${category.parent.name}/${category.name}`
                    : `${category.name}`;
            setCat(data);
        }
    }, [category]);

    useEffect(() => {
        if (!pendingUpdate) return;
        const timeoutId = setTimeout(async () => {
            if(cartItemId){
                console.log("cartIid: ", cartItemId);
                updateCartItemQty( (pendingUpdate.quantity), cartItemId )
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [pendingUpdate]);

    function handleIncrease(productName: string) {
        increase(productName);
        setPendingUpdate(prev => ({ case: "plus", quantity: prev.quantity + 1 }))
    }
    function handleDecrease(productName: string) {
        decrease(productName);
        setPendingUpdate(prev => ({ case: "minus", quantity: ( prev.quantity < 2 ? prev.quantity - 1 : 1 ) }))
    }
    function handleRemove(productName: string) {
        removeCart(productName);
        if(cartItemId){
            removeCartItem(cartItemId);
        };
    };
    return (
        <Flex py="5" gap="10" w="full" maxW="6xl">
            <Box w="40" h="40" bg="gray.300">
                <Image w="full" h="full" src={imageUrl} />
            </Box>
            <HStack flex={1} borderBottomWidth={1} h="52" pb="12">
                <VStack flex={1} alignItems="start" justifyContent="space-between" h="full">
                    <Box>
                        <Heading size="xl" fontWeight="medium" mb={2}>{productName}</Heading>
                        <Text fontWeight="medium" color="gray.600">{cat}</Text>
                    </Box>
                    <HStack alignItems="end" color={"blue.700"} gap={0}>
                        <Text fontSize="xl" fontWeight="medium" lineHeight={1.2}>{formatRupiah(price)}</Text>
                        <Text fontSize="sm" fontWeight="medium">/Item</Text>
                    </HStack>
                </VStack>
                <HStack w="60" h="full">
                    <Box flex={1} h="full" pt="1">
                        <Text fontSize="lg" fontWeight="medium" color="gray.900">{quantity}x</Text>
                    </Box>
                    <VStack alignItems="end" justifyContent="space-between" w="52" h="full">
                        <Heading size="xl" fontWeight="medium">{formatRupiah(price * quantity)},-</Heading>
                        <HStack w="full" justifyContent="space-between">
                            <HStack gap="5">
                                {decreaseAble ? (
                                    <Button onClick={() => handleDecrease(productName)} _active={{ bg: "gray.700", transform: "scale(0.95)" }}>-</Button>
                                ) : (
                                    <Button disabled _active={{ bg: "gray.700", transform: "scale(0.95)" }}>-</Button>
                                )}
                                <Text fontSize="md" fontWeight="medium" color="gray.600">{quantity}</Text>
                                <Button onClick={() => handleIncrease(String(productName))} _active={{ bg: "gray.700", transform: "scale(0.95)" }}>+</Button>
                            </HStack>
                            <Center onClick={() => handleRemove(String(productName))} role="button" cursor="pointer" bg="white" color="black" borderWidth={1} borderRadius="md" p={2}>
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