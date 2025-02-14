import { Field } from '@/components/ui/field';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { LocationSetting } from '../location';
import {
  CircleCheck,
  MessageCircleX,
  Package,
  PackageCheck,
  ScanBarcode,
  Truck,
} from 'lucide-react';
import BuyerAllOrders from '../all-orders';
import BuyerNullOrders from '../null-order';

export function TabsPesanan() {
  return (
    <Box height={'60vh'}>
      <Tabs.Root defaultValue="members">
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
          <Tabs.Content value="all"><BuyerAllOrders /></Tabs.Content>
          <Tabs.Content value="unpaid"><BuyerNullOrders /></Tabs.Content>
          <Tabs.Content value="processing"><BuyerNullOrders /></Tabs.Content>
          <Tabs.Content value="shipped"><BuyerNullOrders /></Tabs.Content>
          <Tabs.Content value="completed"><BuyerAllOrders /></Tabs.Content>
          <Tabs.Content value="canceled"><BuyerNullOrders /></Tabs.Content>
        </Tabs.Root>
      </Tabs.Root>
    </Box>
  );
}
