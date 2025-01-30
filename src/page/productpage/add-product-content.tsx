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
  Text,
  Textarea
} from '@chakra-ui/react';

import { CirclePlus, NotebookPen } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import CategoryDropdown from './component-product/category-detail-product';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { addProduct } from '@/features/auth/services/product-service';
import { useAuthStore } from '@/features/auth/auth-store/auth-store';
import LoadingButtonLottie from '@/components/icons/loading-button';

const addproductSchema = z.object({
  name: z.string().min(3, 'Nama product harus diisi'),
  description: z.string().min(50,'Deskripsi harus diisi'),
  url: z.string().min(5, 'Url produk harus diisi'),
  minimumOrder: z.string().min(1, 'Tentukan minimal pesanan'),
  price: z.string().min(4, 'Harga produk harus diisi'),
  sku: z.string().min(4, 'Stock Keeping Unit harus diisi'),
  stock: z.string().transform((val) => Number(val)).refine((val) => val >= 1, {
    message: 'Stock produk harus minimal 1',
  }),
  weight: z.string().transform((val) => Number(val)).refine((val) => val >= 1, {
    message: 'Berat produk harus minimal 1 gram',
  })

})

type ProductFormInputs =z.infer<typeof addproductSchema>

export function AddProductContent() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const {user} = useAuthStore()

  const {
    register, 
    handleSubmit,
    formState: {errors},
  } = useForm<ProductFormInputs>({
    resolver:zodResolver(addproductSchema)
  })

  const onSubmit = (data: ProductFormInputs) => {
    setIsLoading(true)

    const storeId = user?.Stores.id
    const productData = {
      ...data,
      storeId: `"${storeId}"`,  
      categoryId: "1",
    };
  

    toast.promise(
      addProduct(productData), 
      {
        loading:'Sedang menambahkan produk baru...',
        success: (res) => {
          const responseData = res.data;
          navigate('/product')
          return responseData.message || 'Menambahkan produk berhasil'
        },
        error: (error) => {
          return (
            error.message || "Coba ulang kembali..."
          )
        }
      },
      {
        success: {
          style: {
            background: '#FFFF',
            color: '#1d1d1d'
          }
        },
        error:{
          style: {
            background: '#FFFF',
            color:'1d1d1d'
          }
        }
      }
    )
    .finally(()=> setIsLoading(false))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
        <Text fontSize={'24px'} fontWeight={'bold'}>
          Informasi Produk
        </Text>
        <Box display={'flex'} flexDirection={'column'} gap={4} mt={5}>
          <Field label="Nama Produk" >
            <Input placeholder="Masukan Nama Produk" {...register('name')} />
            {errors.name && (
              <Text 
              color={'red.500'}
              fontSize={"xs"}
              textAlign={'left'}
              marginTop={'1.5'}>
                {errors.name.message}
              </Text>
            )}
          </Field>
          <Field label="URL Halaman Checkout" >
            <Group attached width={'full'}>
              <InputAddon>lakoe.store/</InputAddon>
              <Input placeholder="nama-produk" {...register('url')}/>
              {errors.url && (
                <Text>
                  {errors.url.message}
                </Text>
              )} 
            </Group>
          </Field>
          <Field label="Kategori"  position={'relative'}>
            <CategoryDropdown/>
          </Field>
        </Box>
      </Box>
      <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
        <Text fontSize={'24px'} fontWeight={'bold'}>
          Detail Produk
        </Text>
        <Box display={'flex'} flexDirection={'column'} gap={4} mt={5}>
          <Field label="Deskripsi" >
            <Textarea
              placeholder="Masukan informasi lebih lengkap tentang produk kamu"
              h={40}
              {...register('description')}
            />
            {errors.description && (
              <Text
                color="red.500"
                fontSize={"xs"}
                textAlign={'left'}
                marginTop={"1.5"}
              >
                {errors.description.message}
              </Text>
            )}
          </Field>
          <Field label="Foto Produksi" >
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

        <Field label="Warna"  mt={5}>
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
          <Field label="Warna"  mt={5} width={'55%'}>
            <Group attached>
              <InputAddon>Rp</InputAddon>
              <Input placeholder="Masukan harga barang" {...register('price')}/>
              {errors.price && (
              <Text
              color={'red.500'}
              fontSize={"xs"}
              textAlign={'left'}
              marginTop={'1.5'}>
                {errors.price.message}
              </Text>
            )}
            </Group>
          </Field>
          <Field label="Stock Produk"  mt={5} width={'45%'}>
            <Input placeholder="Masukan jumlah stock" {...register('stock')} type="number" />
            {errors.stock && (
              <Text
              color={'red.500'}
              fontSize={"xs"}
              textAlign={'left'}
              marginTop={'1.5'}>
                {errors.stock.message}
              </Text>
            )}
          </Field>
        </Box>
        <Box display={'flex'} gap={'3'}>
          <Field label="SKU(Stock Keeping)"  mt={5} width={'55%'}>
            <Input placeholder="Masukan SKU" {...register('sku')}/>
            {errors.sku && (
              <Text
              color={'red.500'}
              fontSize={"xs"}
              textAlign={'left'}
              marginTop={'1.5'}>
                  {errors.sku.message}
              </Text>
            )}
          </Field>
          <Field label="Berat Produk"  mt={5} width={'45%'}>
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
        <Field label="Harga"  mt={5}>
          <Group attached width={'full'}>
            <InputAddon>Rp</InputAddon>
            <Input placeholder="Masukan harga satuan barang" {...register('price')} />
            {errors.price && (
              <Text
              color={'red.500'}
              fontSize={"xs"}
              textAlign={'left'}
              marginTop={'1.5'}>
                {errors.price.message}
              </Text>
            )}
          </Group>
        </Field>

        <Field label="Minimal pembelian"  mt={3}>
          <Group attached width={'full'}>
            <Input placeholder="1" {...register('minimumOrder')}/>
            {errors.minimumOrder && (
              <Text
              color={'red.500'}
              fontSize={"xs"}
              textAlign={'left'}
              marginTop={'1.5'}>
                {errors.minimumOrder.message}
              </Text>
            )}
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
          <Field label="Stok Produk"  mt={5}>
            <Input placeholder="Masukan stok barang" />
          </Field>
          <Field label="SKU (Stock Keeping Unit)"   mt={5}>
            <Input placeholder="Masukan SKU" {...register('sku')}/>
            {errors.sku && (
              <Text
              color={'red.500'}
              fontSize={"xs"}
              textAlign={'left'}
              marginTop={'1.5'}>
                {errors.sku.message}
              </Text>
            )}
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
        <Field label="Berat Produk"  mt={5}>
          <Group attached width={'full'}>
            <Input placeholder="Masukan berat produk" {...register('weight')} type='number'/>
            {errors.weight && (
              <Text
              color={'red.500'}
              fontSize={"xs"}
              textAlign={'left'}
              marginTop={'1.5'}>
                {errors.weight.message}
              </Text>
            )}
            <InputAddon>gram</InputAddon>
          </Group>
        </Field>
        <Box display={'flex'} alignItems={'end'} gap={3} mt={3}>
          <Field label="Ukuran Produk" >
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
        <Box display={'flex'} justifyContent={'space-between'}>
          <Button variant="outline" borderRadius={'20px'}>
            Preview Halaman Checkout
          </Button>
          <Box display={'flex'} gap={2}>
            <Button variant="outline" borderRadius={'20px'}>
              Batal
            </Button>
            <Button type='submit' variant="solid" colorPalette={'blue'} borderRadius={'20px'}>
              {isLoading ? <LoadingButtonLottie /> : "Tambah produk"}
            </Button>
          </Box>
        </Box>
      </Box>
      </form>
    </Box>
  );
}
