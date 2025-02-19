import { useEffect, useState, useRef } from 'react';
import { Box, Button, Flex, Image, Text, useDisclosure, Spinner } from '@chakra-ui/react';
import { useSellerStore } from '@/hooks/store';
import type { Order } from '@/features/auth/types/order.types';
import { useMutation } from '@tanstack/react-query';
import { processOrder } from '@/features/auth/services/order.service'; // Import fungsi dari service

type TabNewOrderProps = {
  orders: Order[];
};

export function TabNewOrder({ orders }: TabNewOrderProps) {
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { open, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    const filteredOrders = orders.filter(order => order.status === 'Pesanan Baru');
    setNewOrders(filteredOrders);
  }, [orders]);

 
  const { store } = useSellerStore.getState();
  const userId = store?.userId;
  if (!userId) {
    alert('User tidak ditemukan. Silakan login ulang.');
  }

 
  const { mutate: processOrderMutation, status } = useMutation({
    mutationFn: async (orderId: string) => {
      const selectedOrder = newOrders.find(order => order.id === orderId);
      if (!selectedOrder) throw new Error('Pesanan tidak ditemukan.');
  
      const invoice = selectedOrder.invoice;
      if (!invoice?.buyerId) throw new Error('Data pembeli tidak ditemukan.');
      if (!userId) throw new Error('User tidak ditemukan. Silakan login ulang.');
  
      return processOrder(orderId, userId, invoice.buyerId);
    },
    onSuccess: (data) => {
      alert(data?.message || 'Pesanan berhasil diproses!');
      onClose();
      setNewOrders(prev => prev.filter(order => order.id !== selectedOrderId));
    },
    onError: (error: any) => {
      alert(error?.message || 'Terjadi kesalahan.');
    },
  });
  


  const handleOpenDialog = (orderId: string) => {
    setSelectedOrderId(orderId);
    onOpen();
  };

  
  const handleProcessOrder = () => {
    if (selectedOrderId) {
      processOrderMutation(selectedOrderId);
    }
  };

  return (
    <>
      {newOrders.length > 0 ? (
        newOrders.map((order) => {
          const product = order.orderItems?.[0]?.product;

          if (!product) {
            return (
              <Box key={order.id} width="full" border="1px solid" borderColor="gray.200" height="190px" borderRadius="10px" mt={3} p={3}>
                <Text>Produk tidak ditemukan</Text>
              </Box>
            );
          }

          return (
            <Box key={order.id} width="full" border="1px solid" borderColor="gray.200" height="190px" borderRadius="10px" mt={3} p={3}>
              <Box>
                <Box display="flex" justifyContent="space-between" borderBottom="1px solid" borderColor="gray.300" pb={2}>
                  <Box>
                    <Button colorPalette="green">{order.status}</Button>
                    <Text fontSize="14px" mt={2} color="gray.400">
                      {order.invoice?.invoiceNumber || "No Invoice"}
                    </Text>
                  </Box>
                  <Button
                    variant="outline"
                    borderRadius="20px"
                    onClick={() => handleOpenDialog(order.id)}
                  >
                    {order.status === 'Pesanan Baru' ? 'Proses Pesanan' : 'Lihat Detail'}
                  </Button>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center">
                    <Image
                      src={product.attachments?.[0] || "https://via.placeholder.com/50"}
                      width="50px"
                      height="50px"
                      borderRadius="md"
                      mr={3}
                      alt="Product Image"
                    />
                    <Box>
                      <Text fontSize="20px" fontWeight="bold">
                        {product.name || "Produk Tidak Diketahui"}
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
                      Rp. {order.totalPrice?.toLocaleString("id-ID") || "0"}
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

      {/* Dialog Konfirmasi */}
      {open && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          p={5}
          zIndex="modal"
        >
          <Text mb={4}>Apakah Anda yakin ingin memproses pesanan ini?</Text>
          <Flex justifyContent="flex-end">
            <Button ref={cancelRef} onClick={onClose} mr={3}>
              Batal
            </Button>
            <Button colorScheme="blue" onClick={handleProcessOrder}>
              {status === 'pending' ? <Spinner size="sm" /> : "Proses"}
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
}