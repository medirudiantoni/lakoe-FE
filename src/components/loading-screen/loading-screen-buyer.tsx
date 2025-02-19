import { useSellerStore } from '@/hooks/store';
import { Image, Stack } from '@chakra-ui/react';
import LoadingLottieBuyer from '../icons/loading-buyer';

export function LoadingScreenBuyer() {
  const { store } = useSellerStore();

  return (
    <Stack
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      h={'100vh'}
    >
      {store && <Image src={store.logoAttachment} width={140} mb={20} />}
      <LoadingLottieBuyer />
    </Stack>
  );
}
