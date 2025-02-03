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
import { Box, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '@/features/auth/store/product-store';
import toast from 'react-hot-toast';

export function DialogStock({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const [newStock, setNewStock] = useState<number | ''>('');
  const { updateStock } = useProductStore();

  const handleUpdateStock = async () => {
    if (newStock === '' || Number(newStock) < 0) {
      toast.error('Stok tidak boleh kosong atau negatif');
      return;
    }

    try {
      await updateStock(productId, Number(newStock));
      setOpen(false);
    } catch (error) {
      console.error('Gagal memperbarui stok:', error);
    }
  };

  return (
    <Box>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <Button variant="outline" mt={4} borderRadius="20px">
            Ubah Stok
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah stok untuk produk</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Input
              type="number"
              placeholder="Masukkan jumlah stok baru"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value ? Number(e.target.value) : '')}
              outlineColor="blue.400"
            />
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button colorScheme="blue" onClick={handleUpdateStock}>
              Save
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
