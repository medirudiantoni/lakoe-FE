import { fetchStore } from '@/features/auth/services/store-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { StoreFormProps } from '@/features/auth/types/store-types';
import { Box, Flex, Grid, GridItem, Skeleton, Stack, Tabs, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { InformationSetting } from './component-setting/information-setting';
import { LocationSetting } from './component-setting/location-setting';
import { TemplateSetting } from './component-setting/template-setting';

export function Setting() {
  const [storeData, setStoreData] = useState<StoreFormProps>();
  const [isFetching, setIsFetching] = useState(true); // Status fetching
  const { user } = useAuthStore();
  const storeId = user?.Stores.id;

  useEffect(() => {
    const token = Cookies.get('token');
    if (storeId && token) {
      fetchStore(storeId, token!)
        .then((data) => {
          setStoreData(data);
        })
        .catch(() => {
          toast.error('Gagal mengambil data toko.');
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [storeId]);

  if (isFetching) {
    return (
      <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Skeleton height="24px" width="200px" />
        </Flex>
        <Tabs.Root defaultValue="informasi" mt={5}>
          <Tabs.List display={'flex'} gap={4}>
            <Skeleton height="30px" width="100px" />
            <Skeleton height="30px" width="100px" />
            <Skeleton height="30px" width="100px" />
          </Tabs.List>
        </Tabs.Root>
        <Grid templateColumns={'repeat(2, 1fr)'} gap={3} py={'5'}>
          <GridItem>
            <Box>
              <Stack gap="4" align="flex-start" width={'full'}>
                <Skeleton height="25px" width={'full'} />
                <Skeleton height="25px" width={'full'} />
              </Stack>
            </Box>
          </GridItem>
          <GridItem>
            <Skeleton height="66px" width={'full'} />
          </GridItem>
        </Grid>
        <Grid templateColumns={'1fr 4fr'}>
          <GridItem>
            <Skeleton height="25px" width={'120px'} />
            <Box display={'flex'} width={'full'} gap={3} mt={3}>
              <Skeleton height="185px" width={'90%'} />
            </Box>
          </GridItem>
          <GridItem>
            <GridItem>
              <Skeleton height="25px" width={'140px'} />
              <Box display={'flex'} width={'full'} gap={3} mt={3}>
                <Skeleton height="185px" width={'full'} />
              </Box>
            </GridItem>
          </GridItem>
        </Grid>
      </Box>
    );
  }
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
          <LocationSetting />
        </Tabs.Content>
        <Tabs.Content value="template">
          <TemplateSetting />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
