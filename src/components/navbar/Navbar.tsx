import { Box } from '@chakra-ui/react';
import LogoIcon from '../icons/logo';

const Navbar = () => {
  return (
    <Box
      h={'10vh'}
      border={'1px solid'}
      borderColor={'#E6E6E6'}
      position={'fixed'}
      width={'100%'}
      backgroundColor={'white'}
      zIndex={99}
      paddingX={9}
      py={3}
      display={'flex'}
      alignItems={'center'}
    >
      <LogoIcon />
    </Box>
  );
};

export default Navbar;
