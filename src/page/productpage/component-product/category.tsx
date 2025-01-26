import { Checkbox } from "@/components/ui/checkbox";
import {
  Box,
  Button,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Text,
} from "@chakra-ui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const categories = [
  "Audio, Kamera & Elektronik",
  "Buku",
  "Dapur",
  "Fashion Anak & Bayi",
  "Fashion Muslim",
  "Fashion Pria",
  "Fashion Wanita",
];

export default function Category() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) 
        : [...prev, category]
    );
  };


  const toggleAllCategories = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]); 
    } else {
      setSelectedCategories(categories); 
    }
  };

  return (
    <Box>
      <MenuRoot>
        <MenuTrigger asChild>
          <Button
            w="100%"
            variant="outline"
            backgroundColor="white"
            display="flex"
            justifyContent="space-between"
            fontWeight={'normal'}
          >
            {selectedCategories.length > 0
              ? `${selectedCategories.length} Kategori terpilih`
              : "Semua Kategori"}
                   {isMenuOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </MenuTrigger>
        <MenuContent maxH="200px" overflowY="auto" position={'absolute'} width={'full'}>
          <Box>
            <Checkbox
              checked={selectedCategories.length === categories.length}
              onChange={toggleAllCategories}
              cursor={'pointer'}
              colorPalette={'blue'}
            >
              Semua Kategori
           
            </Checkbox>
          </Box>
          {categories.map((category) => (
            <Box key={category}>
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                cursor={'pointer'}
                colorPalette={'blue'}
              >
                {category}
              </Checkbox>
            </Box>
          ))}
        </MenuContent>
      </MenuRoot>
    </Box>
  );
}
