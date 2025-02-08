import Lottie from 'lottie-react';
import animationData from '@/assets/Animation - 1738913398923.json';
import { Box } from '@chakra-ui/react';

const ProfileLottie = () => {
  return (
    <Box width={230} height={230}>
      <Lottie animationData={animationData} loop={true} size={5} />
    </Box>
  );
};

export default ProfileLottie;
