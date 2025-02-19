import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import Navbar from '../navbar/Navbar';
import SideBar from '@/page/sidebar/SideLeftBarAdmin';

const LayoutAdmin = () => {
  return (
    <Box>
      <Navbar />
      <Grid templateColumns="1.5fr 7fr" gap={3} width={'100%'} pt={'60px'}>
        <GridItem width={'100%'}>
          <Box
            h="100vh"
            width={'18.4%'}
            borderRight={'1.5px solid'}
            borderColor={'gray.200'}
            position={'fixed'}
          >
            <SideBar />
          </Box>
        </GridItem>
        <GridItem backgroundColor={'#F8F8F8'}>
          <Box h="100vh">
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default LayoutAdmin;
