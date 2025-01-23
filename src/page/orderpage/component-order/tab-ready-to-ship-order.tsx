import orders from '@/data-dummy/orders.json';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

export function TabReadyOrder() {
  const readyToShip = orders[2];
  {
    return (
      <Box
        width="full"
        border="1px solid"
        borderColor="gray.200"
        height="190px"
        borderRadius="10px"
        mt={3}
        p={3}
      >
        <Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            borderBottom={'1px solid'}
            borderColor={'gray.300'}
            pb={2}
          >
            <Box>
              <Button colorPalette={`${readyToShip.colorPalette}`}>
                {readyToShip.status}
              </Button>
              <Text fontSize={'14px'} mt={2} color={'gray.400'}>
                INV/20230809/MPL/00000239
              </Text>
            </Box>
            <Button variant={'outline'} borderRadius={'20px'}>
              Hubungi Pembeli
            </Button>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Image
                src={readyToShip.product.image}
                width={'24'}
                height={'24'}
                borderRadius="md"
                p={3}
                mr={3}
              />
              <Box>
                <Text fontSize="20px" fontWeight="bold">
                  {readyToShip.product.name}
                </Text>
                <Flex fontSize="14px" fontWeight="normal" mt={1}>
                  <Text fontWeight={'semibold'}>
                    Barang: {readyToShip.product.quantity}
                  </Text>
                </Flex>
              </Box>
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
              alignItems={'end'}
            >
              <Text>Total belanja</Text>
              <Text fontWeight={'semibold'}>
                Rp.{readyToShip.product.price}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
