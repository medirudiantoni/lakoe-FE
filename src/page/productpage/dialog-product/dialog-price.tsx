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

export function DialogPrice() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <Button variant={'outline'} mt={4} borderRadius={'20px'}>
            Ubah harga
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah harga untuk produk...</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Group attached width={'full'}>
              <InputAddon>Rp</InputAddon>
              <Input placeholder="Ubah harga produk" outlineColor={'blue.400'} />
            </Group>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button>Save</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
