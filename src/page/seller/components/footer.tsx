import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { CopyrightIcon, Mail, MessageSquare } from 'lucide-react';
import SellerLogo from './logo';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useEffect } from 'react';
import { useSellerStore } from '@/hooks/store';

export default function SellerFooter() {
  const { store } = useSellerStore()

  return (
    <footer className="w-full bg-[#F4F4FB] font-poppins px-5 lg:px-10">
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
        </Flex>
        <HStack justifyContent="center" gap={0.5} my="2" >
          <CopyrightIcon size="16px" />
          <Text color={'gray.700'}>2025 nama toko powered by Lakoe</Text>
        </HStack>
      </Box>
    </footer>
  );
}
