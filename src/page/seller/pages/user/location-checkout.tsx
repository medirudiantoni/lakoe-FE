import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

import LoadingButtonLottie from '@/components/icons/loading-button';
import { Switch } from '@/components/ui/switch';
import {
  fetchLocationByIdBuyer,
  updateLocationBuyer,
} from '@/features/auth/services/location-buyer-service';
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import { useSellerStore } from '@/hooks/store';

interface Location {
  id: string;
  name: string;
  address: string;
  cityDistrict: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  type: string;
  isMainLocation: boolean;
}

interface LocationSettingCheckoutProps {
  onLocationSelect?: (location: {
    postalCode: string;
    latitude: string;
    longitude: string;
  }) => void;
}

export function LocationSettingCheckout({
  onLocationSelect,
}: LocationSettingCheckoutProps) {

  const queryClient = useQueryClient();
  const { buyer } = useAuthBuyerStore();
  const { store } = useSellerStore();
  const buyerId = buyer?.id;
  const token = Cookies.get(`token-buyer-${store?.name}`);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['locations-buyer', buyerId],
    queryFn: () => fetchLocationByIdBuyer(buyerId!, token!),
    enabled: !!buyerId && !!token,
  });

  useEffect(() => {
    console.log('Location ID Updated:', buyerId);
  }, [buyerId]);

  useEffect(() => {
    console.log('Buyer ID:', buyer);
  }, [buyer]);

  useEffect(() => {
    if (data?.locations?.length > 0) {
      const mainLocation = data.locations.find(
        (loc: any) => loc.isMainLocation
      );
      if (mainLocation) {
        const locationData = {
          postalCode: mainLocation.postalCode,
          latitude: mainLocation.latitude,
          longitude: mainLocation.longitude,
        };
        // setCoordinates([
        //   parseFloat(mainLocation.latitude),
        //   parseFloat(mainLocation.longitude),
        // ]);
        onLocationSelect && onLocationSelect(locationData);
      }
    }
  }, [data, onLocationSelect]);

  const removeMainLocationMutation = useMutation({
    mutationFn: async (locationId: string) => {
      if (!token) throw new Error('Unauthorized');

      const formData = new FormData();
      formData.append('isMainLocation', 'false');

      return updateLocationBuyer(formData, locationId, token);
    },
  });

  const setMainLocationMutation = useMutation({
    mutationFn: async (locationId: string) => {
      if (!token) throw new Error('Unauthorized');

      const formData = new FormData();
      formData.append('isMainLocation', 'true');

      return updateLocationBuyer(formData, locationId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations-buyer'] });
    },
  });

  const handleToggleMainLocation = async (locationId: string) => {
    const previousMainLocation = data.locations.find(
      (location: Location) => location.isMainLocation
    );

    await toast.promise(
      (async () => {
        if (previousMainLocation) {
          await removeMainLocationMutation.mutateAsync(previousMainLocation.id);
        }

        await setMainLocationMutation.mutateAsync(locationId);
      })(),
      {
        loading: 'Mengubah alamat utama...',
        success: 'Alamat utama berhasil diperbarui!',
        error: 'Gagal mengubah alamat utama!',
      }
    );
  };

  return (
    <Box>
      <Box width="full" mb={8} maxH={'200px'} overflowY={'auto'}>
        {isLoading ? (
          <LoadingButtonLottie />
        ) : isError ? (
          <Text color="red.500">Tidak ada lokasi di akun anda</Text>
        ) : data?.locations && data.locations.length > 0 ? (
          data.locations
            .filter((location: Location) => location.isMainLocation)
            .map((location: Location) => (
              <Grid key={location.id} templateColumns="3fr 1fr" py={3}>
                <GridItem display="flex" flexDirection="column" gap={3}>
                  <Box display={'flex'} alignItems={'flex-start'}>
                    <Box>
                      <Text>{buyer?.name}</Text>
                      <Text>
                        {location.address}, {location.cityDistrict},{' '}
                        {location.postalCode}, {buyer?.phone}
                      </Text>
                    </Box>
                  </Box>
                  {location.isMainLocation && (
                    <Box
                      bg={'#3E5879'}
                      color={'white'}
                      py={'2'}
                      px={'5'}
                      fontSize={'12px'}
                      width={'180px'}
                      borderRadius={'7px'}
                    >
                      <Text textAlign={'center'}>Alamat Utama</Text>
                    </Box>
                  )}
                </GridItem>
                <GridItem display={'flex'} justifyContent={'end'}>
                  <DialogRoot>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Ganti Lokasi
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ganti lokasi utama</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        {data.locations.map((location: Location) => (
                          <Grid
                            key={location.id}
                            templateColumns="1fr 1fr"
                            borderBottom={'1px solid'}
                            borderColor={'gray.200'}
                            py={3}
                          >
                            <GridItem gap={3}>
                              <Box>
                                <Text>{location.address}</Text>
                                <Text>
                                  {location.cityDistrict},{location.postalCode}
                                </Text>
                              </Box>

                              {location.isMainLocation && (
                                <Box
                                  bg={'#3E5879'}
                                  color={'white'}
                                  py={'2'}
                                  px={'5'}
                                  fontSize={'12px'}
                                  width={'180px'}
                                  borderRadius={'7px'}
                                  mt={'2'}
                                >
                                  <Text textAlign={'center'}>Alamat Utama</Text>
                                </Box>
                              )}
                            </GridItem>
                            <GridItem display={'flex'} justifyContent={'end'}>
                              <Switch
                                checked={location.isMainLocation}
                                onChange={() =>
                                  handleToggleMainLocation(location.id)
                                }
                              />
                            </GridItem>
                          </Grid>
                        ))}
                      </DialogBody>

                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>
                </GridItem>
              </Grid>
            ))
        ) : (
          <Text color="gray.500">Belum ada lokasi yang ditambahkan</Text>
        )}
      </Box>
    </Box>
  );
}
