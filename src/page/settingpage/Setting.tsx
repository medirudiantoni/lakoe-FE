import { Box, Flex, Tabs, Text } from '@chakra-ui/react';
import { InformationSetting } from './component-setting/information-setting';
import { LocationSetting } from './component-setting/location-setting';
import { TemplateSetting } from './component-setting/template-setting';
import { useEffect, useState } from 'react';
import { fetchStore } from '@/features/auth/services/store-service';
import toast from 'react-hot-toast';
import { StoreFormProps } from '@/features/auth/types/store-types';
import { useAuthStore } from '@/features/auth/store/auth-store';



export function Setting() {
    const [storeData, setStoreData] = useState<StoreFormProps>();
    const { user } = useAuthStore();
    const storeId = user?.Stores.id;
  useEffect(() => {
    if (storeId) {
      fetchStore(storeId)
        .then((data) => {
          setStoreData(data);
        })
        .catch(() => {
          toast.error('Gagal mengambil data toko.');
        })
    }
  }, [storeId]);
  return (
    <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'semibold'} fontSize={'24px'}>
          {storeData?.name}
        </Text>
      </Flex>
      <Tabs.Root defaultValue="informasi" mt={5}>
        <Tabs.List>
          <Tabs.Trigger value="informasi">Informasi</Tabs.Trigger>
          <Tabs.Trigger value="lokasi">Lokasi</Tabs.Trigger>
          <Tabs.Trigger value="template">Template Pesan</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="informasi">
          <InformationSetting />
        </Tabs.Content>
        <Tabs.Content value="lokasi">
            <LocationSetting/>
        </Tabs.Content>
        <Tabs.Content value="template">
            <TemplateSetting/>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
