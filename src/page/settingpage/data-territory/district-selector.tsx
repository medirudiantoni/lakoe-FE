import { useState, useEffect } from "react";
import { Box, Button, MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { Field } from "@/components/ui/field";
import { fetchDistrict } from "@/features/auth/services/data-territory";
import Cookies from "js-cookie";
import { VillageSelector } from "./village-selector";

interface DistrictSelectorProps {
  citiesId: string | null;
  selectedDistrict: { id: string; name: string } | null;
  setSelectedDistrict: (district: { id: string; name: string } | null) => void;
  selectedVillage: { id: string; name: string; postal_code:string; } | null;
  setSelectedVillage: (village: { id: string; name: string; postal_code:string } | null) => void;
}

export function DistrictSelector({ citiesId, selectedDistrict, setSelectedDistrict, selectedVillage, setSelectedVillage  }: DistrictSelectorProps) {
  const [district, setDistrict] = useState<{ id: string; name: string }[]>([]);
  const [loadingdistrict, setLoadingdistrict] = useState(false);


  useEffect(() => {
    if (!citiesId) return; 

    const fetchDistrictData = async () => {
      setLoadingdistrict(true);
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found");
        setLoadingdistrict(false);
        return;
      }

      try {
        const response = await fetchDistrict(citiesId, token);
        if (response?.data) {
          setDistrict(
            response.data.map((district: { name: string; code: string }) => ({
              id: district.code,
              name: district.name,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch district:", error);
      } finally {
        setLoadingdistrict(false);
      }
    };

    fetchDistrictData();
  }, [citiesId]);

  return (
    <Box>
      <MenuRoot >
      <MenuTrigger asChild mt={5}>
        <Field label="Kecamatan" required>
          <Button
            variant="outline"
            width="100%"
            display="flex"
            justifyContent="space-between"
            disabled={!citiesId} 
          >
            <span className="font-normal">
              {loadingdistrict ? "Loading..." : selectedDistrict?.name || "Pilih Kecamatan"}
            </span>
            <ChevronDown />
          </Button>
        </Field>
      </MenuTrigger>
      {citiesId && (
        <MenuContent position="absolute" width="full" maxHeight="200px" overflowY="auto" bg="white">
          {district.length > 0 ? (
            district.map((district) => (
              <MenuItem value="item" key={district.id} onClick={() => setSelectedDistrict(district)}>
                {district.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="item" disabled>{loadingdistrict ? "Memuat..." : "Tidak ada data tersedia"}</MenuItem>
          )}
        </MenuContent>
      )}
    </MenuRoot>
    <VillageSelector districtId={selectedDistrict?.id || null}
      selectedVillage={selectedVillage}
      setSelectedVillage={setSelectedVillage}
    />
    </Box>

  );
}
