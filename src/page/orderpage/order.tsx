import { Box, Grid, GridItem } from '@chakra-ui/react';
import SideBar from '../sidebar/SideLeftBar';
import { ComponentOrder } from './component-order/component-order';
import Navbar from '@/components/navbar/Navbar';

const Order = () => {
  return (
    <Box>
      <Navbar />
      <Grid templateColumns="2fr 7fr" gap={3} width={'100%'} pt={'60px'}>
        <GridItem width={'100%'}>
          <Box
            h="100vh"
            width={'23%'}
            borderRight={'1.5px solid'}
            borderColor={'gray.200'}
            position={'fixed'}
          >
            <SideBar />
          </Box>
        </GridItem>
        <GridItem backgroundColor={'#F8F8F8'}>
          <Box h="100vh">
            <ComponentOrder />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Order;
