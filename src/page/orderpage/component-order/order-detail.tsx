import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from '@/components/ui/timeline';
import {
  Box,
  Button,
  Collapsible,
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
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleUser,
  NotepadText,
  NotepadTextDashed,
  Package,
  Truck,
  WalletMinimal,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { LuCheck, LuPackage, LuShip } from 'react-icons/lu';
import orders from '@/data-dummy/orders.json';

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const order = orders.find((order) => order.id === id);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

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
        // height="140px"
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
          </Box>
        </Box>
        <Collapsible.Root ml={'11'}>
          <Collapsible.Trigger paddingY="3" onClick={toggleCollapsible}>
            <Box display="flex" alignItems="center" mt={2} cursor="pointer">
              <Text fontSize="14px" color="blue.400">
                {isOpen ? 'Sembunyikan' : 'Lihat Riwayat Pesanan'}
              </Text>
              {isOpen ? (
                <ChevronUp size="18px" color="#42A5F5" />
              ) : (
                <ChevronDown size="18px" color="#42A5F5" />
              )}
            </Box>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <TimelineRoot maxW="400px">
              <TimelineItem>
                <TimelineConnector backgroundColor={'blue.400'}>
                  <Circle/>
                </TimelineConnector>
                <TimelineContent>
                  <TimelineTitle>Product Shipped</TimelineTitle>
                  <TimelineDescription>13th May 2021</TimelineDescription>
                  <Text textStyle="sm">
                    We shipped your product via <strong>FedEx</strong> and it
                    should arrive within 3-5 business days.
                  </Text>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineConnector backgroundColor={'gray.500'}>
                  <Circle/>
                </TimelineConnector>
                <TimelineContent>
                  <TimelineTitle textStyle="sm">Order Confirmed</TimelineTitle>
                  <TimelineDescription>18th May 2021</TimelineDescription>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineConnector  backgroundColor={'gray.500'}>
                  <Circle/>
                </TimelineConnector>
                <TimelineContent>
                  <TimelineTitle textStyle="sm">Order Delivered</TimelineTitle>
                  <TimelineDescription>
                    20th May 2021, 10:30am
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            </TimelineRoot>
          </Collapsible.Content>
        </Collapsible.Root>
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
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} alignItems={'start'} gap={'2'}>
            <Truck color="#75757C" size={'25px'} />
            <Box width={'full'}>
              <Text>Detail Pengiriman</Text>
            </Box>
          </Box>
          <DialogRoot
            lazyMount
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
          >
            <DialogTrigger asChild>
              <Text color={'blue.400'} cursor={'pointer'} fontWeight={'bold'}>
                Lacak Pengiriman
              </Text>
            </DialogTrigger>

            <DialogContent width={'60%'}>
              <DialogHeader>
                <DialogTitle>Lacak Pengiriman</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Grid templateColumns="repeat(2, 1fr)">
                  <GridItem display={'flex'} flexDirection={'column'} gap={'3'}>
                    <Box>
                      <Text>Kurir</Text>
                      <Text fontWeight={'bold'}>J&T Express</Text>
                    </Box>
                    <Box>
                      <Text>No Resi</Text>
                      <Text fontWeight={'bold'}>JT6268865922</Text>
                    </Box>
                    <Box>
                      <Text>Pengiriman</Text>
                      <Text fontWeight={'bold'}>Cakebyadeline</Text>
                    </Box>
                  </GridItem>
                  <GridItem>
                    <Box>
                      <Text>Penerima</Text>
                      <Box>
                        <Text fontWeight={'bold'}>Marco</Text>
                        <Text>
                          Jl. Elang IV, Sawah Lama, Kec. Ciputat, Kota Tangerang
                          Selatan, Banten 15413
                        </Text>
                      </Box>
                    </Box>
                  </GridItem>
                </Grid>
                <Text mt={'5'}>
                  Status:{' '}
                  <span className="font-bold">Dalam Proses Pengiriman</span>
                </Text>
                <Box
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="10px"
                  mt={3}
                  p={3}
                >
                  <TimelineRoot maxW="400px">
                    <TimelineItem>
                      <TimelineConnector>
                        <LuShip />
                      </TimelineConnector>
                      <TimelineContent>
                        <TimelineTitle>Product Shipped</TimelineTitle>
                        <TimelineDescription>13th May 2021</TimelineDescription>
                        <Text textStyle="sm">
                          We shipped your product via <strong>FedEx</strong> and
                          it should arrive within 3-5 business days.
                        </Text>
                      </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                      <TimelineConnector>
                        <LuCheck />
                      </TimelineConnector>
                      <TimelineContent>
                        <TimelineTitle textStyle="sm">
                          Order Confirmed
                        </TimelineTitle>
                        <TimelineDescription>18th May 2021</TimelineDescription>
                      </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                      <TimelineConnector>
                        <LuPackage />
                      </TimelineConnector>
                      <TimelineContent>
                        <TimelineTitle textStyle="sm">
                          Order Delivered
                        </TimelineTitle>
                        <TimelineDescription>
                          20th May 2021, 10:30am
                        </TimelineDescription>
                      </TimelineContent>
                    </TimelineItem>
                  </TimelineRoot>
                </Box>
              </DialogBody>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
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
