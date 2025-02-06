import LoadingButtonLottie from '@/components/icons/loading-button';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb';
import { Field } from '@/components/ui/field';
import {
  fetchProduct,
  updateProduct,
} from '@/features/auth/services/product-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useCategoryStore } from '@/features/auth/store/category-store';
import { ProductType } from '@/features/auth/types/product-type';
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
import Cookies from 'js-cookie';
import { CirclePlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import CategoryDropdown from './component-product/category-detail-product';
import { Variant } from './add-product-component/sub-variant';
export function Detailproduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductType>();

  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [fetching, setIsFetching] = useState(false);
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchCategories, selectedCategoryId } = useCategoryStore();
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>(
    Array(5).fill('')
  );
  const navigate = useNavigate();

  const storeId = user?.Stores.id;
  useEffect(() => {
    const token = Cookies.get('token');
    if (storeId && token) {
      setIsFetching(true);
      fetchProduct(storeId, token)
        .then((data) => {
          setProducts(data);
        })
        .catch(() => toast.error('Gagal mengambil data produk'))
        .finally(() => setIsFetching(false));
    }
  }, [storeId]);

  const product = products.find((product) => product.id === id);

  useEffect(() => {
    if (product) {
      setValue('name', product.name || '');
      setValue('url', product.url || '');
      setValue('description', product.description || '');
      setValue('price', product.price || 0);
      setValue('stock', product.stock || 0);
      setValue('sku', product.sku || '');
      setValue('weight', product.weight || 0);
      setValue('minimumOrder', product.minimumOrder || '');
      setValue('categoryId', product.categoryId || '');

      if (product.attachments && Array.isArray(product.attachments)) {
        // Mengonversi URL menjadi File agar bisa diproses
        Promise.all(
          product.attachments.map(async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new File([blob], url.split('/').pop() || 'image.jpg', {
              type: blob.type,
            });
          })
        )
          .then((files: File[]) => {
            setSelectedFiles(files);
            setPreviewImages(files.map((file) => URL.createObjectURL(file)));
          })
          .catch((error) => {
            console.error('Gagal memuat lampiran:', error);
          });
      }
    }
  }, [product, setValue]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    console.log('Products:', products);
    console.log('ID:', id);
    console.log('Product:', product);
  }, [products, id, product]);

  // const onSubmit = async (data: ProductType) => {
  //   if (!product) {
  //     toast.error('Product ID tidak ditemukan');
  //     return;
  //   }
  
  //   setIsLoading(true);
  //   const storeId = user?.Stores?.id;
  //   const categoryId = selectedCategoryId;
  
  //   const formData = new FormData();
  //   formData.append('name', data.name);
  //   formData.append('url', data.url);
  //   formData.append('description', data.description);
  //   formData.append('price', data.price!.toString());
  //   formData.append('stock', data.stock!.toString());
  //   formData.append('sku', data.sku!.toString());
  //   formData.append('weight', data.weight!.toString());
  //   formData.append('minimumOrder', data.minimumOrder!.toString());
  
  //   if (storeId) {
  //     formData.append('storeId', storeId);
  //   }
  //   if (categoryId) {
  //     formData.append('categoryId', categoryId);
  //   }
  
  //   console.log('Selected Files sebelum submit:', selectedFiles);
  //   let allAttachments: (File | string)[] = [];

  //   // Pastikan product.attachments tidak undefined/null
  //   if (product.attachments && Array.isArray(product.attachments)) {
  //     allAttachments = [...product.attachments];
  //   }
    
  //   // Pastikan selectedFiles tidak null sebelum spread
  //   if (selectedFiles && selectedFiles.length > 0) {
  //     allAttachments = [...selectedFiles];
  //   }
    
  //   // Pastikan attachments tetap ada jika tidak ada file baru
  //   allAttachments.forEach((attachment) => {
  //     if (attachment instanceof File) {
  //       formData.append('attachments', attachment);
  //     } else {
  //       formData.append('existingAttachments', attachment); // Kirim URL gambar lama ke backend
  //     }
  //   });
    
  
  //   toast
  //     .promise(
  //       updateProduct(formData, product.id)
  //         .then((response) => {
  //           setProducts(response.data);
  //           navigate('/product');
  //         })
  //         .catch((error) => {
  //           throw error;
  //         }),
  //       {
  //         loading: 'Memperbarui Produk...',
  //         success: 'Produk berhasil diperbarui',
  //         error: 'Gagal memperbarui produk',
  //       }
  //     )
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };
  

  // const handleFileChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     const newFile = files[0];

  //     const newPreviewImages = [...previewImages];
  //     newPreviewImages[index] = URL.createObjectURL(newFile);
  //     setPreviewImages(newPreviewImages);

  //     const newFiles = selectedFiles ? [...selectedFiles] : [];
  //     newFiles[index] = newFile;
  //     setSelectedFiles(newFiles);
  //   }
  // };

  // const handleRemoveImage = (index: number) => {
  //   const newPreviewImages = [...previewImages];
  //   newPreviewImages[index] = '';
  //   setPreviewImages(newPreviewImages);

  //   if (selectedFiles) {
  //     const newFiles = [...selectedFiles];
  //     newFiles.splice(index, 1);
  //     setSelectedFiles(newFiles);
  //   }
  // };

