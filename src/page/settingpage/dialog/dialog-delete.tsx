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
import { Button, Text } from '@chakra-ui/react';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTemplate } from '@/features/auth/services/template-service';
import toast from 'react-hot-toast';
import LoadingButtonLottie from '@/components/icons/loading-button';
import { TemplateFormProps } from '@/features/auth/types/template-types';
import Cookies from 'js-cookie';
interface DialogDeleteProps {
  template: TemplateFormProps;
}

export function DialogDelete({ template }: DialogDeleteProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const token = Cookies.get('token') ?? ''; // Jika undefined, gunakan string kosong
  if (!token) {
    throw new Error('Token tidak ditemukan. Silakan login kembali.'); // Lempar error jika token tidak ada
  }
  // Mutasi untuk menghapus template
  const mutation = useMutation({
    mutationFn: () => deleteTemplate(template?.id ?? '', token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template berhasil dihapus! ✅');
      setOpen(false); // Tutup modal setelah sukses
    },
    onError: (error) => {
      toast.error(`Gagal menghapus template: ${error.message}`);
    },
  });

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Trash color="#75757C" size={'16px'} cursor="pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Template Pesan</DialogTitle>
        </DialogHeader>
        <DialogBody>
          Apakah kamu yakin ingin menghapus template ini?
          <Text fontSize="sm" color="gray.500">
            Template yang sudah dihapus tidak bisa dikembalikan.
          </Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button borderRadius={'50px'} variant="outline">
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button
            type="submit"
            bg="blue"
            borderRadius={'50px'}
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <LoadingButtonLottie /> : 'Ya, Hapus'}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
