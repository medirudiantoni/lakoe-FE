import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { CopyrightIcon, Mail, Map} from 'lucide-react';
import SellerLogo from './logo';
import { useEffect } from 'react';
import { useSellerStore } from '@/hooks/store';

export default function SellerFooter() {
  const { store } = useSellerStore()

  useEffect(() => {
    const address = store?.location?.[0]?.address;
    console.log('Alamat:', address ?? 'Alamat tidak ditemukan');
  }, [store?.location]);
  
  return (
    <footer className="w-full bg-[#F4F4FB] font-poppins px- lg:px-40">
      <Box maxW="7xl" mx="auto" py="10">
        <Flex
          justifyContent="space-between"
          pb="4"
          borderBottomWidth={2}
          borderBottomColor="gray.400"
        >
          <Box w="fit">
            <Box mb="10">
              <SellerLogo brandName={store!.name} fontSize="2xl" />
            </Box>
            <Box mb="4"  color={'gray.700'}>
              <Heading fontWeight="semibold" display={'flex'} alignItems={'center'} gap={2} mb={'2'}>Kontak <span><Mail/></span></Heading>
              <Text>{store?.userIdRel?.phone}</Text>
              <Text>{store?.userIdRel?.email}</Text>
            </Box>
          </Box>
          <Box w="fit" alignSelf={'end'}>
            <Box mb="4"  color={'gray.700'}>
              <Heading fontWeight="semibold" display={'flex'} alignItems={'center'} gap={2} mb={'2'}>Alamat <span><Map/></span></Heading>
              {/* <Text>{store?.location}</Text> */}
              <Text maxW={'64'}>{store?.location?.[0]?.address}</Text>
            </Box>
          </Box>

        </Flex>
        <HStack justifyContent="center" gap={0.5} my="2" >
          <CopyrightIcon size="16px" />
          <Text color={'gray.700'}>2025 nama toko powered by Lakoe</Text>
        </HStack>
      </Box>
    </footer>
  );
}
