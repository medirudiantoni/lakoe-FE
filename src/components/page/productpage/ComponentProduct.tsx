import { Box, Button, Flex, Tabs, Text } from '@chakra-ui/react';
import { CirclePlus } from 'lucide-react';

import TabContentAll from './component-product/TabContentAll';
import TabContentActive from './component-product/TabContentActive';
import TabContentNonActive from './component-product/TabContentNonActive';
import { Link } from 'react-router';

const ComponentProduct = () => {
  return (
    <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'semibold'}>Daftar Product</Text>
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

export default ComponentProduct;
