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
import { Box, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';

export function DialogNonaktif() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <Box
            border={'1px solid'}
            p={1}
            px={2}
            maxW={'fit-content'}
            borderRadius={'50px'}
            cursor={'pointer'}
          >
            <Text fontSize={'14px'}>Nonaktifkan Produk</Text>
          </Box>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nonaktifkan 5 produk</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>
              Produk yang dinonaktifkan tidak akan dapat dilihat oleh calon
              pembeli. Pastikan tindakan kamu benar.
            </Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette={'red'}>Ya, Nonaktifkan</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
