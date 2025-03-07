import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { BoxIcon, CircleDollarSign, ShoppingCart, Users } from 'lucide-react';
import { useEffect } from 'react';
import banner from '../../assets/Banner.png';
import { TableDemo } from './table';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useSellerStore } from '@/hooks/store';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { fetchBalance } from '@/features/auth/services/store-service';
import WithdrawForm from './withdraw';
import { fetchOrders } from '@/features/auth/services/order.service';
import { getBuyerCount } from '@/features/auth/services/buyer';
import { useProductStore } from '@/features/auth/store/product-store';

export function Dashboard() {
  const { user } = useAuthStore();
  const { store } = useSellerStore();
  const { products } = useProductStore()
  const token = Cookies.get('token')
  const storeId = user?.Stores?.id
  const storeName = store?.name

  useEffect(()=>{
    console.log('akdaks', products)
  },[products])
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['balance', storeId], 
    queryFn: async () => {
      const response = await fetchBalance(storeId!, token!);
      console.log('cekkkk', response)
      return response;
    },
    enabled: !!store?.id, 
  });

  const { data: userCount, } = useQuery({
    queryKey: ['userCount', storeName],
    queryFn: () => getBuyerCount(storeName!, token!),
    enabled: !!storeName,
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['orders', user?.Stores?.id],
    queryFn: () => fetchOrders(token!),
    enabled: !!user?.Stores?.id && !!token,
  });

  useEffect(()=>{
    console.log('orderrss', orders)
  },[orders])

  const balance = data?.balance ?? 0;
  const totalRevenue = data?.totalRevenue ?? 0;

  useEffect(() => {
    console.log('dashboardedsfsfrr:', user);
  }, [user]);
  return (
    <Box>
      <Box position={'relative'}>
        <Image src={banner} p={5} width={'full'} />
        {/* <Button position={'absolute'} top={'220px'} left={'505px'} colorPalette={'gray'} variant={'solid'}>Klik untuk berlangganan</Button> */}
      </Box>
      <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Text fontWeight={'semibold'} fontSize={'24px'}>
            Dashboard
          </Text>
        </Flex>

        <Grid templateColumns={'repeat(1, 1fr)'} gap={'3'} mt={'5'}>
          {/* <GridItem
            backgroundColor={'#F8F8F8'}
            display={'flex'}
            justifyContent={'center'}
            p={4}
          >
            <Flex flexDirection={'column'} alignItems={'center'}>
              <Text fontWeight={'semibold'}>Total Produk</Text>
              <Text fontWeight={'bold'}>{products.length}</Text>
            </Flex>
          </GridItem> */}
   
          <GridItem
            backgroundColor={'#F8F8F8'}
            display={'flex'}
            justifyContent={'center'}
            p={4}
          >
            <Flex flexDirection={'column'} alignItems={'center'}>
            <Text fontWeight={'semibold'}>Saldo</Text>
            {isLoading ? (
              <Text fontWeight="bold">Loading...</Text>
            ) : isError || balance === undefined ? (
              <Text fontWeight="bold" color="red.500">
                Gagal Memuat
              </Text>
            ) : (
              <Text fontWeight="bold">
              Rp {balance.toLocaleString('id-ID') || '0'}
            </Text>
            
            )}
            </Flex>
          </GridItem>
        </Grid>
            <WithdrawForm storeId={storeId!}/>
        <Grid templateColumns="repeat(1, 1fr)" gap={4} mt={5}>
          <Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} height="100%">
              <GridItem
                backgroundColor="#F8F8F8"
                p={5}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box
                  backgroundColor={'#DBEAFE'}
                  maxW={'fit-content'}
                  p={3}
                  borderRadius={'10px'}
                >
                  <CircleDollarSign color="#2563EB" size={'30px'} />
                </Box>

                <Box mt={3} fontSize={'24px'}>
                  <Text fontSize="14px">Total Pendapatan</Text>
                  <Text fontWeight="bold">Rp {totalRevenue.toLocaleString('id-ID') || '0'}</Text>
                </Box>
              </GridItem>
              <GridItem
                backgroundColor="#F8F8F8"
                p={5}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box
                  backgroundColor={'#DBEAFE'}
                  maxW={'fit-content'}
                  p={3}
                  borderRadius={'10px'}
                >
                  <ShoppingCart color="#2563EB" size={'30px'} />
                </Box>
                <Box mt={3} fontSize={'24px'}>
                  <Text fontSize="14px">Total Order</Text>
                  <Text fontWeight="bold">{(orders?.length ?? 0).toLocaleString('id-ID')}</Text>
                </Box>
              </GridItem>
              <GridItem
                backgroundColor="#F8F8F8"
                p={5}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box
                  backgroundColor={'#DBEAFE'}
                  maxW={'fit-content'}
                  p={3}
                  borderRadius={'10px'}
                >
                  <BoxIcon color="#2563EB" size={'30px'} />
                </Box>
                <Box mt={3} fontSize={'24px'}>
                  <Text fontSize="14px">Produk terjual</Text>
                  <Text fontWeight="bold"> {(orders?.filter(order => order.status === "pesanan selesai").length ?? 0).toLocaleString('id-ID')}</Text>
                </Box>
              </GridItem>
              <GridItem
                backgroundColor="#F8F8F8"
                p={5}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box
                  backgroundColor={'#DBEAFE'}
                  maxW={'fit-content'}
                  p={3}
                  borderRadius={'10px'}
                >
                  <Users color="#2563EB" size={'30px'} />
                </Box>
                <Box mt={3} fontSize={'24px'}>
                  <Text fontSize="14px">Pelanggan Aktif</Text>
                  <Text fontWeight="bold">{userCount}</Text>
                </Box>
              </GridItem>
            </Grid>
          </Box>

          {/* <ChartComponent /> */}
        </Grid>
        <TableDemo />
      </Box>
    </Box>
  );
}
