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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/order/${id}`
      );
      console.log(response.data); // Debugging
      return response.data;
    },
    enabled: !!id, // Hanya jalankan query jika ID ada
  });
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
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
  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error fetching orders</Text>;
  return (
    <>
      {data?.order?.orderItems?.length > 0 ? (
        data.order.orderItems.map((item: any, index: number) => {
          return (
            <Box p={3} m={4} key={index}>
              <BreadcrumbRoot>
                <BreadcrumbLink>
                  <Link to="/order-list" className="text-blue-400">
                    Daftar Pesanan
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbCurrentLink>{item.name}</BreadcrumbCurrentLink>
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
                    <Button
                      colorPalette={getStatusColor(data.order.status)}
                      px={2}
                    >
                      {data.order.status}
                    </Button>
                    <Text fontSize={'14px'} mt={2}>
                      Pesanan akan dibatalkan bila pembayaran tidak dilakukan
                      sampai{' '}
                      <span className="font-bold">
                        10 Agustus 2023 - 00:00 WIB
                      </span>{' '}
                      Silakan tunggu sampai pembayaran terkonfirmasi sebelum
                      mengirimkan barang.
                    </Text>
                  </Box>
                </Box>
                <Collapsible.Root ml={'11'}>
                  <Collapsible.Trigger paddingY="3" onClick={toggleCollapsible}>
                    <Box
                      display="flex"
                      alignItems="center"
                      mt={2}
                      cursor="pointer"
                    >
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
                          <Circle />
                        </TimelineConnector>
                        <TimelineContent>
                          <TimelineTitle>Product Shipped</TimelineTitle>
                          <TimelineDescription>
                            13th May 2021
                          </TimelineDescription>
                          <Text textStyle="sm">
                            We shipped your product via <strong>FedEx</strong>{' '}
                            and it should arrive within 3-5 business days.
                          </Text>
                        </TimelineContent>
                      </TimelineItem>

                      <TimelineItem>
                        <TimelineConnector backgroundColor={'gray.500'}>
                          <Circle />
                        </TimelineConnector>
                        <TimelineContent>
                          <TimelineTitle textStyle="sm">
                            Order Confirmed
                          </TimelineTitle>
                          <TimelineDescription>
                            18th May 2021
                          </TimelineDescription>
                        </TimelineContent>
                      </TimelineItem>

                      <TimelineItem>
                        <TimelineConnector backgroundColor={'gray.500'}>
                          <Circle />
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
                  <Text color={'#75757C'}>{data.order.createdAt}</Text>
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
                  <ClipboardRoot value={`${data.order.invoice.invoiceNumber}`}>
                    <Flex alignItems={'center'} gap={'3'}>
                      <ClipboardLink
                        color="blue.400"
                        textStyle="md"
                        cursor={'pointer'}
                      />
                      <Text color={'#75757C'}>
                        {data.order.invoice.invoiceNumber}
                      </Text>
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
                  <Text color={'#75757C'}>
                    {data.order.invoice.receiverName}
                  </Text>
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
                          src={
                            item.image?.[0] || 'https://via.placeholder.com/50'
                          }
                          width={'24'}
                          height={'24'}
                          borderRadius="md"
                          py={3}
                          objectFit={'contain'}
                          mr={3}
                        />
                        <Box>
                          <Text fontSize="20px" fontWeight="bold">
                            {item.name}
                          </Text>
                          <Flex fontSize="14px" fontWeight="normal" mt={1}>
                            <Text
                              fontWeight={'semibold'}
                              display={'flex'}
                              alignItems={'center'}
                            >
                              {item.quantity} <X size={'16px'} /> Rp.
                              {item.price}
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
                          Rp.{data.order.invoice.price.toLocaleString('id-ID')}
                        </Text>
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
                      <Text
                        color={'blue.400'}
                        cursor={'pointer'}
                        fontWeight={'bold'}
                      >
                        Lacak Pengiriman
                      </Text>
                    </DialogTrigger>

                    <DialogContent width={'60%'}>
                      <DialogHeader>
                        <DialogTitle>Lacak Pengiriman</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Grid templateColumns="repeat(2, 1fr)">
                          <GridItem
                            display={'flex'}
                            flexDirection={'column'}
                            gap={'3'}
                          >
                            <Box>
                              <Text>Kurir</Text>
                              <Text fontWeight={'bold'}>
                                {data.order.courier}
                              </Text>
                            </Box>
                            <Box>
                              <Text>No Resi</Text>
                              <Text fontWeight={'bold'}>
                                {data.order.invoice.waybill}
                              </Text>
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
                                <Text fontWeight={'bold'}>
                                  {data.order.invoice.receiverName}
                                </Text>
                                <Text>{data.order.recipientAddress}</Text>
                              </Box>
                            </Box>
                          </GridItem>
                        </Grid>
                        <Text mt={'5'}>
                          Status:{' '}
                          <span className="font-bold">
                            {data.order.invoice.status}
                          </span>
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
                                <TimelineDescription>
                                  13th May 2021
                                </TimelineDescription>
                                <Text textStyle="sm">
                                  We shipped your product via{' '}
                                  <strong>FedEx</strong> and it should arrive
                                  within 3-5 business days.
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
                                <TimelineDescription>
                                  18th May 2021
                                </TimelineDescription>
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
                    <ClipboardRoot value={`${data.order.courier}`}>
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
                    <Text>{data.order.courier}</Text>
                    <Text>{data.order.invoice.waybill}</Text>
                    <Box>
                      <Text>{data.order.recipientAddress}</Text>
                      <Text> {data.order.invoice.receiverPhone}</Text>
                      <Text>{data.order.invoice.receiverName}</Text>
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
                    <Text>Total Harga ({item.quantity} barang)</Text>
                    <Text fontWeight={'bold'}>
                      Rp.{`${data.order.invoice.price.toLocaleString('id-ID')}`}
                    </Text>
                  </Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Text>Total Ongkos Kirim({item.weight} gram)</Text>
                    <Text
                      fontWeight={'bold'}
                    >{`${data.order.invoice.serviceCharge.toLocaleString('id-ID')}`}</Text>
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
                  <Text>
                    {' '}
                    Rp.{`${data.order.totalPrice.toLocaleString('id-ID')}`}
                  </Text>
                </Box>
              </Box>
            </Box>
          );
        })
      ) : (
        <Text>Tidak ada pesanan</Text>
      )}
    </>
  );
}
