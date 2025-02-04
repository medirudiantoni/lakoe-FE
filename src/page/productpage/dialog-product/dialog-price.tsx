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
import { Box, Button, Group, Input, InputAddon } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '@/features/auth/store/product-store';
import toast from 'react-hot-toast';

export function DialogPrice({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const [newPrice, setNewPrice] = useState<number | ''>('');
  const { updatePrice } = useProductStore();

  const handleUpdatePrice = async () => {
    if (!newPrice || Number(newPrice) <= 0) {
      toast.error('Harga tidak boleh kosong atau negatif');
      return;
    }

    try {
      await updatePrice(productId, Number(newPrice));
      setOpen(false); 
    } catch (error) {
      console.error('Gagal memperbarui harga:', error);
    }
  };

  return (
    <Box>
      <DialogRoot lazyMount open={open} onOpenChange={(details) => setOpen(details.open)}>
        <DialogTrigger asChild>
          <Button variant="outline" mt={4} borderRadius="20px">
            Ubah harga
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah harga untuk produk</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Group w={'full'}>
              <InputAddon>Rp</InputAddon>
              <Input
                type="number"
                placeholder="Masukkan harga baru"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value ? Number(e.target.value) : '')}
                outlineColor="blue.400"
              />
            </Group>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button colorPalette="blue" onClick={handleUpdatePrice}>
              Save
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
