import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "@/utils/baseurl";

export interface CategoryType {
    name: string;
    children?: CategoryType[];
}

interface CategoryDropDownProps {
    onSelectCategory: (category: CategoryType | null) => void;
    onSelectSubCategory: (category: CategoryType | null) => void;
    onSelectSubSubCategory: (category: CategoryType | null) => void;
}

const CategoryDropDown: React.FC<CategoryDropDownProps> = ({ onSelectCategory, onSelectSubCategory, onSelectSubSubCategory }) => {
    const [category, setCategory] = useState<CategoryType[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<CategoryType | null>(null);
    const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<CategoryType | null>(null);
    const [subCategory, setSubCategory] = useState<CategoryType[] | null>(null);
    const [subSubCategory, setSubSubCategory] = useState<any>(null);

    useEffect(() => {
        axios.get<CategoryType[]>(`${apiURL}category`)
            .then(res => {
                const result = [{ name: "Semua Produk", Children: null }, ...res.data]
                setCategory(result);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        setSubCategory(category?.find(cat => cat.name === selectedCategory?.name)?.children || null);
        setSubSubCategory(null);
    }, [selectedCategory, category]);

    useEffect(() => {
        setSubSubCategory(subCategory?.find(cat => cat.name === selectedSubCategory?.name)?.children || null);
    }, [selectedSubCategory, subCategory]);


    const handleCategorySelect = (cat: CategoryType) => {
        setSelectedCategory(cat);
        setSubCategory(null);
        setSubSubCategory(null);
        onSelectCategory(cat);  // Kirim ke parent
        onSelectSubCategory(null);
    };

    const handleSubCategorySelect = (cat: CategoryType) => {
        setSelectedSubCategory(cat);
        setSubSubCategory(null);
        onSelectSubCategory(cat);  // Kirim ke parent
        onSelectSubSubCategory(null)
    };

    const handleSubSubCategorySelect = (cat: CategoryType) => {
        setSelectedSubSubCategory(cat);
        onSelectSubSubCategory(cat);  // Kirim ke parent
    };

    return (
        <Box className="group-hover:h-fit h-0 group-hover:py-5 overflow-hidden duration-100" position="absolute" top="100%" left={0} borderRadius="lg" w="full">
            <HStack p="5" borderWidth={1} borderColor="gray.200" alignItems="start" gap="10" w="full" maxW="full" h="fit" borderRadius="lg" className="bg-white/70 backdrop-blur-lg">
                <VStack w="1/3" h="fit" maxH="80" overflowY="auto" alignItems="start" className="custom-scrollbar">
                    {category && category.map((cat: any, id: number) => (
                        <Button key={id} onClick={() => handleCategorySelect(cat)} bg={selectedCategory?.name === cat.name ? "gray.200" : ""} color={selectedCategory?.name === cat.name ? "blue.700" : ""} variant="outline" borderWidth={0} justifyContent="space-between" w="full">
                            <Text>{cat.name}</Text>
                            <ChevronRight />
                        </Button>
                    ))}
                </VStack>
                <VStack w="1/3" h="fit" maxH="80" overflowY="auto" alignItems="start" className="custom-scrollbar">
                    {subCategory && subCategory.map((cat: any, id: number) => (
                        <Button key={id} onClick={() => handleSubCategorySelect(cat)} bg={selectedSubCategory?.name === cat.name ? "gray.200" : ""} color={selectedSubCategory?.name === cat.name ? "blue.700" : ""} variant="outline" borderWidth={0} justifyContent="space-between" w="full">
                            <Text>{cat.name}</Text>
                            <ChevronRight />
                        </Button>
                    ))}
                </VStack>
                <VStack w="1/3" h="fit" maxH="80" overflowY="auto" alignItems="start" className="custom-scrollbar">
                    {subSubCategory && subSubCategory.map((cat: any, id: number) => (
                        <Button onClick={() => handleSubSubCategorySelect(cat)} bg={selectedSubSubCategory?.name === cat.name ? "gray.200" : ""} color={selectedSubSubCategory?.name === cat.name ? "blue.700" : ""} key={id} variant="outline" borderWidth={0} justifyContent="space-between" w="full">
                            <Text>{cat.name}</Text>
                        </Button>
                    ))}
                </VStack>
            </HStack>
        </Box>
    )
}

export default CategoryDropDown;