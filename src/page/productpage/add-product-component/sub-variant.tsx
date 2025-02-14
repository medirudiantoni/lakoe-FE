import { Field } from '@/components/ui/field';
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from '@/components/ui/file-upload';
import { Switch } from '@/components/ui/switch';
import { Box, Button, Group, Input, InputAddon, Text } from '@chakra-ui/react';
import { CirclePlus, NotebookPen } from 'lucide-react';

export function Variant() {
  return (
    <Box p={3} m={4}>
      {/* Variant */}
      <Box display={'flex'} gap={3} mt={3}>
        <Button colorPalette={'cyan'} variant="surface" borderRadius={'20px'}>
          Harga
        </Button>
        <Button variant="outline" borderRadius={'20px'}>
          Ukuran
        </Button>
        <Button variant="outline" borderRadius={'20px'}>
          Ukuran Kemasan
        </Button>
        <Button variant="outline" borderRadius={'20px'}>
          <CirclePlus />
          Buat Tipe Varian
        </Button>
      </Box>

      <Field label="Warna" mt={5}>
        <Input placeholder="" />
      </Field>

      <Box mt={5}>
        <Switch colorPalette={'blue'} defaultChecked size={'lg'} mr={3} />
        <span>Gunakan Foto</span>
      </Box>
      <FileUploadRoot maxW="xs" alignItems="stretch" maxFiles={10} mt={3}>
        <FileUploadDropzone
          label="Drag and drop here to upload"
          description="Foto Varian"
        />
        <FileUploadList />
      </FileUploadRoot>

      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={5}
      >
        <Box>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            Daftar Varian
          </Text>
          <Text>Kamu dapat mengatur harga, stok dan SKU sekaligus</Text>
        </Box>
        <Button variant={'solid'} colorPalette={'blue'} borderRadius={'50px'}>
          <NotebookPen />
          <span className="ms-2">Atur Sekaligus</span>
        </Button>
      </Box>
      <Box display={'flex'} gap={3} alignItems={'center'} mt={5}>
        <span className="font-medium">Sage</span>
        <Switch size={'lg'} colorPalette={'blue'} />
        <span>Aktif</span>
      </Box>
      <Box display={'flex'} gap={'3'}>
        <Field label="Warna" mt={5} width={'55%'}>
          <Group attached>
            <InputAddon>Rp</InputAddon>
            <Input placeholder="Masukan harga barang" />
          </Group>
        </Field>
        <Field label="Stock Produk" mt={5} width={'45%'}>
          <Input
            placeholder="Masukan jumlah stock"
            type="number"
          />
        </Field>
      </Box>
      <Box display={'flex'} gap={'3'}>
        <Field label="SKU(Stock Keeping)" mt={5} width={'55%'}>
          <Input placeholder="Masukan SKU" />
        </Field>
        <Field label="Berat Produk" mt={5} width={'45%'}>
          <Group attached width={'full'}>
            <Input placeholder="Masukan berat produk" />
            <InputAddon>Gram</InputAddon>
          </Group>
        </Field>
      </Box>
    </Box>
  );
}
