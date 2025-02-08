import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { BoxIcon, CircleDollarSign, ShoppingCart, Users } from 'lucide-react';
import banner from '../../assets/Banner.png';
import { ChartComponent } from './chart';
import { TableDemo } from './table';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth-store';

export function Dashboard() {
  const { user } = useAuthStore();
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

        <Grid templateColumns={'repeat(3, 1fr)'} gap={'3'} mt={'5'}>
          <GridItem
            backgroundColor={'#F8F8F8'}
            display={'flex'}
            justifyContent={'center'}
            p={4}
          >
            <Flex flexDirection={'column'} alignItems={'center'}>
              <Text fontWeight={'semibold'}>Total Produk</Text>
              <Text fontWeight={'bold'}>1000</Text>
            </Flex>
          </GridItem>
          <GridItem
            backgroundColor={'#F8F8F8'}
            display={'flex'}
            justifyContent={'center'}
            p={4}
          >
            <Flex flexDirection={'column'} alignItems={'center'}>
              <Text fontWeight={'semibold'}>Aktivitas</Text>
              <Text fontWeight={'bold'}>100</Text>
            </Flex>
          </GridItem>
          <GridItem
            backgroundColor={'#F8F8F8'}
            display={'flex'}
            justifyContent={'center'}
            p={4}
          >
            <Flex flexDirection={'column'} alignItems={'center'}>
              <Text fontWeight={'semibold'}>Saldo</Text>
              <Text fontWeight={'bold'}>Rp 78.365.000,-</Text>
            </Flex>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={5}>
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
                  <Text fontWeight="bold">Rp 78.365.000,-</Text>
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
                  <Text fontWeight="bold">634</Text>
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
                  <Text fontWeight="bold">912</Text>
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
                  <Text fontWeight="bold">400</Text>
                </Box>
              </GridItem>
            </Grid>
          </Box>

          <ChartComponent />
        </Grid>
        <TableDemo />
      </Box>
    </Box>
  );
}
