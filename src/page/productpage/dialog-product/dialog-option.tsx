import { Button } from '@/components/ui/button';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import { Text } from '@chakra-ui/react';
import { Ellipsis, FilePenLine, FileStack, Trash2 } from 'lucide-react';

const DialogOption = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" mt={4} borderRadius="20px">
          <Ellipsis />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="Varian" valueText="Varian Produk">
          <FileStack />
          <Text ml={2}>Varian Produk</Text>
        </MenuItem>
        <MenuItem value="Edit" valueText="Edit Produk">
          <FilePenLine />
          <Text ml={2}>Edit Produk</Text>
        </MenuItem>
        <MenuItem value="Hapus" valueText="Hapus Produk" color="red.600">
          <Trash2 />
          <Text ml={2}>Hapus Produk</Text>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default DialogOption;
