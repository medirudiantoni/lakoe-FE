import { ProductType } from '@/features/auth/types/prisma-types';
import { formatRupiah } from '@/lib/rupiah';
import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState('');
  useEffect(() => {
    showThePrice();
  }, [props.product]);
  function showThePrice() {
    const finalIndex = Number(
      props.product.variants?.findIndex((e) => e.name === 'final')
    );
    const prices: number[] = [];
    props.product.variants &&
      props.product.variants[finalIndex].variantOptions?.map((e) => {
        e.variantOptionValues && prices.push(e.variantOptionValues[0].price);
      });
    const thePrice = Math.min(...prices);
    setPrice(formatRupiah(thePrice));
  }
  return (
    <Box
      role="button"
      onClick={() =>
        navigate(
          `/${props.product.stores?.name}/product-detail/${props.product.url}`
        )
      }
      key={props.product.id}
      h="fit-content"
      p="3"
      w="full"
      _hover={{ bg: 'gray.100' }}
      border={'1px solid'}
      borderColor={'gray.200'}
      borderRadius={'7px'}
      cursor={'pointer'}

    >
      <Image
        w="300px"
        h={'200px'}
        objectFit={'cover'}
        mb="2"
        src={props.product.attachments[0]}
        borderRadius={'7px'}
      ></Image>
      <VStack
        alignItems="start"
        justifyContent="space-between"
        className="font-poppins"
       
      >
        <Box mb="1">
          <Heading size="lg" fontWeight="semibold" truncate maxW={'52'}>
            {props.product.name}
          </Heading>
          <Text fontSize="xs" color="gray.600">
            {props.product.category?.name}
          </Text>
        </Box>
        <Text fontSize="md" fontWeight="semibold">
          {price}
        </Text>
      </VStack>
    </Box>
  );
};

export default ProductCard;
