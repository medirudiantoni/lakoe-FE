import { Field } from '@/components/ui/field';
import { fetchCities } from '@/features/auth/services/data-territory';
import {
  Box,
  Button,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DistrictSelector } from './district-selector';

interface CitySelectorProps {
  provinceId: string | null;
  selectedCity: { id: string; name: string } | null;
  setSelectedCity: (city: { id: string; name: string } | null) => void;
  selectedDistrict: { id: string; name: string } | null;
  setSelectedDistrict: (district: { id: string; name: string } | null) => void;
  selectedVillage: { id: string; name: string; postal_code: string } | null;
  setSelectedVillage: (
    village: { id: string; name: string; postal_code: string } | null
  ) => void;
}

export function CitySelector({
  provinceId,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  selectedVillage,
  setSelectedVillage,
}: CitySelectorProps) {
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    if (!provinceId) return; // Jika provinsi belum dipilih, tidak perlu fetch data

    const fetchCityData = async () => {
      setLoadingCities(true);
      const token = Cookies.get('token');
      if (!token) {
        console.error('No token found');
        setLoadingCities(false);
        return;
      }

      try {
        const response = await fetchCities(provinceId, token);
        if (response?.data) {
          setCities(
            response.data.map((city: { name: string; code: string }) => ({
              id: city.code,
              name: city.name,
            }))
          );
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCityData();
  }, [provinceId]);

  return (
    <Box>
      <MenuRoot>
        <MenuTrigger asChild mt={5}>
          <Field label="Kota/Kabupaten" required>
            <Button
              variant="outline"
              width="100%"
              display="flex"
              justifyContent="space-between"
              disabled={!provinceId}
            >
              <span className="font-normal">
                {loadingCities
                  ? 'Loading...'
                  : selectedCity?.name || 'Pilih Kota/Kabupaten'}
              </span>
              <ChevronDown />
            </Button>
          </Field>
        </MenuTrigger>
        {provinceId && (
          <MenuContent
            position="absolute"
            width="full"
            maxHeight="200px"
            overflowY="auto"
            bg="white"
          >
            {cities.length > 0 ? (
              cities.map((city) => (
                <MenuItem
                  value="item"
                  key={city.id}
                  onClick={() => setSelectedCity(city)} // ✅ Gunakan setSelectedCity dari props
                >
                  {city.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="item" disabled>
                {loadingCities ? 'Memuat...' : 'Tidak ada data tersedia'}
              </MenuItem>
            )}
          </MenuContent>
        )}
      </MenuRoot>

      <DistrictSelector
        citiesId={selectedCity?.id || null}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        selectedVillage={selectedVillage}
        setSelectedVillage={setSelectedVillage}
      />
    </Box>
  );
}
