import { useState, useEffect } from "react";
import { Box, Button, MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { Field } from "@/components/ui/field";
import { fetchProvinces } from "@/features/auth/services/data-territory";
import Cookies from "js-cookie";
import { CitySelector } from "./cities-selector";

interface LocationSelectorProps {
  setSelectedProvince: (province: { id: string; name: string } | null) => void;
  setSelectedCity: (city: { id: string; name: string } | null) => void;
  selectedProvince: { id: string; name: string } | null;
  selectedCity: { id: string; name: string } | null;
  selectedDistrict: { id: string; name: string } | null;
  setSelectedDistrict: (district: { id: string; name: string } | null) => void;
  selectedVillage: { id: string; name: string; postal_code:string; } | null;
  setSelectedVillage: (village: { id: string; name: string; postal_code:string } | null) => void;
}

export function LocationSelector({ setSelectedProvince, setSelectedCity, selectedProvince, selectedCity, selectedDistrict, setSelectedDistrict, selectedVillage, setSelectedVillage }: LocationSelectorProps) {
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);


  useEffect(() => {
    const fetchProvince = async () => {
      setLoadingProvinces(true);
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found");
        setLoadingProvinces(false);
        return;
      }

      try {
        const response = await fetchProvinces(token);
        if (response?.data) {
          setProvinces(
            response.data.map((prov: { name: string; code: string }) => ({
              id: prov.code, 
              name: prov.name,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      } finally {
        setLoadingProvinces(false);
      }
    };

    fetchProvince();
  }, []);

  return (
    <Box position={"relative"}>
      <MenuRoot>
        <MenuTrigger asChild>
          <Field label="Provinsi" required>
            <Button variant="outline" width="100%" display="flex" justifyContent="space-between">
              <span className="font-normal">
                {loadingProvinces ? "Loading..." : selectedProvince?.name || "Pilih Provinsi"}
              </span>
              <ChevronDown />
            </Button>
          </Field>
        </MenuTrigger>
        <MenuContent position="absolute" width="full" maxHeight="200px" overflowY="auto" bg="white">
          {provinces.length > 0 ? (
            provinces.map((province) => (
              <MenuItem
              bg={'white'}
              cursor={'pointer'}
              value="item"
                key={province.id}
                onClick={() => {
                  console.log("Province Clicked:", province);
                  setSelectedProvince(province);
                  setSelectedCity(null);
                }}
              >
                <Box>
                {province.name}
                </Box>
               
              </MenuItem>
            ))
          ) : (
            <MenuItem value="item" disabled>{loadingProvinces ? "Memuat..." : "Tidak ada data tersedia"}</MenuItem>
          )}
        </MenuContent>
      </MenuRoot>

      <CitySelector 
        provinceId={selectedProvince?.id || null} 
        selectedCity={selectedCity} 
        setSelectedCity={setSelectedCity}  
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        selectedVillage={selectedVillage}
        setSelectedVillage={setSelectedVillage}
      />
    </Box>
  );
}
