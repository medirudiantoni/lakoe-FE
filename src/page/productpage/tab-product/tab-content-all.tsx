import { InputGroup } from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { Link2, PackageSearch, UndoIcon } from 'lucide-react';
import CheckBox from '../component-product/checkbox';
import products from '@/data-dummy/products.json';
import { Link } from 'react-router';
import Category from '../component-product/category';
import SortingDropdown from '../component-product/Sorting';
import { DialogDelete } from '../dialog-product/dialog-delete';
import { DialogNonaktif } from '../dialog-product/dialog-nonaktif';
import { DialogPrice } from '../dialog-product/dialog-price';
import { DialogStock } from '../dialog-product/dialog-stock';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { fetchLogin } from '@/features/auth/services/auth-service';
import { fetchProduct } from '@/features/auth/services/product-service';
import { StoreFormProps } from '@/features/auth/types/store-types';
import toast from 'react-hot-toast';
import { ProductType } from '@/features/auth/types/product-type';

export function TabContentAll()  {
  const { user } = useAuthStore();
  const [storeData, setStoreData] = useState<ProductType[] | null>(null); // Awalnya null
  const [isFetching, setIsFetching] = useState(true); 
  const storeId = user?.Stores.id;

  useEffect(() => {
    const token = Cookies.get('token');

    if (storeId && token) {
      fetchProduct(storeId, token)
        .then((data) => {
          setStoreData(data); 
          console.log('cek:', data)
        })
        .catch(() => {
          toast.error('Gagal mengambil data produk.');
        })
        .finally(() => {
          setIsFetching(false); // Mengubah status fetching setelah selesai
        });
    }
  }, [storeId]);

  if (isFetching) {
    return <Text>Loading...</Text>; // Tampilkan loading saat fetching
  }

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" width={'100%'} gap={2}>
        <GridItem position={'relative'}>
          <InputGroup flex="1" width={'100%'}>
            <Input px={11} placeholder="Search produk" outline={'#0086B4'} />
          </InputGroup>
          <Box position={'absolute'} top={2} left={4}>
            <PackageSearch color="#75757C" />
          </Box>
        </GridItem>
        <GridItem>
          <Box position={'relative'}>
            <Category />
          </Box>
        </GridItem>
        <GridItem>
          <Box position={'relative'}>
            <SortingDropdown />
          </Box>
        </GridItem>
      </Grid>
      <Flex justifyContent={'space-between'} alignItems={'center'} mt={3}>
        <Text color={'gray.400'}>{storeData?.length} Produk</Text>
        <Box display={'flex'} alignItems={'center'} gap={2} color={'#75757C'}>
          <DialogDelete />
          <DialogNonaktif />
          <CheckBox display="block" />
        </Box>
      </Flex>
      {storeData?.map((product) => (
        <Box
          key={product.id} // Tambahkan key untuk setiap item dalam list
          width="full"
          border="1px solid"
          borderColor="gray.200"
          height="150px"
          borderRadius="10px"
          mt={3}
          display="flex"
          justifyContent={'space-between'}
          p={3}
        >
          <Box display={'flex'} alignItems={'center'}>
            <Image
              src={String(product.attachments)}
              width={36}
              height={36}
              borderRadius="20px"
              p={3}
              mr={3}
            />
            <Box>
              <Text fontSize="20px" fontWeight="bold">
                {product.name}
              </Text>
              <Flex fontSize="14px" fontWeight="normal" mt={1}>
                <Text fontWeight={'semibold'}>Harga: {product.price} </Text>
                <Text color={'gray.500'} ml={1}>
                  • Stok: {product.stock} • SKU: {product.sku}
                </Text>
              </Flex>
              <Box display={'flex'} gap={2}>
                <DialogPrice />
                <DialogStock />
                <Link to={`/product-detail/${product.id}`}>
                  <Button variant={'outline'} mt={4} borderRadius={'20px'}>
                    <Link2 />
                    Lihat halaman
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            alignItems={'end'}
          >
            <CheckBox display={'none'} />
            <Switch
              colorPalette={'blue'}
              defaultChecked={product.isActive}
              size={'lg'}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};