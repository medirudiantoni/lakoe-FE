import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { Button, Input, Textarea, Box, Text } from '@chakra-ui/react';
import { Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { updateTemplate } from '@/features/auth/services/template-service';
import { TemplateFormProps } from '@/features/auth/types/template-types';
import LoadingButtonLottie from '@/components/icons/loading-button';

interface DialogEditProps {
  template: TemplateFormProps;
}

export function DialogEdit({ template }: DialogEditProps) {
  const [open, setOpen] = useState(false);
  const [judulPesan, setJudulPesan] = useState('');
  const [isiPesan, setIsiPesan] = useState('');
  const queryClient = useQueryClient();

  // Sinkronisasi state dengan template saat modal dibuka
  useEffect(() => {
    if (open) {
      setJudulPesan(template.name);
      setIsiPesan(template.content);
    }
  }, [open, template]);

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      content: string;
      storeId: string;
    }) => {
      const token = Cookies.get('token') ?? ''; // Jika undefined, gunakan string kosong
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login kembali.'); // Lempar error jika token tidak ada
      }
      return updateTemplate(template?.id ?? '', data, token); // Pastikan token disertakan
    },
    onSuccess: (updatedTemplate) => {
      console.log('Updated Template:', updatedTemplate);
      toast.success('Template berhasil diperbarui!');
      setOpen(false);

      queryClient.setQueryData(
        ['templates', template.storeId],
        (oldData: TemplateFormProps[] | undefined) => {
          if (!oldData) return [updatedTemplate, template]; // Jika tidak ada data, return array baru
          return oldData.map((t) =>
            t.id === updatedTemplate.id ? updatedTemplate : t
          );
        }
      );

      // **Invalidasi query agar data tetap fresh**
      queryClient.invalidateQueries({
        queryKey: ['templates', template.storeId],
      });
    },
    onError: (error) => {
      toast.error(`Gagal memperbarui template: ${error.message}`);
    },
  });

  const handleAddText = (text: string) => {
    setIsiPesan((prev) => prev + text);
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Edit color="#75757C" size="16px" cursor="pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Template Pesan</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box mb={4}>
            <Text mb={2}>Judul Pesan</Text>
            <Input
              value={judulPesan}
              onChange={(e) => setJudulPesan(e.target.value)}
              placeholder="Masukkan judul pesan"
            />
          </Box>
          <Box mt={3} display="flex" gap={2}>
            <Button
              size="sm"
              borderRadius={'50px'}
              bg={'white'}
              color={'black'}
              onClick={() => handleAddText('[Nama Customer]')}
            >
              Customer Name
            </Button>
            <Button
              size="sm"
              borderRadius={'50px'}
              bg={'white'}
              color={'black'}
              onClick={() => handleAddText('[Nama Produk]')}
            >
              Product Name
            </Button>
            <Button
              size="sm"
              borderRadius={'50px'}
              bg={'white'}
              color={'black'}
              onClick={() => handleAddText('[Nama Toko]')}
            >
              Store Name
            </Button>
          </Box>
          <Box>
            <Text mb={2}>Isi Pesan</Text>
            <Textarea
              value={isiPesan}
              onChange={(e) => setIsiPesan(e.target.value)}
              placeholder="Masukkan isi pesan"
              rows={5}
            />
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" disabled={mutation.isPending}>
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button
            type="submit"
            borderRadius={'50px'}
            bg="blue"
            onClick={() =>
              mutation.mutate({
                name: judulPesan,
                content: isiPesan,
                storeId: template.storeId,
              })
            }
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <LoadingButtonLottie /> : 'Perbarui'}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
