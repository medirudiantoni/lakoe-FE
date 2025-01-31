import { Box, Button, Flex, Tabs, Text } from '@chakra-ui/react';
import { CirclePlus } from 'lucide-react';

import { Link } from 'react-router';

import { TabContentAll } from '../tab-product/tab-content-all';
import { TabContentActive } from '../tab-product/tab-content-active';
import { TabContentNonActive } from '../tab-product/tab-content-non-active';



export function Product() {
  return (
    <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'semibold'} fontSize={'24px'}>
          Daftar Product
        </Text>
        <Link to="/add-product">
          <Button
            backgroundColor={'#0086B4'}
            borderRadius={'50px'}
            color={'white'}
          >
            <CirclePlus />
            <span className="ms-2">Tambahkan Product</span>
          </Button>
        </Link>
      </Flex>
      <Tabs.Root defaultValue="semua" mt={5}>
        <Tabs.List>
          <Tabs.Trigger value="semua">Semua</Tabs.Trigger>
          <Tabs.Trigger value="aktif">Aktif</Tabs.Trigger>
          <Tabs.Trigger value="tidak aktif">Tidak Aktif</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="semua">
          <TabContentAll />
        </Tabs.Content>
        <Tabs.Content value="aktif">
          <TabContentActive />
        </Tabs.Content>
        <Tabs.Content value="tidak aktif">
          <TabContentNonActive />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};


