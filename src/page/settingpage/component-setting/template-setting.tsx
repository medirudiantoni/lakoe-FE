import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import toast from 'react-hot-toast';
import { Box, Button, Text, Input, Textarea } from '@chakra-ui/react';
import { DialogDelete } from '../dialog/dialog-delete';
import { DialogEdit } from '../dialog/dialog-edit';
import {
  CreatedTemplate,
  fetchTemplate,
} from '@/features/auth/services/template-service';
import { TemplateFormProps } from '@/features/auth/types/template-types';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/features/auth/store/auth-store';
import LoadingButtonLottie from '@/components/icons/loading-button';

export function TemplateSetting() {
  const [open, setOpen] = useState(false);
  const [judulPesan, setJudulPesan] = useState('');
  const [isiPesan, setIsiPesan] = useState('');
  const { user } = useAuthStore();
  const storeId = user?.Stores.id;
  const queryClient = useQueryClient();
  const {
    data: templates = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['templates', storeId],
    queryFn: async () => {
      if (!storeId) return []; // Pastikan storeId ada sebelum fetch
      const token = Cookies.get('token') || '';
      return fetchTemplate(storeId, token);
    },
    enabled: !!storeId, // Query hanya dijalankan jika storeId ada
  });

  // Mutation untuk menyimpan template
  const mutation = useMutation({
    mutationFn: async (data: TemplateFormProps) => {
      const token = Cookies.get('token') || '';
      return CreatedTemplate(data, token);
    },
    onSuccess: (newTemplate) => {
      toast.success('Template berhasil disimpan! 🎉');
      setOpen(false);
      setJudulPesan('');
      setIsiPesan('');

      // **🔥 Tambahkan data baru ke cache secara manual**
      queryClient.setQueryData(
        ['templates', storeId],
        (oldData: TemplateFormProps[]) => {
          return Array.isArray(oldData)
            ? [...oldData, newTemplate]
            : [newTemplate];
        }
      );

      // **🔥 Tetap invalidasi cache agar data tetap akurat**
      queryClient.invalidateQueries({ queryKey: ['templates', storeId] });
    },
    onError: (error: Error) => {
      toast.error(`Gagal menyimpan template: ${error.message}`);
    },
  });

  const handleSave = () => {
    if (!judulPesan || !isiPesan) {
      toast.error('Judul dan isi pesan tidak boleh kosong!');
      return;
    }
    mutation.mutate({
      name: judulPesan,
      content: isiPesan,
      storeId: storeId || '',
    });
  };

  const handleAddText = (text: string) => {
    setIsiPesan((prev) => prev + text);
  };

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={5}
      >
        <Text fontSize={'20px'} fontWeight={'bold'}>
          Daftar Template Pesan
        </Text>
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
          <DialogTrigger asChild>
            <Button bg="blue" borderRadius={'50px'}>
              Buat Template
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Template Pesan Baru</DialogTitle>
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
                <Text my={3}>Isi Pesan</Text>
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
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              <Button
                type="submit"
                bg="blue"
                onClick={handleSave}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? <LoadingButtonLottie /> : 'Save'}
              </Button>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      </Box>

      {/* Tampilkan daftar template */}
      <Box mt={3}>
        {isLoading && <Text>Memuat template...</Text>}
        {isError && <Text color="red.500">Gagal memuat template</Text>}

        {Array.isArray(templates) && templates.length > 0
          ? templates.map((template: TemplateFormProps) => (
              <Box
                key={template.id}
                width="full"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="10px"
                mt={3}
                p={3}
              >
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Text fontWeight={'semibold'} fontSize={'20px'}>
                    {template.name}
                  </Text>
                  <Box display={'flex'} gap={2}>
                    <Box
                      border={'1px solid'}
                      p={2}
                      borderRadius={'50px'}
                      cursor={'pointer'}
                    >
                      <DialogDelete template={template} />
                    </Box>
                    <Box
                      border={'1px solid'}
                      p={2}
                      borderRadius={'50px'}
                      cursor={'pointer'}
                    >
                      <DialogEdit template={template} />
                    </Box>
                  </Box>
                </Box>
                <Text mt={3}>{template.content}</Text>
              </Box>
            ))
          : !isLoading && !isError && <Text>Tidak ada template tersedia.</Text>}
      </Box>
    </Box>
  );
}
