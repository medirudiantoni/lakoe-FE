import type { Order } from '@/features/auth/types/order.types';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router'; // Pastikan menggunakan `react-router-dom`

type TabNewOrderProps = {
  orders: Order[];
};

export function TabInDeliveryOrder({ orders }: TabNewOrderProps) {
  const [inDeliveryOrders, setInDeliveryOrders] = useState<Order[]>([]);

  useEffect(() => {
    console.log('Received Orders:', orders);
    const filteredOrders = orders.filter((order) => {
      console.log('Order Status:', order.status);
      return order.status === 'Dalam Pengiriman';
    });

    console.log('Filtered New Orders:', filteredOrders);
    setInDeliveryOrders(filteredOrders);
  }, [orders]);

  return (
    <>
      {inDeliveryOrders.length > 0 ? (
        inDeliveryOrders.map((order) => {
          const product = order.orderItems?.[0]?.product;

          if (!product) {
            return (
              <Box
                key={order.id}
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
                      <Button colorPalette="orange">{order.status}</Button>
                      <Text fontSize="14px" mt={2} color="gray.400">
                        {order.invoice?.invoiceNumber || 'No Invoice'}
                      </Text>
                    </Box>
                    <Button variant="outline" borderRadius="20px">
                      {order.status === 'Dalam Pengiriman'
                        ? 'Lihat Rincian Pengiriman'
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
                        src={
                          product.attachments?.[0] ||
                          'https://via.placeholder.com/50'
                        }
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
                        Rp. {order.totalPrice?.toLocaleString('id-ID') || '0'}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          );
        })
      ) : (
        <Text>Tidak ada pesanan dalam pengiriman</Text>
      )}
    </>
  );
}
