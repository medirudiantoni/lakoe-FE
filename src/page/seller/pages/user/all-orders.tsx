import React from 'react'
import { Box, HStack, VStack } from '@chakra-ui/react'
import BuyerOrderCard from '../../components/order-card'

const BuyerAllOrders = () => {
    return (
        <VStack gap="6" w="full" pt="5">
            <HStack w="full" textAlign="center" fontWeight="medium" borderBottomWidth={0} pb="2" borderColor="gray.600">
                <Box w="2/5" p="2" className='bg-slate-100' borderRadius="lg">Produk</Box>
                <Box w="1/5" p="2" className='bg-slate-100' borderRadius="lg">Harga Total</Box>
                <Box w="1/5" p="2" className='bg-slate-100' borderRadius="lg">Status</Box>
                <Box w="1/5" p="2" className='bg-slate-100' borderRadius="lg">Aksi</Box>
            </HStack>
            <BuyerOrderCard />
            <BuyerOrderCard />
            <BuyerOrderCard />
        </VStack>
    )
}

export default BuyerAllOrders