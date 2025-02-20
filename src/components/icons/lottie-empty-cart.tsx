import animationData from '@/assets/empty-cart.json';
import { Box } from '@chakra-ui/react';
import Lottie from 'lottie-react';

const EmptyCartLottie = () => {
  return (
    <Box width={'40'} height={'40'}>
      <Lottie animationData={animationData} loop={true} size={5} />
    </Box>
  );
};

export default EmptyCartLottie;