const onSubmit = async (data: ProductType) => {
  if (!product) {
    toast.error('Product ID tidak ditemukan');
    return;
  }

  setIsLoading(true);
  const storeId = user?.Stores?.id;
  const categoryId = selectedCategoryId;

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('url', data.url);
  formData.append('description', data.description);
  formData.append('price', data.price!.toString());
  formData.append('stock', data.stock!.toString());
  formData.append('sku', data.sku!.toString());
  formData.append('weight', data.weight!.toString());
  formData.append('minimumOrder', data.minimumOrder!.toString());

  if (storeId) {
    formData.append('storeId', storeId);
  }
  if (categoryId) {
    formData.append('categoryId', categoryId);
  }

  console.log('Selected Files sebelum submit:', selectedFiles);
  let allAttachments: (File | string)[] = [];

  // Gabungkan gambar lama
  if (product.attachments && Array.isArray(product.attachments)) {
    allAttachments = [...product.attachments];
  }

  // Gabungkan gambar baru jika ada
  if (selectedFiles && selectedFiles.length > 0) {
    allAttachments = [...allAttachments, ...selectedFiles]; // Gabungkan dengan gambar baru
  }

  // Tambahkan ke formData
  allAttachments.forEach((attachments) => {
    if (attachments instanceof File) {
      formData.append('attachments', attachments); // Tambahkan gambar baru
    } else {
      formData.append('existingAttachments', attachments); // Kirim URL gambar lama ke backend
    }
  });

  console.log('allattachments:', allAttachments)
  toast
    .promise(
      updateProduct(formData, product.id)
        .then((response) => {
          setProducts(response.data);
          navigate('/product');
        })
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Memperbarui Produk...',
        success: 'Produk berhasil diperbarui',
        error: 'Gagal memperbarui produk',
      }
    )
    .finally(() => {
      setIsLoading(false);
    });
};

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFile = files[0];
  
      const newPreviewImages = [...previewImages];
      newPreviewImages[index] = URL.createObjectURL(newFile);
      setPreviewImages(newPreviewImages);
  
      const newFiles = selectedFiles ? [...selectedFiles] : [];
      newFiles[index] = newFile;
      setSelectedFiles(newFiles);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages[index] = '';
    setPreviewImages(newPreviewImages);
  
    if (selectedFiles) {
      const newFiles = [...selectedFiles];
      newFiles.splice(index, 1);
      setSelectedFiles(newFiles);
    }
  };
  
  return (
    <Box>
      <BreadcrumbRoot p={3} m={4} pb={0}>
        <BreadcrumbLink>
          <Link to="/product" className="text-blue-400">
            Daftar Produk
          </Link>
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>{product?.name}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text fontSize={'24px'} fontWeight={'bold'}>
              Informasi Produk
            </Text>
            <Box textAlign="right" mt={10}>
              <Button
                onClick={toggleEdit}
                colorPalette={isEditing ? 'red' : 'blue'}
              >
                {isEditing ? 'Batal' : 'Edit'}
              </Button>
              {isEditing && (
                <Button colorPalette="blue" type="submit" disabled={isLoading}>
                  {isLoading ? <LoadingButtonLottie /> : 'Perbarui'}
                </Button>
              )}
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={4} mt={5}>
            <Field label="Nama Produk">
              <Input
                {...register('name')}
                placeholder="Masukkan Nama Produk"
                disabled={!isEditing}
              />
            </Field>
            <Field label="URL Halaman Checkout">
              <Group attached width={'full'}>
                <InputAddon>lakoe.store/</InputAddon>
                <Input
                  {...register('url')}
                  placeholder="nama-produk"
                  disabled={!isEditing}
                />
              </Group>
            </Field>
            <Field label="Kategori" position={'relative'}>
              <CategoryDropdown
                selectedCategoryId={watch('categoryId')}
                setSelectedCategoryId={(field, value) =>
                  setValue(field as 'categoryId', value)
                }
              />
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
                {...register('description')}
                placeholder="Masukan informasi lebih lengkap tentang produk kamu"
                h={40}
                disabled={!isEditing}
              />
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
                    }
                  >
                    {previewImages[index] ? (
                      <>
                        <Image
                          src={previewImages[index]}
                          alt={`Foto ${index + 1}`}
                          boxSize="full"
                          objectFit="cover"
                        />
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
        <Variant/>
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
                {...register('price')}
                placeholder="Masukan harga satuan barang"
                disabled={!isEditing}
              />
            </Group>
          </Field>

          <Field label="Minimal pembelian" mt={3}>
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
            <Field label="Stok Produk" mt={5}>
              <Input
                {...register('stock')}
                disabled={!isEditing}
                placeholder="Masukan stok barang"
              />
            </Field>
            <Field label="SKU (Stock Keeping Unit)" mt={5}>
              <Input
                {...register('sku')}
                disabled={!isEditing}
                placeholder="Masukan SKU"
              />
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
                {...register('weight')}
                disabled={!isEditing}
                placeholder="Masukan berat produk"
              />
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
      </form>
      <Box
        p={3}
        m={4}
        backgroundColor={'white'}
        borderRadius={10}
        display={'flex'}
        flexDirection={'column'}
      ></Box>
    </Box>
  );
}
