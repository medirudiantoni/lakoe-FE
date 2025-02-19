import { Field } from '@/components/ui/field';
import { fetchVillages } from '@/features/auth/services/data-territory';
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

interface VillagesSelectorProps {
  districtId: string | null;
  selectedVillage: { id: string; name: string; postal_code: string } | null;
  setSelectedVillage: (
    village: { id: string; name: string; postal_code: string } | null
  ) => void;
}

export function VillageSelector({
  districtId,
  selectedVillage,
  setSelectedVillage,
}: VillagesSelectorProps) {
  const [village, setvillage] = useState<
    { id: string; name: string; postal_code: string }[]
  >([]);
  const [loadingVillage, setLoadingVillage] = useState(false);
  // const [selectedVillage, setSelectedVillage] = useState<{ id: string; name: string , postal_code:string} | null>(null);

  useEffect(() => {
    if (!districtId) return;

    const fetchDistrictData = async () => {
      setLoadingVillage(true);
      const token = Cookies.get('token');
      if (!token) {
        console.error('No token found');
        setLoadingVillage(false);
        return;
      }

      try {
        const response = await fetchVillages(districtId, token);
        if (response?.data) {
          setvillage(
            response.data.map(
              (village: {
                name: string;
                code: string;
                postal_code: string;
              }) => ({
                id: village.code,
                name: village.name,
                postal_code: village.postal_code,
              })
            )
          );
        }
      } catch (error) {
        console.error('Failed to fetch district:', error);
      } finally {
        setLoadingVillage(false);
      }
    };

    fetchDistrictData();
  }, [districtId]);

  return (
    <Box>
      <MenuRoot>
        <MenuTrigger asChild mt={5}>
          <Field label="Kode Pos" required>
            <Button
              variant="outline"
              width="100%"
              display="flex"
              justifyContent="space-between"
              disabled={!districtId}
            >
              <span className="font-normal">
                {loadingVillage
                  ? 'Loading...'
                  : selectedVillage?.postal_code || 'Pilih Kode Pos'}
              </span>
              <ChevronDown />
            </Button>
          </Field>
        </MenuTrigger>
        {districtId && (
          <MenuContent
            position="absolute"
            width="full"
            maxHeight="200px"
            overflowY="auto"
            bg="white"
          >
            {village.length > 0 ? (
              village.map((village) => (
                <MenuItem
                  value="item"
                  key={village.id}
                  onClick={() => setSelectedVillage(village)}
                >
                  {village.postal_code}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="item" disabled>
                {loadingVillage ? 'Memuat...' : 'Tidak ada data tersedia'}
              </MenuItem>
            )}
          </MenuContent>
        )}
      </MenuRoot>
    </Box>
  );
}
