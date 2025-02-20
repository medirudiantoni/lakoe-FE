import LoadingButton from '@/assets/Animation - 1740076902736.json';
import { Box } from '@chakra-ui/react';
import Lottie from 'lottie-react';

const LoadingSearchBuyer = () => {
  return (
    <Box width={96} height={96}>
      <Lottie animationData={LoadingButton} loop={true} />
    </Box>
  );
};

export default LoadingSearchBuyer;
