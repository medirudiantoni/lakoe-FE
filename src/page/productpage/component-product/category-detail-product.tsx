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
import { fetchCategory } from "@/features/auth/services/category-service";


type Category = {
  id: string;
  name: string;
  children?: Category[];
};

const CategoryDropdown: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategory();
        console.log("Fetched categories:", data); // Debugging
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectCategory = (path: string) => {
    setSelectedPath(path);
    if (!openCategories.includes(path)) {
      setOpenCategories((prev) => [...prev, path]);
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
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
          const isOpen = openCategories.includes(currentPath);
          const isClickable = !item.children;
          const isSelected = selectedPath.startsWith(currentPath);

          return (
            <Box key={item.id} w="full">
              {isClickable ? (
                <MenuItem
                  value="item"
                  cursor="pointer"
                  bg={"white"}
                  onClick={() => handleSelectCategory(currentPath)}
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
                  onClick={() => toggleCategory(currentPath)}
                  _hover={{ bg: "gray.100" }}
                >
                  <HStack justify="space-between" w="full">
                    <Text fontSize="md">{item.name}</Text>
                    {isSelected && <Circle size={2} bg="blue.500" mr={0} />}
                  </HStack>
                  {item.children && (
                    <ChevronRight
                      size={16}
                      style={{ visibility: openCategories.includes(currentPath) ? "hidden" : "visible" }}
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
            <Text color="gray.600" fontWeight={'normal'}> {selectedPath || "Pilih kategori"}</Text>
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