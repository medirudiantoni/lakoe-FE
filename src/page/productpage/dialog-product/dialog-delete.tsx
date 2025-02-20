import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteProduct } from '@/features/auth/services/product-service';
import { useCheckboxStore } from '@/features/auth/store/product-store';
import { Box, Button, Text } from '@chakra-ui/react';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useProductStore } from '@/features/auth/store/toggle-active-product.store';

export function DialogDelete() {
  const [open, setOpen] = useState(false);
  const { selectedProducts, setSelectedProducts } = useCheckboxStore();
  const { removeProduct } = useProductStore();
  const [, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const token = await Cookies.get('token');
    setIsLoading(true);
    try {
      selectedProducts.map((id) => removeProduct(id));
      await Promise.all(selectedProducts.map((id) => deleteProduct(id, String(token))));
      toast.success(`${selectedProducts.length} produk telah dihapus.`);
      setSelectedProducts([]);
      setOpen(false);
    } catch (error) {
      toast.error('Gagal menghapus produk.');
    }
  };

  return (
    <Box>
      <DialogRoot
        lazyMount
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <DialogTrigger asChild>
          <Box
            border={'1px solid'}
            p={2}
            maxW={'fit-content'}
            borderRadius={'50px'}
            cursor={'pointer'}
          >
            <Trash size={'14px'} />
          </Box>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus {selectedProducts.length} Produk</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>
              Produk yang dihapus tidak akan bisa dibatalkan. Pastikan produk
              yang kamu pilih itu sudah benar.
            </Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button colorPalette={'red'} onClick={handleDelete}>
              Ya, Hapus
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
