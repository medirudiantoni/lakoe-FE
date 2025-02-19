import animationData from '@/assets/spread-shape.json';
import { Box } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

const LottieSpread = () => {
  const [start, setStart] = useState(false);
  const onStart = () => {
    setTimeout(() => {
      setStart(true);
    }, 1000);
  };
  useEffect(() => onStart(), []);
  return (
    <Box width={500} height={500}>
      {start && <Lottie animationData={animationData} loop={false} />}
    </Box>
  );
};

export default LottieSpread;
