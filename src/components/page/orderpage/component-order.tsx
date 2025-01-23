import { InputGroup } from '@/components/ui/input-group';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { ChevronDown, NotepadText } from 'lucide-react';
import { Link } from 'react-router';

const orders = [
  {
    id: '1',
    status: 'Belum Bayar',
    colorPalette: 'yellow',
    invoice: 'INV/20230809/MPL/00000239',
    buttonLabel: 'Hubungi Pembeli',
    product: {
      name: 'Noise Cancelling Headphone Nirkabel WH-CH720N',
      quantity: 1,
      image:
        'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch720_Primary_image?$categorypdpnav$&fmt=png-alpha',
      price: '190.000',
    },
  },
  {
    id: 2,
    status: 'Pesanan Baru',
    colorPalette: 'green',
    invoice: 'INV/20230809/MPL/00000239',
    buttonLabel: 'Proses Pesanan',
    product: {
      name: 'Sony Playstation 5',
      quantity: 1,
      image:
        'https://images.tokopedia.net/img/cache/700/OJWluG/2022/3/21/9cc55e78-b91e-4b8b-a588-c4fa991fc89c.jpg?ect=4g',
      price: '19.000.000',
    },
  },
  {
    id: 3,
    status: 'Siap Dikirim',
    colorPalette: 'blue',
    invoice: 'INV/20230809/MPL/00000239',
    buttonLabel: 'Kabari Pembeli',
    product: {
      name: 'Monitor Game Full HD UltraGear™ 27”',
      quantity: 1,
      image:
        'https://www.lg.com/content/dam/channel/wcms/id/images/monitor/27gq50f-b_atiq_eain_id_c/gallery/large02.jpg',
      price: '1.957.000',
    },
  },
  {
    id: 4,
    status: 'Dalam Pengiriman',
    colorPalette: 'orange',
    invoice: 'INV/20230809/MPL/00000239',
    buttonLabel: 'Lihat Rincian Pengiriman',
    product: {
      name: 'Noise Cancelling Headphone Nirkabel WH-CH720N',
      quantity: 1,
      image:
        'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch720_Primary_image?$categorypdpnav$&fmt=png-alpha',
      price: '190.000',
    },
  },
  {
    id: 5,
    status: 'Pesanan Selesai',
    colorPalette: 'white',
    invoice: 'INV/20230809/MPL/00000239',
    buttonLabel: 'Hubungi Pembeli',
    product: {
      name: 'Noise Cancelling Headphone Nirkabel WH-CH720N',
      quantity: 1,
      image:
        'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch720_Primary_image?$categorypdpnav$&fmt=png-alpha',
      price: '190.000',
    },
  },
  {
    id: 6,
    status: 'Dibatalkan',
    colorPalette: 'red',
    invoice: 'INV/20230809/MPL/00000239',
    buttonLabel: 'Hubungi Pembeli',
    product: {
      name: 'Noise Cancelling Headphone Nirkabel WH-CH720N',
      quantity: 1,
      image:
        'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch720_Primary_image?$categorypdpnav$&fmt=png-alpha',
      price: '190.000',
    },
  },
];

