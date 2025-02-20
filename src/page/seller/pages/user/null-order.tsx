import { HStack, Text, VStack } from '@chakra-ui/react';

const BuyerNullOrders = () => {
  return (
    <VStack gap="6" w="full" pt="5">
      <HStack
        w="full"
        textAlign="center"
        fontWeight="medium"
        borderBottomWidth={0}
        pb="2"
        borderColor="gray.600"
      >
        <Text>Tidak ada barang</Text>
      </HStack>
    </VStack>
  );
};

export default BuyerNullOrders;
