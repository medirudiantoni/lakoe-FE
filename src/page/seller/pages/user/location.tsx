import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Box, Button, Grid, GridItem, Text, Textarea } from '@chakra-ui/react';
import { NotebookPen, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/features/auth/store/auth-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

import LoadingButtonLottie from '@/components/icons/loading-button';
import {
  createLocationBuyer,
  deleteLocationBuyer,
  fetchLocationByIdBuyer,
  updateLocationBuyer,
} from '@/features/auth/services/location-buyer-service';
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import MapComponent from '@/page/settingpage/component-setting/locationApi';
import { LocationSelector } from '@/page/settingpage/data-territory/province';
import { Switch } from '@/components/ui/switch';
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

export function LocationSetting() {
  const [open, setOpen] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [isMainLocation, setIsMainLocation] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedCity, setSelectedCity] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedVillage, setSelectedVillage] = useState<{
    id: string;
    name: string;
    postal_code: string;
  } | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const [editLocationId, setEditLocationId] = useState<string | null>(null);
  const [editAddress, setEditAddress] = useState('');
  const [editName, setEditName] = useState('');
  const [editCityDistrict, setEditCityDistrict] = useState('');
  const [editPostalCode, setEditPostalCode] = useState('');
  const [editCoordinates, setEditCoordinates] = useState<
    [number, number] | null
  >(null);

  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const { buyer } = useAuthBuyerStore();
  const { user } = useAuthStore();
  const { store } = useSellerStore();
  const token = Cookies.get(`token-buyer-${store?.name}`);
  const storeId = user?.Stores?.id;
  const buyerId = buyer?.id;
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
      const firstLocation = data.locations[0];
      console.log('first 108', firstLocation);
      setCoordinates([
        parseFloat(firstLocation.latitude),
        parseFloat(firstLocation.longitude),
      ]);
      setIsMainLocation(firstLocation.isMainLocation); // Set isMainLocation dari data API
    }
  }, [data]);

  const addLocationMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error('Unauthorized');
      //   if (!storeId) throw new Error('Store ID not found');

      const formData = new FormData();
      formData.append(
        'cityDistrict',
        `${selectedProvince?.name || ''}, ${selectedCity?.name || ''}, ${selectedDistrict?.name || ''}`
      );
      formData.append('postalCode', `${selectedVillage?.postal_code}`);
      formData.append('address', address);
      formData.append('name', name);
      //   formData.append('storeId', storeId);
      formData.append('buyerId', buyer?.id!);
      if (coordinates) {
        formData.append('latitude', coordinates[0].toString());
        formData.append('longitude', coordinates[1].toString());
      }
      formData.append('type', 'destination');

      return createLocationBuyer(formData, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations-buyer'] });
      setOpen(false);
      toast.success('Lokasi berhasil ditambahkan!');
    },
    onError: (error) => {
      console.error('Error menambahkan lokasi:', error);
      toast.error('Gagal menambahkan lokasi!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (locationId: string) => {
      if (!token) throw new Error('Unauthorized');
      return toast.promise(deleteLocationBuyer(locationId, token), {
        loading: 'Menghapus lokasi...',
        success: 'Lokasi berhasil dihapus!',
        error: 'Gagal menghapus lokasi!',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations-buyer'] });
      setOpenDialogDelete(false);
    },
  });

  const handleDelete = (locationId: string) => {
    deleteMutation.mutate(locationId);
  };

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!token || !editLocationId)
        throw new Error('Unauthorized or Location ID missing');

      const formData = new FormData();
      formData.append('address', editAddress);
      formData.append('name', editName);
      const cityDistrict = `${selectedProvince?.name || ''}, ${selectedCity?.name || ''}, ${selectedDistrict?.name || ''}`;
      formData.append('cityDistrict', cityDistrict);
      formData.append('postalCode', selectedVillage?.postal_code || '');
      if (editCoordinates) {
        formData.append('latitude', editCoordinates[0].toString());
        formData.append('longitude', editCoordinates[1].toString());
      }

      console.log('Form Data:', {
        address: editAddress,
        name: editName,
        cityDistrict: editCityDistrict,
        postalCode: editPostalCode,
        latitude: editCoordinates?.[0],
        longitude: editCoordinates?.[1],
        isMainLocation,
      });

      return updateLocationBuyer(formData, editLocationId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations-buyer'] });
      setEditLocationId(null);
      setOpenDialogUpdate(false);
      toast.success('Lokasi berhasil diperbarui!');
    },
    onError: () => {
      toast.error('Gagal memperbarui lokasi!');
    },
  });

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
  
  

  const handleOpenEdit = (location: Location) => {
    setEditLocationId(location.id);
    setEditAddress(location.address);
    setEditName(location.name);
    const [province, city, district] = location.cityDistrict
      .split(',')
      .map((item) => item.trim());

    setSelectedProvince({ id: '', name: province });
    setSelectedCity({ id: '', name: city });
    setSelectedDistrict({ id: '', name: district });
    setIsMainLocation(location.isMainLocation);
    setSelectedVillage({ id: '', name: '', postal_code: location.postalCode });
    setEditCoordinates([
      parseFloat(location.latitude),
      parseFloat(location.longitude),
    ]);

    setOpenDialogUpdate(true);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={20}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={'full'}
        >
          <Text fontSize={'18px'} fontWeight={'semibold'}>
            Alamat
          </Text>
          <Button
            variant="outline"
            borderRadius="50px"
            onClick={() => setOpen(true)}
          >
            Tambahkan Lokasi
          </Button>
        </Box>

        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambahkan Lokasi</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addLocationMutation.mutate();
              }}
            >
              <DialogBody>
                <Field label="Alamat" required>
                  <Textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Masukan alamat"
                  />
                </Field>
                <Field label="Nama Lokasi" required my={3}>
                  <Textarea
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukan nama lokasi"
                  />
                </Field>
                <LocationSelector
                  selectedProvince={selectedProvince}
                  setSelectedProvince={setSelectedProvince}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  selectedDistrict={selectedDistrict}
                  setSelectedDistrict={setSelectedDistrict}
                  selectedVillage={selectedVillage}
                  setSelectedVillage={setSelectedVillage}
                />

                <MapComponent setCoordinates={setCoordinates} />
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogActionTrigger>
                <Button
                  colorPalette="blue"
                  disabled={addLocationMutation.isPending}
                  type="submit"
                >
                  {addLocationMutation.isPending ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </DialogFooter>
            </form>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      </Box>

      <Box width="full" mt={5} mb={8} maxH={'200px'} overflowY={'auto'}>
        {isLoading ? (
          <LoadingButtonLottie />
        ) : isError ? (
          <Text color="red.500">Tidak ada lokasi di akun anda</Text>
        ) : data?.locations && data.locations.length > 0 ? (
          data.locations.map((location: Location) => (
            <Grid
              key={location.id}
              templateColumns="1fr 1fr"
              borderBottom={'1px solid'}
              borderColor={'gray.200'}
              py={3}
            >
              <GridItem display="flex" alignItems={'flex-start'} gap={3}>
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
                    >
                      <Text textAlign={'center'}>Alamat Utama</Text>
                    </Box>
                  )}
              </GridItem>

              <GridItem>
                <Box display="flex" justifyContent="end" gap={2} mb={10} pr={3}>
                  <DialogRoot
                    lazyMount
                    open={openDialogDelete}
                    onOpenChange={(e) => setOpenDialogDelete(e.open)}
                  >
                    <DialogTrigger asChild cursor={'pointer'}>
                      <Trash color="#75757C" size={'16px'} />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Lokasi</DialogTitle>
                      </DialogHeader>
                      <DialogBody></DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button variant="outline">Batalkan</Button>
                        </DialogActionTrigger>
                        <Button
                          colorPalette="red"
                          onClick={() => handleDelete(location.id)}
                          disabled={deleteMutation.isPending}
                        >
                          Hapus
                        </Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>
                  <DialogRoot
                    lazyMount
                    open={openDialogUpdate}
                    onOpenChange={(e) => setOpenDialogUpdate(e.open)}
                  >
                    <DialogTrigger
                      asChild
                      cursor={'pointer'}
                      onClick={() => handleOpenEdit(location)}
                    >
                      <NotebookPen color="#75757C" size={'16px'} />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Lokasi</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateMutation.mutate();
                        }}
                      >
                        <DialogBody>
                          <Field label="Alamat" required>
                            <Textarea
                              value={editAddress}
                              onChange={(e) => setEditAddress(e.target.value)}
                            />
                          </Field>
                          <Field label="Nama Lokasi" required my={4}>
                            <Textarea
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                            />
                          </Field>
                          <LocationSelector
                            selectedProvince={selectedProvince}
                            setSelectedProvince={setSelectedProvince}
                            selectedCity={selectedCity}
                            setSelectedCity={setSelectedCity}
                            selectedDistrict={selectedDistrict}
                            setSelectedDistrict={setSelectedDistrict}
                            selectedVillage={selectedVillage}
                            setSelectedVillage={setSelectedVillage}
                          />
                          <MapComponent setCoordinates={setEditCoordinates} />
                        </DialogBody>
                        <DialogFooter>
                          <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogActionTrigger>
                          <Button
                            colorPalette="blue"
                            disabled={updateMutation.isPending}
                            type="submit"
                          >
                            {updateMutation.isPending
                              ? 'Menyimpan...'
                              : 'Simpan'}
                          </Button>
                        </DialogFooter>
                      </form>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>
                  <Switch
                    colorScheme="blue"
                    checked={location.isMainLocation}
                    onChange={() => handleToggleMainLocation(location.id)}
                  />


                </Box>
                <Box display="flex" justifyContent="end" gap={2} pr={3}>
      
                </Box>
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
