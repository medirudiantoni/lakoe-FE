import animationData from '@/assets/Animation - 1739231850537.json';
import { Box } from '@chakra-ui/react';
import Lottie from 'lottie-react';

const LoadingLottieBuyer = () => {
  return (
    <Box width={20} height={20} mt={-20}>
      <Lottie animationData={animationData} loop={true} />
    </Box>
  );
};

export default LoadingLottieBuyer;
