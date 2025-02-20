import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';

const LayoutBuyer = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default LayoutBuyer;
