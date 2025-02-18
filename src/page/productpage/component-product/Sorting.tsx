import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";

interface Props {
  onChangeSortValue: (data: string) => void;
}

const SortingDropdown: React.FC<Props> = ({ onChangeSortValue }) => {
  const [selectedItem, setSelectedItem] = useState("Urutkan");

  const handleSelect = (value: string) => {
    setSelectedItem(value);
    onChangeSortValue(value);
  };

  const menuItems = [
    { value: "terakhir-diubah", label: "Terakhir Diubah" },
    { value: "terlaris", label: "Terlaris" },
    { value: "kurang-diminati", label: "Kurang Diminati" },
    { value: "harga-tertinggi", label: "Harga Tertinggi" },
    { value: "harga-terendah", label: "Harga Terendah" },
    { value: "stok-terbanyak", label: "Stok Terbanyak" },
    { value: "stok-tersedikit", label: "Stok Tersedikit" },
  ];

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex justify-between items-center"
        >
          <span className="font-normal">{selectedItem}</span>
          <ChevronDown/>
        </Button>
      </MenuTrigger>
      <MenuContent className="w-full" position={'absolute'}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            onClick={() => handleSelect(item.value)}
            className={`flex items-center justify-between ${
              selectedItem === item.label ? "bg-blue-100 text-blue-600" : ""
            }`}
          >
            {item.label}
            {selectedItem === item.label && (
              <span className="ml-2 text-blue-600 font-bold">•</span>
            )}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default SortingDropdown;
