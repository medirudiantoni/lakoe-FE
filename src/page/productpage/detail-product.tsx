import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from '@/components/ui/breadcrumb';
import { Field } from '@/components/ui/field';
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '@/components/ui/file-upload';
import { Switch } from '@/components/ui/switch';
import {
  Box,
  Button,
  Group,
  Input,
  InputAddon,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { ChevronDown, CirclePlus, NotebookPen } from 'lucide-react';
import { Link, useParams } from 'react-router';
import products from "@/data-dummy/products.json"
import { useEffect, useState } from 'react';

export function Detailproduct() {
    const { id } = useParams<{ id: string }>();
    const product = products.find((product) => product.id === id);
    const [isEditable, setIsEditable] = useState(false);
    const [editableProduct, setEditableProduct] = useState(product || { name: '' });
    useEffect(() => {
        if (product) {
          setEditableProduct(product);
        }
      }, [product]);
    
  
    if (!product) {
      return (
        <Box p={3} m={4} textAlign="center" color="red.500">
          <p>Produk tidak ditemukan!</p>
        </Box>
      );
    }
  
    const toggleEditMode = () => {
      if (isEditable) {
        // Simpan perubahan (logika penyimpanan bisa ditambahkan di sini)
        console.log('Data yang disimpan:', editableProduct);
      }
      setIsEditable(!isEditable);
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditableProduct({
        ...editableProduct,
        [e.target.name]: e.target.value,
      });
    };

    return (
        <Box>
                  <BreadcrumbRoot p={3} m={4} pb={0} >
                    <BreadcrumbLink>
                      <Link to="/product" className="text-blue-400">
                        Daftar Produk
                      </Link>
                    </BreadcrumbLink>
                    <BreadcrumbCurrentLink>{product.name}</BreadcrumbCurrentLink>
                  </BreadcrumbRoot>
        <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            Informasi Produk
          </Text>
          <Button
            onClick={toggleEditMode}
            variant="outline"
            colorPalette="blue"
            borderRadius={20}
          >
            {isEditable ? 'Simpan' : 'Edit'}
          </Button>
        </Box>

          <Box display={'flex'} flexDirection={'column'} gap={4} mt={5}>
            <Field label="Nama Produk" required>
              <Input    
        placeholder="Masukkan Nama Produk"
        disabled={!isEditable} // Jika bukan mode edit, input disabled
        value={editableProduct.name}
        onChange={handleInputChange}
     />
            </Field>
            <Field label="URL Halaman Checkout" required>
              <Group attached width={'full'}>
                <InputAddon>lakoe.store/</InputAddon>
                <Input placeholder="nama-produk" />
              </Group>
            </Field>
            <Field label="Kategori" required position={'relative'}>
              <MenuRoot>
                <MenuTrigger asChild>
                  <Button
                    variant={'outline'}
                    width={'100%'}
                    display={'flex'}
                    justifyContent={'space-between'}
                    px={3}
                  >
                    <span className="font-normal text-[#75757C]">
                      Pilih kategori produk
                    </span>
                    <ChevronDown />
                  </Button>
                </MenuTrigger>
                <MenuContent position={'absolute'} width={'full'} top={'70px'}>
                  <MenuItem value="new-txt">New Text File</MenuItem>
                  <MenuItem value="new-file">New File...</MenuItem>
                  <MenuItem value="new-win">New Window</MenuItem>
                  <MenuItem value="open-file">Open File...</MenuItem>
                  <MenuItem value="export">Export</MenuItem>
                </MenuContent>
              </MenuRoot>
            </Field>
          </Box>
        </Box>
        <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            Detail Produk
          </Text>
          <Box display={'flex'} flexDirection={'column'} gap={4} mt={5}>
            <Field label="Deskripsi" required>
              <Textarea
                placeholder="Masukan informasi lebih lengkap tentang produk kamu"
                h={40}
              />
            </Field>
            <Field label="Foto Produksi" required>
              <Box display={'flex'} width={'full'} gap={3}>
                <FileUploadRoot maxW="4/12" alignItems="stretch" maxFiles={10}>
                  <FileUploadRoot
                    maxW="xs"
                    alignItems="stretch"
                    maxFiles={10}
                    cursor={'pointer'}
                  >
                    <FileUploadDropzone
                      label="Drag and drop here to upload"
                      description="Foto 1"
                    />
                    <FileUploadList />
                  </FileUploadRoot>
                </FileUploadRoot>
                <FileUploadRoot maxW="4/12" alignItems="stretch" maxFiles={10}>
                  <FileUploadRoot
                    maxW="xs"
                    alignItems="stretch"
                    maxFiles={10}
                    cursor={'pointer'}
                  >
                    <FileUploadDropzone
                      label="Drag and drop here to upload"
                      description="Foto 2"
                    />
                    <FileUploadList />
                  </FileUploadRoot>
                </FileUploadRoot>
                <FileUploadRoot maxW="4/12" alignItems="stretch" maxFiles={10}>
                  <FileUploadRoot
                    maxW="xs"
                    alignItems="stretch"
                    maxFiles={10}
                    cursor={'pointer'}
                  >
                    <FileUploadDropzone
                      label="Drag and drop here to upload"
                      description="Foto 3"
                    />
                    <FileUploadList />
                  </FileUploadRoot>
                </FileUploadRoot>
                <FileUploadRoot maxW="4/12" alignItems="stretch" maxFiles={10}>
                  <FileUploadRoot
                    maxW="xs"
                    alignItems="stretch"
                    maxFiles={10}
                    cursor={'pointer'}
                  >
                    <FileUploadDropzone
                      label="Drag and drop here to upload"
                      description="Foto 4"
                    />
                    <FileUploadList />
                  </FileUploadRoot>
                </FileUploadRoot>
              </Box>
            </Field>
          </Box>
        </Box>
        <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Box>
              <Text fontSize={'24px'} fontWeight={'bold'}>
                Variant
              </Text>
              <Text>
                Tambah varian agar pembeli dapat memilih produk yang sesuai, yuk!
              </Text>
            </Box>
            <Link to="/add-product">
              <Button variant={'outline'} borderRadius={'50px'}>
                <CirclePlus />
                <span className="ms-2">Tambahkan Variant</span>
              </Button>
            </Link>
          </Box>
          <Box display={'flex'} gap={3} mt={3}>
            <Button colorPalette={'cyan'} variant="surface" borderRadius={'20px'}>
              Warna
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
  
          <Field label="Warna" required mt={5}>
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
            <Field label="Warna" required mt={5} width={'55%'}>
              <Group attached>
                <InputAddon>Rp</InputAddon>
                <Input placeholder="Masukan harga barang" />
              </Group>
            </Field>
            <Field label="Stock Produk" required mt={5} width={'45%'}>
              <Input placeholder="Masukan jumlah stock" />
            </Field>
          </Box>
          <Box display={'flex'} gap={'3'}>
            <Field label="SKU(Stock Keeping)" required mt={5} width={'55%'}>
              <Input placeholder="Masukan SKU" />
            </Field>
            <Field label="Berat Produk" required mt={5} width={'45%'}>
              <Group attached width={'full'}>
                <Input placeholder="Masukan berat produk" />
                <InputAddon>Gram</InputAddon>
              </Group>
            </Field>
          </Box>
        </Box>
        <Box
          p={3}
          m={4}
          backgroundColor={'white'}
          borderRadius={10}
          display={'flex'}
          flexDirection={'column'}
        >
          <Text fontSize={'24px'} fontWeight={'bold'}>
            Harga
          </Text>
          <Field label="Harga" required mt={5}>
            <Group attached width={'full'}>
              <InputAddon>Rp</InputAddon>
              <Input placeholder="Masukan harga satuan barang" />
            </Group>
          </Field>
  
          <Field label="Minimal pembelian" required mt={3}>
            <Group attached width={'full'}>
              <Input placeholder="1" />
              <InputAddon>Produk</InputAddon>
            </Group>
          </Field>
        </Box>
        <Box
          p={3}
          m={4}
          backgroundColor={'white'}
          borderRadius={10}
          display={'flex'}
          flexDirection={'column'}
        >
          <Text fontSize={'24px'} fontWeight={'bold'}>
            Pengelolaan Produk
          </Text>
          <Box display={'flex'} gap={3}>
            <Field label="Stok Produk" required mt={5}>
              <Input placeholder="Masukan stok barang" />
            </Field>
            <Field label="SKU (Stock Keeping Unit)" required mt={5}>
              <Input placeholder="Masukan SKU" />
            </Field>
          </Box>
        </Box>
        <Box
          p={3}
          m={4}
          backgroundColor={'white'}
          borderRadius={10}
          display={'flex'}
          flexDirection={'column'}
        >
          <Text fontSize={'24px'} fontWeight={'bold'}>
            Berat dan Pengiriman
          </Text>
          <Field label="Berat Produk" required mt={5}>
            <Group attached width={'full'}>
              <Input placeholder="Masukan berat produk" />
              <InputAddon>gram</InputAddon>
            </Group>
          </Field>
          <Box display={'flex'} alignItems={'end'} gap={3} mt={3}>
            <Field label="Ukuran Produk" required>
              <Group attached width={'full'}>
                <Input placeholder="Panjang" />
                <InputAddon>cm</InputAddon>
              </Group>
            </Field>
            <Field>
              <Group attached width={'full'}>
                <Input placeholder="Lebar" />
                <InputAddon>cm</InputAddon>
              </Group>
            </Field>
            <Field>
              <Group attached width={'full'}>
                <Input placeholder="Tinggi" />
                <InputAddon>cm</InputAddon>
              </Group>
            </Field>
          </Box>
        </Box>
        <Box
          p={3}
          m={4}
          backgroundColor={'white'}
          borderRadius={10}
          display={'flex'}
          flexDirection={'column'}
        >
    
        </Box>
      </Box>
    )
}