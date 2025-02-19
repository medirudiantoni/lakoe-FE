import { Box, Tabs, Text } from '@chakra-ui/react';
import {
  CircleCheck,
  MessageCircleX,
  Package,
  PackageCheck,
  ScanBarcode,
  Truck,
} from 'lucide-react';
import BuyerAllOrders from './all-orders';
import BuyerNullOrders from './null-order';

const BuyerOrderPage = () => {
  return (
    <Box bg="white" p="5" borderRadius="xl" w="full" overflowX="auto">
      <Text fontSize="xl" fontWeight="semibold" mb="5">
        Pesanan
      </Text>
      <Box w="1090px" overflowX="auto">
        <Box w="1090px" overflowX="auto">
          <Tabs.Root defaultValue="all" w="full">
            <Tabs.List>
              <Tabs.Trigger value="all">
                <Package />
                Semua Pesanan
              </Tabs.Trigger>
              <Tabs.Trigger value="unpaid">
                <ScanBarcode />
                Belum dibayar
              </Tabs.Trigger>
              <Tabs.Trigger value="processing">
                <PackageCheck />
                Diproses
              </Tabs.Trigger>
              <Tabs.Trigger value="shipped">
                <Truck />
                Dikirim
              </Tabs.Trigger>
              <Tabs.Trigger value="completed">
                <CircleCheck />
                Selesai
              </Tabs.Trigger>
              <Tabs.Trigger value="canceled">
                <MessageCircleX />
                dibatalkan
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="all">
              <BuyerAllOrders />
            </Tabs.Content>
            <Tabs.Content value="unpaid">
              <BuyerNullOrders />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Box>
  );
};

export default BuyerOrderPage;
