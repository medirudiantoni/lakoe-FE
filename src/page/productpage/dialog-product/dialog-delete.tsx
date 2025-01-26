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
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { Trash } from 'lucide-react';
import { useState } from 'react';

export function DialogDelete() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
        <Box border={'1px solid'} p={2} maxW={'fit-content'} borderRadius={'50px'} cursor={'pointer'}>
          <Trash size={'14px'}/>
        </Box>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus 5 Produk</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>Produk yang dihapus tidak akan bisa dibatalkan. Pastikan produk yang kamu pilih itu sudah benar.</Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette={'blue'}>Ya, Hapus</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
