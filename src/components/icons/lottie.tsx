import Lottie from 'lottie-react';
import animationData from '@/assets/Animation - 1738074442844.json';
import { Box } from '@chakra-ui/react';

const LoadingLottie = () => {
  return (
    <Box width={20} height={20}>
      <Lottie animationData={animationData} loop={true} size={5} />
    </Box>
  );
};

export default LoadingLottie;
