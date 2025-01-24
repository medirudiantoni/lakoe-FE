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
  Tabs,
  Text,
} from '@chakra-ui/react';
import { ChevronDown, NotepadText } from 'lucide-react';
import { TabAllOrder } from './tab-all-order';
import { TabNotYetPaidOrder } from './tab-notyetpaid-order';
import { TabNewOrder } from './tab-new-order';
import { TabReadyOrder } from './tab-ready-to-ship-order';
import { TabInDeliveryOrder } from './tab-indelivery-order';
import { TabOrderComplete } from './tab-order-complete-order';
import { TabCancelledOrder } from './tab-cancelled-order';
import { InputGroup } from '@/components/ui/input-group';

export function ComponentOrder() {
  return (
    <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'semibold'} fontSize={'24px'}>
          Daftar Pesanan
        </Text>
      </Flex>
      <Tabs.Root defaultValue="semua" mt={5}>
        <Tabs.List>
          <Tabs.Trigger value="semua">Semua</Tabs.Trigger>
          <Tabs.Trigger value="belum bayar">Belum bayar</Tabs.Trigger>
          <Tabs.Trigger value="pesanan baru">Pesanan baru</Tabs.Trigger>
          <Tabs.Trigger value="siap dikirim">Siap dikirim</Tabs.Trigger>
          <Tabs.Trigger value="dalam pengiriman">Dalam pengiriman</Tabs.Trigger>
          <Tabs.Trigger value="pesanan selesai">Pesanan Selesai</Tabs.Trigger>
          <Tabs.Trigger value="batalkan">DiBatalkan</Tabs.Trigger>
        </Tabs.List>
        <Grid templateColumns="repeat(3, 1fr)" width={'100%'} gap={2} mt={3}>
          <GridItem position={'relative'}>
            <InputGroup flex="1" width={'100%'}>
              <Input px={11} placeholder="Search produk" outline={'#0086B4'} />
            </InputGroup>
            <Box position={'absolute'} top={2} left={4}>
              <NotepadText color="#75757C" />
            </Box>
          </GridItem>
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
        </Grid>
        <Tabs.Content value="semua" pb={30}>
          <TabAllOrder />
        </Tabs.Content>
        <Tabs.Content value="belum bayar">
          {/* <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
          py={'40px'}
        >
            
          <SearchX size={'55px'} color="#75757C"  />
          <Box ml={2} >
          <Text fontWeight={''} fontSize={'24px'} mt={'-10px'}>Oops, pesanan yang kamu cari tidak ditemukan</Text>
          <Text fontSize={'14px'} color={'gray.500'}>Coba bisa cari dengan kata kunci lain</Text>
          </Box>
          
        </Box> */}
          <TabNotYetPaidOrder />
        </Tabs.Content>
        <Tabs.Content value="pesanan baru">
          <TabNewOrder />
        </Tabs.Content>
        <Tabs.Content value="siap dikirim">
          <TabReadyOrder />
        </Tabs.Content>
        <Tabs.Content value="dalam pengiriman">
          <TabInDeliveryOrder />
        </Tabs.Content>
        <Tabs.Content value="pesanan selesai">
          <TabOrderComplete />
        </Tabs.Content>
        <Tabs.Content value="batalkan">
          <TabCancelledOrder />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