export function ComponentOrder() {
  const notYetPaid = orders[0];
  const newOrder = orders[1];
  const readyToShip = orders[2];
  const inDelivery = orders[3];
  const orderCompleted = orders[4];
  const canceled = orders[5];
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
        <Tabs.Content value="semua">
          {orders.map((order, index) => (
            <Link to="/order-detail/:id">
              <Box
                width="full"
                border="1px solid"
                borderColor="gray.200"
                height="190px"
                borderRadius="10px"
                mt={3}
                p={3}
                key={index}
              >
                <Box>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    borderBottom={'1px solid'}
                    borderColor={'gray.300'}
                    pb={2}
                  >
                    <Box>
                      <Button colorPalette={`${order.colorPalette}`}>
                        {order.status}
                      </Button>
                      <Text fontSize={'14px'} mt={2} color={'gray.400'}>
                        INV/20230809/MPL/00000239
                      </Text>
                    </Box>
                    <Button variant={'outline'} borderRadius={'20px'}>
                      Hubungi Pembeli
                    </Button>
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Box display={'flex'} alignItems={'center'}>
                      <Image
                        src={order.product.image}
                        width={'24'}
                        height={'24'}
                        borderRadius="md"
                        p={3}
                        mr={3}
                      />
                      <Box>
                        <Text fontSize="20px" fontWeight="bold">
                          {order.product.name}
                        </Text>
                        <Flex fontSize="14px" fontWeight="normal" mt={1}>
                          <Text fontWeight={'semibold'}>
                            Barang: {order.product.quantity}
                          </Text>
                        </Flex>
                      </Box>
                    </Box>
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      justifyContent={'space-between'}
                      alignItems={'end'}
                    >
                      <Text>Total belanja</Text>
                      <Text fontWeight={'semibold'}>
                        Rp.{order.product.price}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          ))}
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
                display={'flex'}
                justifyContent={'space-between'}
                borderBottom={'1px solid'}
                borderColor={'gray.300'}
                pb={2}
              >
                <Box>
                  <Button colorPalette={`${notYetPaid.colorPalette}`}>
                    {notYetPaid.status}
                  </Button>
                  <Text fontSize={'14px'} mt={2} color={'gray.400'}>
                    INV/20230809/MPL/00000239
                  </Text>
                </Box>
                <Button variant={'outline'} borderRadius={'20px'}>
                  Hubungi Pembeli
                </Button>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box display={'flex'} alignItems={'center'}>
                  <Image
                    src={notYetPaid.product.image}
                    width={'24'}
                    height={'24'}
                    borderRadius="md"
                    p={3}
                    mr={3}
                  />
                  <Box>
                    <Text fontSize="20px" fontWeight="bold">
                      {notYetPaid.product.name}
                    </Text>
                    <Flex fontSize="14px" fontWeight="normal" mt={1}>
                      <Text fontWeight={'semibold'}>
                        Barang: {notYetPaid.product.quantity}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  alignItems={'end'}
                >
                  <Text>Total belanja</Text>
                  <Text fontWeight={'semibold'}>
                    Rp.{notYetPaid.product.price}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="pesanan baru">
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
                display={'flex'}
                justifyContent={'space-between'}
                borderBottom={'1px solid'}
                borderColor={'gray.300'}
                pb={2}
              >
                <Box>
                  <Button colorPalette={`${newOrder.colorPalette}`}>
                    {newOrder.status}
                  </Button>
                  <Text fontSize={'14px'} mt={2} color={'gray.400'}>
                    INV/20230809/MPL/00000239
                  </Text>
                </Box>
                <Button variant={'outline'} borderRadius={'20px'}>
                  Hubungi Pembeli
                </Button>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box display={'flex'} alignItems={'center'}>
                  <Image
                    src={newOrder.product.image}
                    width={'24'}
                    height={'24'}
                    borderRadius="md"
                    p={3}
                    mr={3}
                  />
                  <Box>
                    <Text fontSize="20px" fontWeight="bold">
                      {newOrder.product.name}
                    </Text>
                    <Flex fontSize="14px" fontWeight="normal" mt={1}>
                      <Text fontWeight={'semibold'}>
                        Barang: {newOrder.product.quantity}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  alignItems={'end'}
                >
                  <Text>Total belanja</Text>
                  <Text fontWeight={'semibold'}>
                    Rp.{newOrder.product.price}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="siap dikirim">
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
                display={'flex'}
                justifyContent={'space-between'}
                borderBottom={'1px solid'}
                borderColor={'gray.300'}
                pb={2}
              >
                <Box>
                  <Button colorPalette={`${readyToShip.colorPalette}`}>
                    {readyToShip.status}
                  </Button>
                  <Text fontSize={'14px'} mt={2} color={'gray.400'}>
                    INV/20230809/MPL/00000239
                  </Text>
                </Box>
                <Button variant={'outline'} borderRadius={'20px'}>
                  Hubungi Pembeli
                </Button>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box display={'flex'} alignItems={'center'}>
                  <Image
                    src={readyToShip.product.image}
                    width={'24'}
                    height={'24'}
                    borderRadius="md"
                    p={3}
                    mr={3}
                  />
                  <Box>
                    <Text fontSize="20px" fontWeight="bold">
                      {readyToShip.product.name}
                    </Text>
                    <Flex fontSize="14px" fontWeight="normal" mt={1}>
                      <Text fontWeight={'semibold'}>
                        Barang: {readyToShip.product.quantity}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  alignItems={'end'}
                >
                  <Text>Total belanja</Text>
                  <Text fontWeight={'semibold'}>
                    Rp.{readyToShip.product.price}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="dalam pengiriman">
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
                display={'flex'}
                justifyContent={'space-between'}
                borderBottom={'1px solid'}
                borderColor={'gray.300'}
                pb={2}
              >
                <Box>
                  <Button colorPalette={`${inDelivery.colorPalette}`}>
                    {inDelivery.status}
                  </Button>
                  <Text fontSize={'14px'} mt={2} color={'gray.400'}>
                    INV/20230809/MPL/00000239
                  </Text>
                </Box>
                <Button variant={'outline'} borderRadius={'20px'}>
                  Hubungi Pembeli
                </Button>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box display={'flex'} alignItems={'center'}>
                  <Image
                    src={inDelivery.product.image}
                    width={'24'}
                    height={'24'}
                    borderRadius="md"
                    p={3}
                    mr={3}
                  />
                  <Box>
                    <Text fontSize="20px" fontWeight="bold">
                      {inDelivery.product.name}
                    </Text>
                    <Flex fontSize="14px" fontWeight="normal" mt={1}>
                      <Text fontWeight={'semibold'}>
                        Barang: {inDelivery.product.quantity}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  alignItems={'end'}
                >
                  <Text>Total belanja</Text>
                  <Text fontWeight={'semibold'}>
                    Rp.{inDelivery.product.price}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="pesanan selesai">
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
                display={'flex'}
                justifyContent={'space-between'}
                borderBottom={'1px solid'}
                borderColor={'gray.300'}
                pb={2}
              >
                <Box>
                  <Button colorPalette={`${orderCompleted.colorPalette}`}>
                    {orderCompleted.status}
                  </Button>
                  <Text fontSize={'14px'} mt={2} color={'gray.400'}>
                    INV/20230809/MPL/00000239
                  </Text>
                </Box>
                <Button variant={'outline'} borderRadius={'20px'}>
                  Hubungi Pembeli
                </Button>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box display={'flex'} alignItems={'center'}>
                  <Image
                    src={orderCompleted.product.image}
                    width={'24'}
                    height={'24'}
                    borderRadius="md"
                    p={3}
                    mr={3}
                  />
                  <Box>
                    <Text fontSize="20px" fontWeight="bold">
                      {orderCompleted.product.name}
                    </Text>
                    <Flex fontSize="14px" fontWeight="normal" mt={1}>
                      <Text fontWeight={'semibold'}>
                        Barang: {orderCompleted.product.quantity}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  alignItems={'end'}
                >
                  <Text>Total belanja</Text>
                  <Text fontWeight={'semibold'}>
                    Rp.{orderCompleted.product.price}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="batalkan">
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
                display={'flex'}
                justifyContent={'space-between'}
                borderBottom={'1px solid'}
                borderColor={'gray.300'}
                pb={2}
              >
                <Box>
                  <Button colorPalette={`${canceled.colorPalette}`}>
                    {canceled.status}
                  </Button>
                  <Text fontSize={'14px'} mt={2} color={'gray.400'}>
                    INV/20230809/MPL/00000239
                  </Text>
                </Box>
                <Button variant={'outline'} borderRadius={'20px'}>
                  Hubungi Pembeli
                </Button>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box display={'flex'} alignItems={'center'}>
                  <Image
                    src={canceled.product.image}
                    width={'24'}
                    height={'24'}
                    borderRadius="md"
                    p={3}
                    mr={3}
                  />
                  <Box>
                    <Text fontSize="20px" fontWeight="bold">
                      {canceled.product.name}
                    </Text>
                    <Flex fontSize="14px" fontWeight="normal" mt={1}>
                      <Text fontWeight={'semibold'}>
                        Barang: {canceled.product.quantity}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  alignItems={'end'}
                >
                  <Text>Total belanja</Text>
                  <Text fontWeight={'semibold'}>
                    Rp.{canceled.product.price}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
