import { Field } from '@/components/ui/field';
import {
  Box,
  Button,
  Group,
  Image,
  Input,
  InputAddon,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import LoadingButtonLottie from '@/components/icons/loading-button';
import { addProduct } from '@/features/auth/services/product-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useCategoryStore } from '@/features/auth/store/category-store';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { CirclePlus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import CategoryDropdown from './component-product/category-detail-product';

const addproductSchema = z.object({
  name: z.string().min(3, 'Nama product harus diisi'),
  description: z.string().min(50, 'Deskripsi harus diisi'),
  url: z.string().min(5, 'Url produk harus diisi'),
  minimumOrder: z.string().min(1, 'Tentukan minimal pesanan'),
  price: z.string().min(4, 'Harga produk harus diisi'),
  sku: z.string().min(4, 'Stock Keeping Unit harus diisi'),
  stock: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 1, {
      message: 'Stock produk harus minimal 1',
    }),
  weight: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 1, {
      message: 'Berat produk harus minimal 1 gram',
    }),
  attachments: z
    .array(z.instanceof(File)) // Cek apakah ini array of File
    .min(1, 'Silakan unggah minimal satu foto produk!'),
});

type ProductFormInputs = z.infer<typeof addproductSchema>;

export function AddProductContent() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    fetchCategories,
    selectedCategoryId,
  } = useCategoryStore();

  const [previewImages, setPreviewImages] = useState<string[]>(
    Array(5).fill('')
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(addproductSchema),
    defaultValues: { attachments: [] },
  });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Update preview images
      const newPreviewImages = [...previewImages];
      newPreviewImages[index] = URL.createObjectURL(files[0]); // Preview gambar
      setPreviewImages(newPreviewImages);

      // Update attachments
      const currentAttachments = (watch('attachments') || []) as File[];
      const newAttachments = [...currentAttachments];
      newAttachments[index] = files[0]; // Simpan file asli
      setValue('attachments', newAttachments.filter(Boolean)); // Hapus undefined/null

      console.log('Attachments setelah perubahan:', watch('attachments'));
    }
  };
  const handleRemoveImage = (index: number) => {
    // Hapus preview image
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1); // Hapus foto pada posisi index
    setPreviewImages(newPreviewImages);

    // Hapus attachment file
    const currentAttachments = (watch('attachments') || []) as File[];
    const newAttachments = [...currentAttachments];
    newAttachments.splice(index, 1); // Hapus file pada posisi index
    setValue('attachments', newAttachments); // Set array tanpa undefined

    console.log('Attachments setelah penghapusan:', watch('attachments'));
  };

  const onSubmit = async (data: ProductFormInputs) => {
    setIsLoading(true);

    if (!selectedCategoryId) {
      toast.error('Pilih kategori terlebih dahulu!');
      setIsLoading(false);
      return;
    }

    if (!data.attachments || data.attachments.length === 0) {
      setError('attachments', {
        type: 'manual',
        message: 'Silakan unggah minimal satu foto produk!',
      });
      setIsLoading(false);
      return;
    }

    const storeId = user?.Stores?.id;
    const categoryId = selectedCategoryId;

    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('storeId', storeId || '');
    formData.append('price', data.price || '');
    formData.append('categoryId', categoryId);
    formData.append('sku', data.sku || '');
    formData.append('stock', String(Number(data.stock) || 0));
    formData.append('weight', String(Number(data.weight) || 0));
    formData.append('minimumOrder', data.minimumOrder);
    formData.append('url', data.url);

    console.log('Stock (before FormData):', typeof data.stock, data.stock);
    console.log('Weight (before FormData):', typeof data.weight, data.weight);

    data.attachments.forEach((file) => {
      formData.append('attachments', file);
    });

    const token = Cookies.get('token')

    toast
      .promise(
        addProduct(formData, token!),
        {
          loading: 'Sedang menambahkan produk baru...',
          success: (res) => {
            navigate('/product');
            return res.data.message || 'Menambahkan produk berhasil';
          },
          error: (error) => error.message || 'Coba ulang kembali...',
        },
        {
          success: {
            style: {
              background: '#FFFF',
              color: '#1d1d1d',
            },
          },
          error: {
            style: {
              background: '#FFFF',
              color: '#1d1d1d',
            },
          },
        }
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            Informasi Produk
          </Text>
          <Box display={'flex'} flexDirection={'column'} gap={4} mt={5}>
            <Field label="Nama Produk">
              <Input placeholder="Masukan Nama Produk" {...register('name')} />
              {errors.name && (
                <Text
                  color={'red.500'}
                  fontSize={'xs'}
                  textAlign={'left'}
                  marginTop={'1.5'}
                >
                  {errors.name.message}
                </Text>
              )}
            </Field>
            <Field label="URL Halaman Checkout">
              <Group attached width={'full'}>
                <InputAddon>lakoe.store/</InputAddon>
                <Input placeholder="nama-produk" {...register('url')} />
                {errors.url && <Text>{errors.url.message}</Text>}
              </Group>
            </Field>
            <Field label="Kategori" position={'relative'}>
              <CategoryDropdown />
            </Field>
          </Box>
        </Box>
        <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            Detail Produk
          </Text>
          <Box display={'flex'} flexDirection={'column'} gap={4} mt={5}>
            <Field label="Deskripsi">
              <Textarea
                placeholder="Masukan informasi lebih lengkap tentang produk kamu"
                h={40}
                {...register('description')}
              />
              {errors.description && (
                <Text
                  color="red.500"
                  fontSize={'xs'}
                  textAlign={'left'}
                  marginTop={'1.5'}
                >
                  {errors.description.message}
                </Text>
              )}
            </Field>
            <Box>
              <Field label="Foto Produk" mb={2}></Field>
              <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <VStack
                    key={index}
                    border="2px dashed gray"
                    borderRadius="md"
                    width="full"
                    height="180px"
                    align="center"
                    justify="center"
                    position="relative"
                    overflow="hidden"
                    cursor="pointer"
                    onClick={() =>
                      document.getElementById(`file-upload-${index}`)?.click()
                    } // Klik untuk upload
                  >
                    {previewImages[index] ? (
                      <>
                        {/* Tampilkan gambar */}
                        <Image
                          src={previewImages[index]}
                          alt={`Foto ${index + 1}`}
                          boxSize="full"
                          objectFit="cover"
                        />
                        {/* Tombol hapus gambar */}
                        <Box
                          position="absolute"
                          top="2"
                          right="2"
                          bg="red.500"
                          color="white"
                          borderRadius="4px"
                          width="20px"
                          height="20px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontWeight="bold"
                          cursor="pointer"
                          _hover={{ bg: 'red.600' }}
                          p={1}
                          onClick={(e) => {
                            e.stopPropagation(); // Mencegah trigger upload saat tombol hapus diklik
                            handleRemoveImage(index);
                          }}
                        >
                          <X />
                        </Box>
                      </>
                    ) : (
                      <>
                        {/* Placeholder untuk upload */}
                        <Text fontSize="sm" color="gray.500">
                          {index === 0 ? 'Foto Utama' : `Foto ${index + 1}`}
                        </Text>
                      </>
                    )}
                    <Input
                      id={`file-upload-${index}`}
                      type="file"
                      accept="image/*"
                      display="none"
                      onChange={(e) => handleFileChange(e, index)}
                    />
                  </VStack>
                ))}
              </Box>
            </Box>
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
                Tambah varian agar pembeli dapat memilih produk yang sesuai,
                yuk!
              </Text>
            </Box>
            <Link to="/add-product">
              <Button variant={'outline'} borderRadius={'50px'}>
                <CirclePlus />
                <span className="ms-2">Tambahkan Variant</span>
              </Button>
            </Link>
          </Box>
          
          {/* Variant */}
          {/* <Box display={'flex'} gap={3} mt={3}>
            <Button
              colorPalette={'cyan'}
              variant="surface"
              borderRadius={'20px'}
            >
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
            <Button
              variant={'solid'}
              colorPalette={'blue'}
              borderRadius={'50px'}
            >
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
                <Input
                  placeholder="Masukan harga barang"
              
                />
          
              </Group>
            </Field>
            <Field label="Stock Produk" mt={5} width={'45%'}>
              <Input
                placeholder="Masukan jumlah stock"
                {...register('stock')}
                type="number"
              />
              {errors.stock && (
                <Text
                  color={'red.500'}
                  fontSize={'xs'}
                  textAlign={'left'}
                  marginTop={'1.5'}
                >
                  {errors.stock.message}
                </Text>
              )}
            </Field>
          </Box>
          <Box display={'flex'} gap={'3'}>
            <Field label="SKU(Stock Keeping)" mt={5} width={'55%'}>
              <Input placeholder="Masukan SKU" {...register('sku')} />
              {errors.sku && (
                <Text
                  color={'red.500'}
                  fontSize={'xs'}
                  textAlign={'left'}
                  marginTop={'1.5'}
                >
                  {errors.sku.message}
                </Text>
              )}
            </Field>
            <Field label="Berat Produk" mt={5} width={'45%'}>
              <Group attached width={'full'}>
                <Input placeholder="Masukan berat produk" />
                <InputAddon>Gram</InputAddon>
              </Group>
            </Field>
          </Box> */}
          {/* Variant  */}
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
          <Field label="Harga" mt={5}>
            <Group attached width={'full'}>
              <InputAddon>Rp</InputAddon>
              <Input
                placeholder="Masukan harga satuan barang"
                {...register('price')}
              />
              {errors.price && (
                <Text
                  color={'red.500'}
                  fontSize={'xs'}
                  textAlign={'left'}
                  marginTop={'1.5'}
                >
                  {errors.price.message}
                </Text>
              )}
            </Group>
          </Field>

          <Field label="Minimal pembelian" mt={3}>
            <Group attached width={'full'}>
              <Input placeholder="1" {...register('minimumOrder')} />
              {errors.minimumOrder && (
                <Text
                  color={'red.500'}
                  fontSize={'xs'}
                  textAlign={'left'}
                  marginTop={'1.5'}
                >
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
            <Field label="Stok Produk" mt={5}>
              <Input placeholder="Masukan stok barang" {...register('stock')}/>
              {errors.stock && (
                <Text
                color={'red.500'}
                fontSize={'xs'}
                textAlign={'left'}
                marginTop={'1.5'}
                >
                  {errors.stock.message}
                </Text>
              )}
            </Field>
            <Field label="SKU (Stock Keeping Unit)" mt={5}>
              <Input placeholder="Masukan SKU" {...register('sku')} />
              {errors.sku && (
                <Text
                  color={'red.500'}
                  fontSize={'xs'}
                  textAlign={'left'}
                  marginTop={'1.5'}
                >
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
          <Field label="Berat Produk" mt={5}>
            <Group attached width={'full'}>
              <Input
                placeholder="Masukan berat produk"
                {...register('weight')}
                type="number"
              />
              {errors.weight && (
                <Text
                  color={'red.500'}
                  fontSize={'xs'}
                  textAlign={'left'}
                  marginTop={'1.5'}
                >
                  {errors.weight.message}
                </Text>
              )}
              <InputAddon>gram</InputAddon>
            </Group>
          </Field>
          <Box display={'flex'} alignItems={'end'} gap={3} mt={3}>
            <Field label="Ukuran Produk">
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
              <Button
                type="submit"
                variant="solid"
                colorPalette={'blue'}
                borderRadius={'20px'}
              >
                {isLoading ? <LoadingButtonLottie /> : 'Tambah produk'}
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
