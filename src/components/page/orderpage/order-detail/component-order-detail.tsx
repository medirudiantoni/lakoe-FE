import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router';

import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb';
import { ClipboardLink, ClipboardRoot } from '@/components/ui/clipboard';
import {
  Calendar,
  ChevronDown,
  CircleUser,
  NotepadText,
  NotepadTextDashed,
  Package,
  Truck,
  WalletMinimal,
  X,
} from 'lucide-react';

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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '6',
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
    id: '7',
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

export function ComponentOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const order = orders.find((order) => order.id === id);

  if (!order) {
    return (
      <Box p={3} m={4} textAlign="center" color="red.500">
        <p>Pesanan tidak ditemukan!</p>
      </Box>
    );
  }

  return (
    <Box p={3} m={4}>
      <BreadcrumbRoot>
        <BreadcrumbLink>
          <Link to="/order-list" className="text-blue-400">
            Daftar Pesanan
          </Link>
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>{order.product.name}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Box
        width="full"
        border="1px solid"
        borderColor="gray.200"
        height="140px"
        borderRadius="10px"
        backgroundColor={'#FFFF'}
        mt={3}
        p={3}
      >
        <Box display={'flex'} alignItems={'start'} gap={'2'}>
          <NotepadText color="#75757C" size={'35px'} />
          <Box>
            <Button colorPalette={order.colorPalette} px={2}>
              {order.status}
            </Button>
            <Text fontSize={'14px'} mt={2}>
              Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai{' '}
              <span className="font-bold">10 Agustus 2023 - 00:00 WIB</span>{' '}
              Silakan tunggu sampai pembayaran terkonfirmasi sebelum mengirimkan
              barang.
            </Text>
            <Box display={'flex'} alignItems={'center'} mt={2}>
              <Text fontSize={'14px'} color={'blue.400'}>
                Lihat Riwayat Pesanan
              </Text>
              <ChevronDown size={'18px'} color="#42A5F5" />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        width="full"
        border="1px solid"
        borderColor="gray.200"
        height="140px"
        borderRadius="10px"
        backgroundColor={'#FFFF'}
        mt={3}
        display={'flex'}
        flexDirection={'column'}
        gap={5}
        p={3}
        px={3.5}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box display={'flex'} alignItems={'start'} gap={'2'}>
            <Calendar color="#75757C" size={'25px'} />
            <Text>Tanggal</Text>
          </Box>
          <Text color={'#75757C'}>09 Agustus 2023 - 19:43 WIB</Text>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box display={'flex'} alignItems={'start'} gap={'2'}>
            <NotepadTextDashed color="#75757C" size={'25px'} />
            <Text>Invoice</Text>
          </Box>
          <ClipboardRoot value={`${order.invoice}`}>
            <Flex alignItems={'center'} gap={'3'}>
              <ClipboardLink
                color="blue.400"
                textStyle="md"
                cursor={'pointer'}
              />
              <Text color={'#75757C'}>{order.invoice}</Text>
            </Flex>
          </ClipboardRoot>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box display={'flex'} alignItems={'start'} gap={'2'}>
            <CircleUser color="#75757C" size={'25px'} />
            <Text>Pembeli</Text>
          </Box>
          {/* <WhatsappIcon/> */}
          <Text color={'#75757C'}>Marco</Text>
        </Box>
      </Box>

      <Box
        width="full"
        border="1px solid"
        borderColor="gray.200"
        height="160px"
        borderRadius="10px"
        mt={3}
        display={'flex'}
        flexDirection={'column'}
        gap={5}
        p={3}
        px={3.5}
        backgroundColor={'#FFFF'}
      >
        <Box display={'flex'} alignItems={'start'} gap={'2'}>
          <Package color="#75757C" size={'25px'} />
          <Box width={'full'}>
            <Text>Detail Product</Text>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              width="full"
              border="1px solid"
              borderColor="gray.200"
              height="90px"
              borderRadius="10px"
              p={3}
              mt={3}
              backgroundColor={'#FFFF'}
            >
              <Box display={'flex'} alignItems={'center'}>
                <Image
                  src={order.product.image}
                  width={'24'}
                  height={'24'}
                  borderRadius="md"
                  py={3}
                  objectFit={'contain'}
                  mr={3}
                />
                <Box>
                  <Text fontSize="20px" fontWeight="bold">
                    {order.product.name}
                  </Text>
                  <Flex fontSize="14px" fontWeight="normal" mt={1}>
                    <Text
                      fontWeight={'semibold'}
                      display={'flex'}
                      alignItems={'center'}
                    >
                      {order.product.quantity} <X size={'16px'} /> Rp.
                      {order.product.price}
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
                <Text fontWeight={'semibold'}>Rp.{order.product.price}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        width="full"
        border="1px solid"
        borderColor="gray.200"
        height="220px"
        borderRadius="10px"
        mt={3}
        display={'flex'}
        flexDirection={'column'}
        gap={5}
        p={3}
        px={3.5}
        backgroundColor={'#FFFF'}
      >
        <Box display={'flex'} alignItems={'start'} gap={'2'}>
          <Truck color="#75757C" size={'25px'} />
          <Box width={'full'}>
            <Text>Detail Pengiriman</Text>
          </Box>
        </Box>
        <Grid templateColumns="1fr 3fr">
          <GridItem display={'flex'} flexDirection={'column'} gap={2}>
            <Text color={'#75757C'}>Kurir</Text>
            <ClipboardRoot value={`JnT Express`}>
              <Flex alignItems={'center'} gap={'3'}>
                <Text color={'#75757C'}>No Resi</Text>
                <ClipboardLink
                  color="blue.400"
                  textStyle="md"
                  cursor={'pointer'}
                />
              </Flex>
            </ClipboardRoot>
            <ClipboardRoot
              value={`Jl. Elang IV, Sawah Lama, Kec. Ciputat, Kota Tangerang Selatan, Banten 15413, 081234567890, Marco`}
            >
              <Flex alignItems={'center'} gap={'3'}>
                <Text color={'#75757C'}>Alamat</Text>
                <ClipboardLink
                  color="blue.400"
                  textStyle="md"
                  cursor={'pointer'}
                />
              </Flex>
            </ClipboardRoot>
          </GridItem>
          <GridItem display={'flex'} flexDirection={'column'} gap={2}>
            <Text>JnT Express</Text>
            <Text>-</Text>
            <Box>
              <Text>
                Jl. Elang IV, Sawah Lama, Kec. Ciputat, Kota Tangerang Selatan,
                Banten 15413
              </Text>
              <Text>081234567890</Text>
              <Text>Marco</Text>
            </Box>
          </GridItem>
        </Grid>
      </Box>

      <Box
        width="full"
        border="1px solid"
        borderColor="gray.200"
        height="280px"
        borderRadius="10px"
        mt={3}
        display={'flex'}
        flexDirection={'column'}
        gap={5}
        p={3}
        px={3.5}
        backgroundColor={'#FFFF'}
      >
        <Box display={'flex'} alignItems={'start'} gap={'2'}>
          <WalletMinimal color="#75757C" size={'25px'} />
          <Box width={'full'}>
            <Text>Rincian Pembayaran</Text>
          </Box>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          borderBottom={'1px solid'}
          borderColor={'gray.400'}
          pb={'5'}
        >
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text>Total Harga (1 barang)</Text>
            <Text fontWeight={'bold'}>Rp.190.000</Text>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text>Total Ongkos Kirim(10kg)</Text>
            <Text fontWeight={'bold'}>Rp.10.000</Text>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text>Diskon</Text>
            <Text fontWeight={'bold'}>Rp.0</Text>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text>Layanan</Text>
            <Text fontWeight={'bold'}>Rp.0</Text>
          </Box>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          fontWeight={'bold'}
          fontSize={'24px'}
        >
          <Text>Total Penjualan</Text>
          <Text>Rp.200.000</Text>
        </Box>
      </Box>
    </Box>
  );
}
