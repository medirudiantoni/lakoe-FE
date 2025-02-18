import { Order } from '@/features/auth/types/order.types';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import ContactBuyerDialog from '../../orderpage/dialog-order-page/contact-buyer-dialog';
interface TabNewOrderProps {
  orders: Order[];
}

export function TabNotYetPaidOrder({ orders }: TabNewOrderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [notYetPaid, setNotYetPaid] = useState<Order[]>([]);
  useEffect(() => {
    console.log('Received Orders:', orders);
    const filteredOrders = orders.filter((order) => {
      console.log('Order Status:', order.status);
      return order.status === 'Menunggu Pembayaran';
    });

    console.log('Filtered New Orders:', filteredOrders);
    setNotYetPaid(filteredOrders);
  }, [orders]);

  const handleContactBuyer = async (order: any) => {
    try {
      const token = Cookies.get('token');
      const templateId = '8a6d8c7e-2826-4747-8869-ff47440d50e5';
      const storeName = order.store.name;
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/message-template/${templateId}/use/`,
        {
          buyerName: order.recipientName,
          productName: order.orderItems?.[0]?.product?.name,
          storeName: storeName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(data.message);
      setIsOpen(true);
    } catch (error) {
      console.error('Gagal memuat template pesan:', error);
    }
  };

  return (
    <>
      {notYetPaid.length > 0 ? (
        notYetPaid.map((order) => {
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
                    <Button colorPalette="yellow">{order.status}</Button>
                    <Text fontSize="14px" mt={2} color="gray.400">
                      {order.invoice?.invoiceNumber || 'No Invoice'}
                    </Text>
                  </Box>
                  <Button
                    key={order.id}
                    variant="outline"
                    borderRadius="20px"
                    onClick={() => handleContactBuyer(order)}
                  >
                    {order.status === 'Menunggu Pembayaran'
                      ? 'Hubungi Pembeli'
                      : 'Lihat Detail'}
                  </Button>
                  <ContactBuyerDialog
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    message={message}
                  />
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
          );
        })
      ) : (
        <Text>Tidak ada pesanan baru</Text>
      )}
    </>
  );
}
