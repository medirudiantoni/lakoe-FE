import { useState } from 'react';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { ProcessOrderDialog } from '../dialog-order-page/process-order-dialog'; 
import type { Order } from '@/features/auth/types/order.types';
import { processOrder } from '@/features/auth/services/order.service'; 
import { useSellerStore } from '@/hooks/store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router'; // Import useNavigate

const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    'Menunggu Pembayaran': 'yellow',
    'Pesanan Baru': 'green',
    'Siap Dikirim': 'blue',
    'Dalam Pengiriman': 'orange',
    'Pesanan Selesai': 'black',
    Dibatalkan: 'red',
  };
  return statusColors[status] || 'gray';
};

const getButtonLabel = (status: string): string => {
  const buttonLabels: Record<string, string> = {
    'Menunggu Pembayaran': 'Hubungi Pembeli',
    'Pesanan Baru': 'Proses Pesanan',
    'Siap Dikirim': 'Kabari Pembeli',
    'Dalam Pengiriman': 'Lihat Rincian Pengiriman',
    'Pesanan Selesai': 'Hubungi Pembeli',
    Dibatalkan: 'Hubungi Pembeli',
  };
  return buttonLabels[status] || 'Lihat Detail';
};

function OrderItem({ order }: { order: Order }) {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const { store } = useSellerStore.getState();
  const userId = store?.userId;

  const handleProcessOrder = async () => {
    const buyerId = order?.invoice?.buyerId;
  
    if (!userId || !buyerId) {
      console.error('userId atau buyerId tidak ditemukan');
      toast.error('Terjadi kesalahan: userId atau buyerId tidak ditemukan.');
      return;
    }
  
    setProcessing(true);
    try {
      const response = await processOrder(order.id, userId, buyerId);
      
      if (response?.message) {
        toast.success(response.message);
      } else {
        toast.success('Pesanan berhasil diproses!');
      }
  
      setDialogOpen(false);
    } catch (error: any) {
      console.error('Gagal memproses pesanan', error);
      const errorMessage = error.response?.data?.message || 'Gagal memproses pesanan. Coba lagi nanti.';
      toast.error(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  const firstItem = order.orderItems?.[0];

  return (
    <>
      <Box
        width="full"
        border="1px solid"
        borderColor="gray.200"
        height="190px"
        borderRadius="10px"
        mt={3}
        p={3}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          borderBottom="1px solid"
          borderColor="gray.300"
          pb={2}
        >
          <Box>
            <Button colorPalette={getStatusColor(order.status)}>
              {order.status}
            </Button>
            <Text fontSize="14px" mt={2} color="gray.400">
              {order.invoice?.invoiceNumber || 'No Invoice'}
            </Text>
          </Box>
          {order.status === 'Dalam Pengiriman' ? (
            <Button
              variant="outline"
              borderRadius="20px"
              onClick={() => navigate(`/order-detail/${order.id}`)} // Navigasi ke halaman detail order
            >
              {getButtonLabel(order.status)}
            </Button>
          ) : order.status === 'Pesanan Baru' ? (
            <Button
              variant="outline"
              borderRadius="20px"
              onClick={() => setDialogOpen(true)}
            >
              {getButtonLabel(order.status)}
            </Button>
          ) : (
            <Button variant="outline" borderRadius="20px">
              {getButtonLabel(order.status)}
            </Button>
          )}
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Image
              src={firstItem?.image?.[0] || 'https://via.placeholder.com/50'}
              width="50px"
              height="50px"
              borderRadius="md"
              mr={3}
              alt="Product Image"
            />
            <Box>
              <Text fontSize="20px" fontWeight="bold">
                {firstItem?.name || 'Produk Tidak Diketahui'}
              </Text>
              <Flex fontSize="14px" fontWeight="normal" mt={1}>
                <Text fontWeight="semibold">
                  Barang: {firstItem?.quantity || 0}
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

      <ProcessOrderDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleProcessOrder}
        isProcessing={isProcessing}
      />
    </>
  );
}

export function TabAllOrder({ orders }: { orders: Order[] }) {
  if (!orders || orders.length === 0) {
    return <Text>Tidak ada pesanan</Text>;
  }

  return (
    <>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </>
  );
}
