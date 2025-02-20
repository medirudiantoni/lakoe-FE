import { Checkbox } from '@/components/ui/checkbox';
import { useCheckboxStore } from '@/features/auth/store/product-store';
import { Box, Text } from '@chakra-ui/react';

interface Props {
  allProductIds: string[];
}

const SelectAllCheckbox: React.FC<Props> = ({ allProductIds }) => {
  const { selectedProducts, toggleSelectAll } = useCheckboxStore();

  return (
    <Box display="flex" py={2}>
      <Text fontWeight="normal" mr={2}>
        Pilih Semua
      </Text>
      <Checkbox
        checked={selectedProducts.length === allProductIds.length}
        onCheckedChange={() => toggleSelectAll(allProductIds)}
        cursor="pointer"
        fontWeight="normal"
        variant="solid"
        colorPalette="blue"
      />
    </Box>
  );
};

export default SelectAllCheckbox;
