import {
  Box,
} from '@chakra-ui/react';
import SellerNavbar from '../../components/navbar';
import SellerFooter from '../../components/footer';
import { useEffect } from 'react';
import { NewKeep } from './new-keep';

const BuyerLayout = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <Box w="full" minH="100vh" className="font-poppins" overflowX="hidden">
      <SellerNavbar />
        <NewKeep/>
      <SellerFooter />
    </Box>
  );
};

export default BuyerLayout;
