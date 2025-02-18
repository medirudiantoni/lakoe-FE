import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router'; 
import type { Order } from '@/features/auth/types/order.types';


const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    "Menunggu Pembayaran": "yellow",
    "Pesanan Baru": "green",
    "Siap Dikirim": "blue",
    "Dalam Pengiriman": "orange",
    "Pesanan Selesai": "black",
    "Dibatalkan": "red",
  };
  return statusColors[status] || "gray";
};


const getButtonLabel = (status: string): string => {
  const buttonLabels: Record<string, string> = {
    "Menunggu Pembayaran": "Hubungi Pembeli",
    "Pesanan Baru": "Proses Pesanan",
    "Siap Dikirim": "Kabari Pembeli",
    "Dalam Pengiriman": "Lihat Rincian Pengiriman",
    "Pesanan Selesai": "Hubungi Pembeli",
    "Dibatalkan": "Hubungi Pembeli",
  };
  return buttonLabels[status] || "Lihat Detail";
};


function OrderItem({ order }: { order: Order }) {
  const firstItem = order.orderItems?.[0];
 
  console.log(order.orderItems);
  return (
    <Link to={`/order-detail/${order.id}`}>
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
              {order.invoice?.invoiceNumber || "No Invoice"}
            </Text>
          </Box>
          <Button variant="outline" borderRadius="20px">
            {getButtonLabel(order.status)}
          </Button>
        </Box>

    
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Image
              src={firstItem?.image?.[0] || "https://via.placeholder.com/50"}
              width="50px"
              height="50px"
              borderRadius="md"
              mr={3}
              alt="Product Image"
            />
            <Box>
              <Text fontSize="20px" fontWeight="bold">
                {firstItem?.name || "Produk Tidak Diketahui"}
              </Text>
              <Flex fontSize="14px" fontWeight="normal" mt={1}>
                <Text fontWeight="semibold">
                  Barang: {firstItem?.quantity || 0}
                </Text>
              </Flex>
            </Box>
          </Box>

          {/* Total Belanja */}
          <Box display="flex" flexDirection="column" alignItems="end">
            <Text>Total belanja</Text>
            <Text fontWeight="semibold">
              Rp. {order.totalPrice?.toLocaleString("id-ID") || "0"}
            </Text>
          </Box>
        </Box>
      </Box>
    </Link>
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