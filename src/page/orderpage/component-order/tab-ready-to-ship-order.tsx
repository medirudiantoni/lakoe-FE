import { Order } from '@/features/auth/types/order.types';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
interface TabNewOrderProps {
  orders: Order[];
}

export function TabReadyOrder({ orders }: TabNewOrderProps) {
  const readyToShip = orders.filter((order) => order.status === 'Siap Dikirim');

  return (
    <>
      {readyToShip.length > 0 ? (
        readyToShip.map((order, index) => {
          const product = order.orderItems?.[0]?.product;

          if (!product) {
            return (
              <Box
                key={index}
                width="full"
                border="1px solid"
                borderColor="gray.200"
                height="190px"
                borderRadius="10px"
                mt={3}
                p={3}
              >
                <Text>Produk tidak ditemukan</Text>
              </Box>
            );
          }

          return (
            <Link to={`/order-detail/${order.id}`} key={order.id}>
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
                    display="flex"
                    justifyContent="space-between"
                    borderBottom="1px solid"
                    borderColor="gray.300"
                    pb={2}
                  >
                    <Box>
                      <Button colorPalette="blue">{order.status}</Button>
                      <Text fontSize="14px" mt={2} color="gray.400">
                        {order.invoice?.invoiceNumber || 'No Invoice'}
                      </Text>
                    </Box>
                    <Button variant="outline" borderRadius="20px">
                      {order.status === 'Siap Dikirim'
                        ? 'Kabari Pembeli'
                        : 'Lihat Detail'}
                    </Button>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center">
                      <Image
                        src={product.attachments?.[0]}
                        width="50px"
                        height="50px"
                        borderRadius="md"
                        mr={3}
                        alt="Product Image"
                      />
                      <Box>
                        <Text fontSize="20px" fontWeight="bold">
                          {product.name || 'Produk Tidak Diketahui'}
                        </Text>
                        <Flex fontSize="14px" fontWeight="normal" mt={1}>
                          <Text fontWeight="semibold">
                            Barang: {order.orderItems?.[0]?.quantity || 0}
                          </Text>
                        </Flex>
                      </Box>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="end">
                      <Text>Total belanja</Text>
                      <Text fontWeight="semibold">
                        Rp. {order.totalPrice.toLocaleString('id-ID') || '0'}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          );
        })
      ) : (
        <Text>Tidak ada pesanan yang siap dikirim</Text>
      )}
    </>
  );
}
