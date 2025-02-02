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
import { useProductStore } from '@/features/auth/store/product-store';
import { Box, Button, Text } from '@chakra-ui/react';
import { Trash } from 'lucide-react';
import { useState } from 'react';

export function DialogDelete() {
  const [open, setOpen] = useState(false);
  const { products, deleteProduct } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct);
      setOpen(false);
    }
  };

  return (
    <Box>
      {products.map((product) => (
        <Box
          key={product.id}
          border="1px solid"
          p={2}
          maxW="fit-content"
          borderRadius="50px"
          cursor="pointer"
          onClick={() => {
            setSelectedProduct(product.id);
            setOpen(true);
          }}
        >
          <Trash size="14px" />
        </Box>
      ))}

      <DialogRoot lazyMount open={open} onOpenChange={(details) => setOpen(details.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Produk</DialogTitle>
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
            <Button colorPalette="red" onClick={handleDelete}>
              Ya, Hapus
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
