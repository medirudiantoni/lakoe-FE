import Lottie from 'lottie-react';
import animationData from '@/assets/Animation - 1739231850537.json';
import { Box } from '@chakra-ui/react';

const LoadingLottieBuyer = () => {
    return (
        <Box width={20} height={20} mt={-14}>
            <Lottie animationData={animationData} loop={true} />
        </Box>
    );
};

export default LoadingLottieBuyer;