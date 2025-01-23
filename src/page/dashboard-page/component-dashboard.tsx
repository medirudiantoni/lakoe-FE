import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import banner from '../../assets/Banner.png';
import { BoxIcon, CircleDollarSign, ShoppingCart, Users } from 'lucide-react';

export function ComponentDashboard() {
  return (
    <Box>
      <Image src={banner} p={5} width={'full'} />
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
          <GridItem backgroundColor={'#F8F8F8'} p={5}>
            <CircleDollarSign color="#2563EB" />
            <Text fontSize={'14px'} mt={5}>
              Total Pendapatan
            </Text>
            <Text fontWeight={'bold'}>Rp 78.365.000,-</Text>
          </GridItem>
          <GridItem backgroundColor={'#F8F8F8'} p={5}>
            <ShoppingCart color="#2563EB" />
            <Text fontSize={'14px'} mt={5}>
              Total Order
            </Text>
            <Text fontWeight={'bold'}>634</Text>
          </GridItem>
          <GridItem backgroundColor={'#F8F8F8'} p={5}>
            <BoxIcon color="#2563EB" />
            <Text fontSize={'14px'} mt={5}>
              Produk terjual
            </Text>
            <Text fontWeight={'bold'}>912</Text>
          </GridItem>
          <GridItem backgroundColor={'#F8F8F8'} p={5}>
            <Users color="#2563EB" />
            <Text fontSize={'14px'} mt={5}>
              Kostumer Aktif
            </Text>
            <Text fontWeight={'bold'}>400</Text>
          </GridItem>
          {/* <ChartComponent/> */}
        </Grid>
      </Box>
    </Box>
  );
}
