import React, { useState, useEffect } from "react";
import {
  MenuRoot,
  MenuItem,
  MenuContent,
  Box,
  Text,
  Button,
  MenuTrigger,
  VStack,
  HStack,
  Circle,
} from "@chakra-ui/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCategoryStore } from "@/features/auth/store/category-store";


type Category = {
  id: string;
  name: string;
  children?: Category[];
};

const CategoryDropdown: React.FC = () => {
  const { categories, fetchCategories, selectedCategoryId, setSelectedCategoryId } = useCategoryStore();
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSelectCategory = (id: string, name: string) => {
    setSelectedCategoryId(id);
    if (!openCategories.includes(id)) {
      setOpenCategories((prev) => [...prev, id, name]);
    }
  };

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const findCategoryPath = (categories: Category[], id: string, path: string[] = []): string | null => {
    for (const category of categories) {
      if (category.id === id) {
        return [...path, category.name].join(" > "); 
      }
      if (category.children) {
        const foundPath = findCategoryPath(category.children, id, [...path, category.name]);
        if (foundPath) return foundPath;
      }
    }
    return null;
  };

  const renderMenu = (items: Category[], path: string = "") => {
    if (!Array.isArray(items)) {
      console.error("Expected an array but got:", items);
      return null;
    }

  

    return (
      <VStack align="start" w="full">
        {items.map((item) => {
          const currentPath = path ? `${path} > ${item.name}` : item.name;
          const isOpen = openCategories.includes(item.id);
          const isClickable = !item.children;
          const isSelected = selectedCategoryId === item.id;

          return (
            <Box key={item.id} w="full">
              {isClickable ? (
                <MenuItem
                value="item"
                  cursor="pointer"
                  bg={"white"}
                  onClick={() => handleSelectCategory(item.id, item.name)}
                  _hover={{ bg: "gray.200" }}
                >
                  <HStack justify="space-between" w="full">
                    <Text ml={'1'} fontSize="md">{item.name}</Text>
                    {isSelected && <Circle size={2} bg="blue.500" mr={7} />}
                  </HStack>
                </MenuItem>
              ) : (
                <HStack
                  px={3}
                  py={2}
                  w="full"
                  justify="space-between"
                  cursor="pointer"
                  onClick={() => toggleCategory(item.id)}
                  _hover={{ bg: "gray.100" }}
                >
                  <HStack justify="space-between" w="full">
                    <Text fontSize="md">{item.name}</Text>
                    {isSelected && <Circle size={2} bg="blue.500" mr={0} />}
                  </HStack>
                  {item.children && (
                    <ChevronRight
                      size={16}
                      style={{ visibility: openCategories.includes(item.id) ? "hidden" : "visible" }}
                    />
                  )}
                </HStack>
              )}
              {isOpen && item.children && (
                <Box pl={4} pt={2} borderLeft="2px solid #ddd">
                  {renderMenu(item.children, currentPath)}
                </Box>
              )}
            </Box>
          );
        })}
      </VStack>
    );
  };

  return (
    <Box w="full">
      <MenuRoot>
        <MenuTrigger asChild>
          <Button
            variant="outline"
            w="full"
            display="flex"
            justifyContent="space-between"
            px={3}
            py={4}
            borderRadius="md"
          >
              <Text color="gray.600" fontWeight={'normal'}>
    {selectedCategoryId
      ? findCategoryPath(categories, selectedCategoryId) || "Pilih kategori"
      : "Pilih kategori"}
  </Text>
            <ChevronDown size={18} />
          </Button>
        </MenuTrigger>

        <MenuContent shadow="lg" borderRadius="md" p={2} minW="250px">
          {renderMenu(categories)}
        </MenuContent>
      </MenuRoot>
    </Box>
  );
};

export default CategoryDropdown;
