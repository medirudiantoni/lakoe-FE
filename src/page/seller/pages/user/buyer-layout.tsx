import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import SellerFooter from '../../components/footer';
import SellerNavbar from '../../components/navbar';
import { NewKeep } from './new-keep';

const BuyerLayout = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <Box w="full" minH="100vh" className="font-poppins" overflowX="hidden">
      <SellerNavbar />
      <NewKeep />
      <SellerFooter />
    </Box>
  );
};

export default BuyerLayout;
