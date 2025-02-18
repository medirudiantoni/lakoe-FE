import { Checkbox } from '@/components/ui/checkbox';
import { fetchAllCategoryLevel1 } from '@/features/auth/services/category-service';
import { CategoryType } from '@/features/auth/types/prisma-types';
import {
  Box,
  Button,
  MenuContent,
  MenuRoot,
  MenuTrigger,
} from '@chakra-ui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  onChangeData: (data: string[]) => void;
};

const Category: React.FC<Props> = ({ onChangeData }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof onChangeData === 'function') {
      onChangeData(selectedCategories);
    } else {
      console.error('onChangeData is not a function', onChangeData);
    }
  }, [selectedCategories]);

  useEffect(() => {
    retrieveAllCatLevel1();
  }, []);

  function retrieveAllCatLevel1() {
    fetchAllCategoryLevel1().then((res: CategoryType[]) =>
      setCategories([...res.map((e) => e.name)])
    );
  }

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
              : 'Semua Kategori'}
            {isMenuOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </MenuTrigger>
        <MenuContent
          maxH="200px"
          overflowY="auto"
          position={'absolute'}
          width={'full'}
        >
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
            <Box key={category} fontWeight={'normal'}>
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
};

export default Category;
