import { InputGroup } from '@/components/ui/input-group';
import type { Order } from '@/features/auth/types/order.types';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Skeleton,
  Tabs,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { ChevronDown, NotepadText } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { TabAllOrder } from './tab-all-order';
import { TabCancelledOrder } from './tab-cancelled-order';
import { TabInDeliveryOrder } from './tab-indelivery-order';
import { TabNewOrder } from './tab-new-order';
import { TabNotYetPaidOrder } from './tab-notyetpaid-order';
import { TabOrderComplete } from './tab-order-complete-order';
import { TabReadyOrder } from './tab-ready-to-ship-order';

// Komponen SearchBar
function SearchBar() {
  return (
    <GridItem position={'relative'}>
      <InputGroup flex="1" width={'100%'}>
        <Input px={11} placeholder="Search produk" outline={'#0086B4'} />
      </InputGroup>
      <Box position={'absolute'} top={2} left={4}>
        <NotepadText color="#75757C" />
      </Box>
    </GridItem>
  );
}

// Komponen FilterMenu
function FilterMenu() {
  return (
    <GridItem>
      <Box position={'relative'}>
        <MenuRoot>
          <MenuTrigger asChild>
            <Button
              variant={'outline'}
              width={'100%'}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <span className="font-normal">Semua Kategori</span>
              <ChevronDown />
            </Button>
          </MenuTrigger>
          <MenuContent position={'absolute'} width={'full'}>
            <MenuItem value="new-txt">New Text File</MenuItem>
            <MenuItem value="new-file">New File...</MenuItem>
            <MenuItem value="new-win">New Window</MenuItem>
            <MenuItem value="open-file">Open File...</MenuItem>
            <MenuItem value="export">Export</MenuItem>
          </MenuContent>
        </MenuRoot>
      </Box>
    </GridItem>
  );
}

// Komponen SortMenu
function SortMenu() {
  return (
    <GridItem>
      <Box position={'relative'}>
        <MenuRoot>
          <MenuTrigger asChild>
            <Button
              variant={'outline'}
              width={'100%'}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <span className="font-normal">Urutkan</span>
              <ChevronDown />
            </Button>
          </MenuTrigger>
          <MenuContent position={'absolute'} width={'full'}>
            <MenuItem value="new-txt">New Text File</MenuItem>
            <MenuItem value="new-file">New File...</MenuItem>
            <MenuItem value="new-win">New Window</MenuItem>
            <MenuItem value="open-file">Open File...</MenuItem>
            <MenuItem value="export">Export</MenuItem>
          </MenuContent>
        </MenuRoot>
      </Box>
    </GridItem>
  );
}

// Komponen Order
export function Order() {
  const [status, setStatus] = useState('Semua');
  const [orders, setOrders] = useState<Order[]>([]);
  const [cachedOrders, setCachedOrders] = useState<Record<string, Order[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fungsi untuk mengambil data pesanan
  const fetchData = useCallback(async () => {
    if (cachedOrders[status]) {
      // Jika data sudah ada di cache, gunakan data tersebut
      setOrders(cachedOrders[status]);
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/order', {
        params: { status: status === 'Semua' ? undefined : status },
      });
      setOrders(data.orders);
      setCachedOrders((prev) => ({ ...prev, [status]: data.orders })); // Simpan data ke cache
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [status, cachedOrders]);

  useEffect(() => {
    fetchData();
  }, [status, fetchData]);

  if (isLoading) {
    return (
      <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
      </Box>
    );
  }

  if (error)
    return (
      <Text>
        Error: {error.message || 'Terjadi kesalahan saat memuat data'}
      </Text>
    );

  return (
    <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'semibold'} fontSize={'24px'}>
          Daftar Pesanan
        </Text>
      </Flex>

      <Tabs.Root
        value={status}
        mt={5}
        onValueChange={(details) => setStatus(details.value)}
      >
        <Tabs.List>
          <Tabs.Trigger value="Semua">Semua</Tabs.Trigger>
          <Tabs.Trigger value="Menunggu Pembayaran">Belum bayar</Tabs.Trigger>
          <Tabs.Trigger value="Pesanan Baru">Pesanan baru</Tabs.Trigger>
          <Tabs.Trigger value="Siap Dikirim">Siap dikirim</Tabs.Trigger>
          <Tabs.Trigger value="Dalam Pengiriman">Dalam pengiriman</Tabs.Trigger>
          <Tabs.Trigger value="Pesanan Selesai">Pesanan Selesai</Tabs.Trigger>
          <Tabs.Trigger value="Dibatalkan">Dibatalkan</Tabs.Trigger>
        </Tabs.List>

        <Grid templateColumns="repeat(3, 1fr)" width={'100%'} gap={2} mt={3}>
          <SearchBar />
          <FilterMenu />
          <SortMenu />
        </Grid>

        <Tabs.Content value="Semua">
          <TabAllOrder orders={orders} />
        </Tabs.Content>
        <Tabs.Content value="Menunggu Pembayaran">
          <TabNotYetPaidOrder orders={orders} />
        </Tabs.Content>
        <Tabs.Content value="Pesanan Baru">
          <TabNewOrder orders={orders} />
        </Tabs.Content>
        <Tabs.Content value="Siap Dikirim">
          <TabReadyOrder orders={orders} />
        </Tabs.Content>
        <Tabs.Content value="Dalam Pengiriman">
          <TabInDeliveryOrder orders={orders} />
        </Tabs.Content>
        <Tabs.Content value="Pesanan Selesai">
          <TabOrderComplete orders={orders} />
        </Tabs.Content>
        <Tabs.Content value="Dibatalkan">
          <TabCancelledOrder orders={orders} />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
