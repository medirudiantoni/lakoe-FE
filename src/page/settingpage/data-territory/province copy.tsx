// import { useState, useEffect } from "react";
// import { Box, Button, MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@chakra-ui/react";
// import { ChevronDown } from "lucide-react";
// import { Field } from "@/components/ui/field";
// import { fetchProvinces } from "@/features/auth/services/data-territory";
// import Cookies from "js-cookie";
// import { CitySelector } from "./cities-selector";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createLocation } from "@/features/auth/services/location-service";
// import { useAuthStore } from "@/features/auth/store/auth-store";

// interface LocationSelectorProps {
//   setSelectedProvince: (province: { id: string; name: string } | null) => void;
//   setSelectedCity: (city: { id: string; name: string } | null) => void;
//   selectedProvince: { id: string; name: string } | null;
//   selectedCity: { id: string; name: string } | null;
//   selectedDistrict: { id: string; name: string } | null;
//   setSelectedDistrict: (district: { id: string; name: string } | null) => void;
// }

// export function LocationSelector({ setSelectedProvince, setSelectedCity, selectedProvince, selectedCity, selectedDistrict, setSelectedDistrict }: LocationSelectorProps) {
//   const [provinces, setProvinces] = useState<{ id: string; name: string }[]>([]);
//   const [loadingProvinces, setLoadingProvinces] = useState(false);
//   const [address, setAddress] = useState('');
//   const [open, setOpen] = useState(false);


//   useEffect(() => {
//     const fetchProvince = async () => {
//       setLoadingProvinces(true);
//       const token = Cookies.get("token");
//       if (!token) {
//         console.error("No token found");
//         setLoadingProvinces(false);
//         return;
//       }

//       try {
//         const response = await fetchProvinces(token);
//         if (response?.data) {
//           setProvinces(
//             response.data.map((prov: { name: string; code: string }) => ({
//               id: prov.code, 
//               name: prov.name,
//             }))
//           );
//         }
//       } catch (error) {
//         console.error("Failed to fetch provinces:", error);
//       } finally {
//         setLoadingProvinces(false);
//       }
//     };

//     fetchProvince();
//   }, []);

//   return (
//     <Box>
//       <MenuRoot>
//         <MenuTrigger asChild>
//           <Field label="Provinsi" required>
//             <Button variant="outline" width="100%" display="flex" justifyContent="space-between">
//               <span className="font-normal">
//                 {loadingProvinces ? "Loading..." : selectedProvince?.name || "Pilih Provinsi"}
//               </span>
//               <ChevronDown />
//             </Button>
//           </Field>
//         </MenuTrigger>
//         <MenuContent position="absolute" width="full" maxHeight="200px" overflowY="auto" bg="white">
//           {provinces.length > 0 ? (
//             provinces.map((province) => (
//               <MenuItem
//               value="item"
//                 key={province.id}
//                 onClick={() => {
//                   console.log("Province Clicked:", province);
//                   setSelectedProvince(province);
//                   setSelectedCity(null);
//                 }}
//               >
//                 {province.name}
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem value="item" disabled>{loadingProvinces ? "Memuat..." : "Tidak ada data tersedia"}</MenuItem>
//           )}
//         </MenuContent>
//       </MenuRoot>

//       <CitySelector 
//         provinceId={selectedProvince?.id || null} 
//         selectedCity={selectedCity} 
//         setSelectedCity={setSelectedCity}  
//         selectedDistrict={selectedDistrict} 
//         setSelectedDistrict={setSelectedDistrict} 
//       />
//     </Box>
//   );
// }
