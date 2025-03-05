import { Button, HStack, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router';
import LogoIcon from '../icons/logo';

const Navbar_Landing_page = () => {
  const navigate = useNavigate();
  return (
    <HStack
      justifyContent={'space-between'}
      position="fixed"
      zIndex={10}
      top={0}
      left={0}
      w="full"
      bg="#fff"
    >
      <HStack justifyContent="space-between" w="full" h="fit" px="20" py="5">
        <LogoIcon />
        <HStack
          gap="10"
          fontSize="xl"
          fontWeight="medium"
          display={{ base: 'none', lg: 'flex' }}
        >
          <Link to={'/'}>
            <Text color="gray.600" _hover={{ color: 'blue.600' }}>
              Beranda
            </Text>
          </Link>
          <Link to={'/tentang'}>
            <Text color="blue.600" _hover={{ color: 'blue.600' }}>
              Tentang
            </Text>
          </Link>
          <Link to={'/pricing'}>
            <Text color="gray.600" _hover={{ color: 'blue.600' }}>
              Pricing
            </Text>
          </Link>
        </HStack>
        <Button
          onClick={() => navigate('/register')}
          bg="blue.600"
          borderRadius="xl"
          fontSize="md"
          py="5"
          px="8"
        >
          Mulai Sekarang
        </Button>
      </HStack>
    </HStack>
  );
};

export default Navbar_Landing_page;
