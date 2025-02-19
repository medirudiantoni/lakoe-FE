import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react'


const BuyerOrderCard = () => {
    return (
        <Box w="full" h="fit" py="4" borderRadius="lg" borderBottomWidth={1} borderBottomColor="gray.200" className='bg-slate-1'>
            <HStack alignItems="stretch">
                <VStack w="2/5">
                    <HStack gap="5">
                        <Box w="20" h="20" borderRadius="lg">
                            <Image src='https://menggambar.net/wp-content/uploads/2021/11/son-goku-drawing-step-13.png'/>
                        </Box>
                        <Box flex="1">
                            <Text fontSize="md">
                                <span className='font-medium'>Diadora Kilvano Men's Running Shoes,</span>
                                <span className='text-neutral-500'> 1x</span>
                            </Text>
                            <Text color="gray.500" fontSize="xs">Sepatu pria</Text>
                            <Text fontWeight="medium" fontSize="md">Rp 200.000,-</Text>
                        </Box>
                    </HStack>
                </VStack>
                <VStack w="1/5" justifyContent="start">
                    <Text fontWeight="semibold">Rp 200.000,-</Text>
                </VStack>
                <VStack w="1/5" justifyContent="start">
                    <Box fontSize="sm" py="1" px="4" mb="3" borderRadius={10} bg="green.500" color="white">
                        <Text>Selesai</Text>
                    </Box>
                </VStack>
                <VStack w="1/5">
                    <Button w="full">Lanjutkan Pembayaran</Button>
                    <Button w="full" variant="outline">Lihat Detail</Button>
                </VStack>
            </HStack>
        </Box>
    )
}

export default BuyerOrderCard