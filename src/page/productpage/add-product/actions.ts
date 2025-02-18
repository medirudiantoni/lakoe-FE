import toast from 'react-hot-toast';
import { ProductFormInputs } from './schema';
import Cookies from 'js-cookie';
import { addNewProduct, updateProductById } from '@/features/auth/services/product-service';
import { VariantType } from '@/features/auth/types/prisma-types';
// import { VariantType } from './variant';

export default async function handleSubmitAddProduct(
  variants: VariantType[],
  data: ProductFormInputs,
  selectedCategoryId: string,
  setIsLoading: (state: boolean) => void,
  setError: any,
  storeId: string,
  navigate: any,
  productId?: string,
  attachmentsUrl?: string[]
) {
  setIsLoading(true);
  console.log("executed 2")

  if (!selectedCategoryId) {
    toast.error('Pilih kategori terlebih dahulu!');
    setIsLoading(false);
    return;
  }

  if (!productId && !data.attachments || data.attachments?.length === 0) {
    setError('attachments', {
      type: 'manual',
      message: 'Silakan unggah minimal satu foto produk!',
    });
    setIsLoading(false);
    return;
  }

  //   const storeId = user?.stores?.id;
  const categoryId = selectedCategoryId;

  const variante = JSON.stringify(variants);

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('minimumOrder', data.minimumOrder);
  formData.append('url', data.url);
  formData.append('storeId', storeId || '');
  formData.append('categoryId', categoryId);
  formData.append('variants', variante);

  if(productId){
    formData.append('attachmentsUrl', JSON.stringify(attachmentsUrl))
  }

  if (data.size) {
    formData.append('size', JSON.stringify(data.size));
  } else {
    formData.append('size', JSON.stringify(null));
  }

  data.attachments?.forEach((file) => {
    formData.append('attachments', file);
  });

  // console.log(formData);
  const token = Cookies.get('token');

  console.log("form data: ", formData)

  toast
    .promise( productId ? updateProductById(formData, productId) : addNewProduct(formData, token!),
      {
        loading: 'Sedang menambahkan produk baru...',
        success: (res) => {
          navigate('/product');
          console.log('cek ini: ', res);
          // return res.data.message || 'Menambahkan produk berhasil';
          return 'Menambahkan produk berhasil';
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
}

export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  index: number,
  setPreviewImages: any,
  previewImages: any,
  watch: any,
  setValue: any
) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const newPreviewImages = [...previewImages];
    newPreviewImages[index] = URL.createObjectURL(files[0]);
    setPreviewImages(newPreviewImages);

    const currentAttachments = (watch('attachments') || []) as File[];
    const newAttachments = [...currentAttachments];
    newAttachments[index] = files[0];
    setValue('attachments', newAttachments.filter(Boolean));
    console.log('Attachments setelah perubahan:', watch('attachments'));
  }
};

export const handleRemoveImage = (
  index: number,
  setPreviewImages: any,
  previewImages: any,
  watch: any,
  setValue: any
) => {
  const newPreviewImages = [...previewImages];
  newPreviewImages.splice(index, 1);
  setPreviewImages(newPreviewImages);

  const currentAttachments = (watch('attachments') || []) as File[];
  const newAttachments = [...currentAttachments];
  newAttachments.splice(index, 1);
  setValue('attachments', newAttachments);

  console.log('Attachments setelah penghapusan:', watch('attachments'));
};
