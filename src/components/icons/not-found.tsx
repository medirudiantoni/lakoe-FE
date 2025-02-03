import Lottie from 'lottie-react';
import animationData from '@/assets/404-not-found.json';
import { Box } from '@chakra-ui/react';

const LottieNotFound = () => {
  return (
    <Box width="96" height="96">
      <Lottie animationData={animationData} loop={true} />
    </Box>
  );
};

export default LottieNotFound;
