import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router'

interface ProductCardProps {
    storeName: string;
    id: string;
    imgSrc: string;
    name: string;
    category: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ storeName, id, imgSrc, name, category, price }) => {
    const navigate = useNavigate();
    return (
        <Box role="button"
            onClick={() => navigate(`/${storeName}/detail-product/${id}`)}
            key={id} h="fit-content" p="3" w="full" _hover={{ bg: "gray.100" }}>
            <Image w="full" aspectRatio="1/1" mb="2" src={imgSrc}></Image>
            <VStack alignItems="start" justifyContent="space-between" className="font-poppins">
                <Box mb="1">
                    <Heading size="lg" fontWeight="semibold">{name}</Heading>
                    <Text fontSize="xs" color="gray.600">{category}</Text>
                </Box>
                <Text fontSize="md" fontWeight="semibold">{price}</Text>
            </VStack>
        </Box>
    )
}

export default ProductCard