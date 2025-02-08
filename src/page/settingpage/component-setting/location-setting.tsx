import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import {
  Box,
  Button,
  createListCollection,
  Grid,
  GridItem,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { MapPin, NotebookPen, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DialogDelete } from '../dialog/dialog-delete';
import { DialogEdit } from '../dialog/dialog-edit';

import {
  createLocation,
  fetchLocationById,
  deleteLocation,
  updateLocation,
} from '@/features/auth/services/location-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { LocationSelector } from '../data-territory/province';
import MapComponent from './locationApi';
import { Link } from 'react-router';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';

interface Location {
  id: string;
  name: string;
  address: string;
  cityDistrict: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  type: string;
}

export function LocationSetting() {
  const [open, setOpen] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
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

  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const token = Cookies.get('token');
  const storeId = user?.Stores?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['locations', storeId],
    queryFn: () => fetchLocationById(storeId!, token!),
    enabled: !!storeId && !!token,
  });

  useEffect(() => {
    console.log('Location ID Updated:', storeId);
  }, [storeId]);

  useEffect(() => {
    if (data?.locations?.length > 0) {
      const firstLocation = data.locations[0];
      setCoordinates([
        parseFloat(firstLocation.latitude),
        parseFloat(firstLocation.longitude),
      ]);
    }
  }, [data]);

  const addLocationMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error('Unauthorized');
      if (!storeId) throw new Error('Store ID not found');

      const formData = new FormData();
      formData.append(
        'cityDistrict',
        `${selectedProvince?.name || ''}, ${selectedCity?.name || ''}, ${selectedDistrict?.name || ''}`
      );
      formData.append('postalCode', `${selectedVillage?.postal_code}`);
      formData.append('address', address);
      formData.append('name', name);
      formData.append('storeId', storeId);
      formData.append('userId', user?.id!);
      if (coordinates) {
        formData.append('latitude', coordinates[0].toString());
        formData.append('longitude', coordinates[1].toString());
      }
      formData.append('type', type);

      return createLocation(formData, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      setOpen(false);
      toast.success('Lokasi berhasil ditambahkan!');
    },
    onError: () => {
      toast.error('Gagal menambahkan lokasi!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (locationId: string) => {
      if (!token) throw new Error('Unauthorized');
      return toast.promise(deleteLocation(locationId, token), {
        loading: 'Menghapus lokasi...',
        success: 'Lokasi berhasil dihapus!',
        error: 'Gagal menghapus lokasi!',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
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
      });

      return updateLocation(formData, editLocationId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      setEditLocationId(null);
      setOpenDialogUpdate(false);
      toast.success('Lokasi berhasil diperbarui!');
    },
    onError: () => {
      toast.error('Gagal memperbarui lokasi!');
    },
  });

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

    setSelectedVillage({ id: '', name: '', postal_code: location.postalCode });
    setEditCoordinates([
      parseFloat(location.latitude),
      parseFloat(location.longitude),
    ]);

    setOpenDialogUpdate(true);
  };

  const locationTypes = createListCollection({
    items: [
      { value: 'origin', label: 'Origin' },
      { value: 'destination', label: 'Destination' },
    ],
  });

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={5}
      >
        <Button
          variant="outline"
          borderRadius="50px"
          onClick={() => setOpen(true)}
        >
          Tambahkan Lokasi
        </Button>
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

                <Field label="Tipe Lokasi" required my={3}>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      fontSize: '16px',
                    }}
                  >
                    <option value="">Pilih Tipe</option>
                    <option value="origin">Origin</option>
                    <option value="destination">Destination</option>
                  </select>
                </Field>

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

      <Box
        width="full"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="10px"
        mt={3}
        p={3}
      >
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <Text color="red.500">Tidak ada lokasi di store anda</Text>
        ) : data?.locations && data.locations.length > 0 ? (
          data.locations.map((location: Location) => (
            <Grid
              key={location.id}
              templateColumns="1fr 2fr 1fr"
              p={5}
              border="1px solid "
              borderRadius={'10px'}
              borderColor={'gray.200'}
              mb={2}
            >
              <GridItem display="flex" flexDirection="column" gap={3}>
                <Text>Nama Lokasi</Text>
                <Text>Alamat</Text>
                <Text>Kota/Kecamatan</Text>
                <Text>Kode Pos</Text>
                <Text>Pinpoint</Text>
              </GridItem>
              <GridItem display="flex" flexDirection="column" gap={3}>
                <Text>{location.name}</Text>
                <Text>{location.address}</Text>
                <Text>{location.cityDistrict}</Text>
                <Text>{location.postalCode}</Text>
                <Box display="flex" color="blue.400" alignItems={'center'}>
                  <Link
                    to={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                    target="_blank"
                    className="flex items-center gap-1"
                  >
                    <MapPin size={'20px'} />
                    <Text
                      color="blue.400"
                      // _hover={{ textDecoration: 'underline' }}
                    >
                      Lihat di peta
                    </Text>
                  </Link>
                </Box>
              </GridItem>
              <GridItem>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Box>
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
                  </Box>
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
