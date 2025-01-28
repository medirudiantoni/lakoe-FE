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
import { DialogDelete } from '../dialog/dialog-delete';
import { DialogEdit } from '../dialog/dialog-edit';

export function TemplateSetting() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={5}
      >
        <Box>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            Daftar Template Pesan
          </Text>
        </Box>
        <Button colorPalette={'blue'} borderRadius={'50px'}>
          <DialogRoot
            lazyMount
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
          >
            <DialogTrigger asChild>
              <Text>Buat Template</Text>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Buat Template</DialogTitle>
              </DialogHeader>
              <DialogBody></DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <Button colorPalette={'blue'}>Save</Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </Button>
      </Box>
      <Box
        width="full"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="10px"
        mt={3}
        p={3}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <Text fontWeight={'semibold'} fontSize={'20px'}>Pesan Promo</Text>
          <Box display={'flex'} gap={2}>
            <Box
              border={'1px solid'}
              p={2}
              borderRadius={'50px'}
              cursor={'pointer'}
            >
              <DialogDelete />
            </Box>
            <Box
              border={'1px solid'}
              p={2}
              borderRadius={'50px'}
              cursor={'pointer'}
            >
              <DialogEdit />
            </Box>
          </Box>
        </Box>
        <Text mt={3}>
        Hai, kami dari Fesyen Store. Pesanan Anda telah dikirimkan dengan nomor resi [Nomor Resi]. Anda dapat melacak pengiriman Anda melalui [Link Pelacakan]. Terima kasih telah berbelanja di toko kami!
        </Text>
      </Box>
    </Box>
  );
}
