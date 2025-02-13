import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import Navbar from '../navbar/Navbar';
import SideBar from '@/page/sidebar/SideLeftBar';

const LayoutBuyer = () => {
  return (
    <Box>
        <Outlet/>
    </Box>
  );
};

export default LayoutBuyer;
