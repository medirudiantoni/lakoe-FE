import { InputGroup } from '@/components/ui/input-group';
import { fetchProduct } from '@/features/auth/services/product-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useProductStore } from '@/features/auth/store/toggle-active-product.store';
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
import Cookies from 'js-cookie';
import { Link2, PackageSearch } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import Category from '../component-product/category';
import SortingDropdown from '../component-product/Sorting';
import ProductToggleSwitch from '../component-product/switch-status';
import { DialogPrice } from '../dialog-product/dialog-price';
import { DialogStock } from '../dialog-product/dialog-stock';
import { formatRupiah } from '@/lib/rupiah';
import SelectAllCheckbox from '../component-product/checkbox';
import CheckBox from '../component-product/checkbox-product';
import { useCheckboxStore } from '@/features/auth/store/product-store';
import { DialogDelete } from '../dialog-product/dialog-delete';

export function TabContentNonActive() {
  const { user } = useAuthStore();
  const { products, setProducts, updateProductStatus } = useProductStore();
  const { selectedProducts, toggleProductSelection } = useCheckboxStore();
  const [isFetching, setIsFetching] = useState(true);
  const storeId = user?.Stores.id;
  const isAnyProductSelected = selectedProducts.length > 0;

  useEffect(() => {
    const token = Cookies.get('token');

    if (storeId && token) {
      fetchProduct(storeId, token)
        .then((data) => {
          setProducts(data);
        })
        .catch(() => {
          toast.error('Gagal mengambil data produk.');
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [storeId, setProducts]);

  if (isFetching) {
    return <Text>Loading...</Text>;
  }
  const nonActiveProducts =
    products?.filter((product) => !product.isActive) || [];

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
      <Flex justifyContent={'space-between'} alignItems={'center'} mt={3} >
        <Text color={'gray.400'}>{nonActiveProducts.length} Produk</Text>
        <Box display={'flex'} alignItems={'center'} gap={2} color={'#75757C'}>
          {isAnyProductSelected && (
          <DialogDelete />
          )}
          <SelectAllCheckbox allProductIds={products?.map((p) => p.id) || []}/>
        </Box>
      </Flex>
      {nonActiveProducts.length === 0 ? (
        <Box
          width="full"
          border="1px solid"
          borderColor="gray.200"
          height="150px"
          borderRadius="10px"
          mt={3}
          display="flex"
          justifyContent={'center'}
          alignItems="center"
          p={3}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}
          >
            <PackageSearch size={'85px'} color="#75757C" />
            <Box ml={2}>
              <Text fontWeight={''} fontSize={'24px'} mt={'-10px'}>
                Tidak ada produk tidak aktif
              </Text>
              <Text fontSize={'14px'} color={'gray.500'}>
                Semua produk sudah aktif.
              </Text>
            </Box>
          </Box>
        </Box>
      ) : (
        nonActiveProducts.map((product) => (
          <Box
            key={product.id}
            width="full"
            border="1px solid"
            borderColor="gray.200"
            height="170px"
            borderRadius="10px"
            mt={3}
            display="flex"
            justifyContent={'space-between'}
            px={3}
            py={4}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Image
                src={String(product.attachments)}
                width={40}
                height={36}
                borderRadius="20px"
                p={3}
                mr={3}
              />
              <Box>
                <Text fontSize="18px" fontWeight="bold">
                  {product.name}
                </Text>
                <Flex fontSize="14px" fontWeight="normal" mt={1}>
                  <Text fontWeight={'semibold'}>
                    Harga: {formatRupiah(`${product.price}`)}{' '}
                  </Text>
                  <Text color={'gray.500'} ml={1}>
                    • Stok: {product.stock} • SKU: {product.sku}
                  </Text>
                </Flex>
                <Box display={'flex'} gap={2}>
                <DialogPrice productId={product.id} />
                <DialogStock productId={product.id}/>
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
              <CheckBox
                checked={selectedProducts.includes(product.id)}
                onCheckedChange={() => toggleProductSelection(product.id)}
              />
              <ProductToggleSwitch
                key={product.id}
                productId={product.id}
                initialStatus={product.isActive}
                onStatusChange={updateProductStatus}
              />
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}
