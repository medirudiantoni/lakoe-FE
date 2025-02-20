import LoadingButton from '@/assets/Animation - 1738073283905.json';
import { Box } from '@chakra-ui/react';
import Lottie from 'lottie-react';

const LoadingButtonLottie = () => {
  return (
    <Box width={20} height={20} display={'flex'} alignItems={'center'}>
      <Lottie animationData={LoadingButton} loop={true} />
    </Box>
  );
};

export default LoadingButtonLottie;
