import { InputGroup } from '@/components/ui/input-group';
import { fetchProduct } from '@/features/auth/services/product-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useCheckboxStore } from '@/features/auth/store/product-store';
import { useProductStore } from '@/features/auth/store/toggle-active-product.store';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Input,
  Text
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { PackageSearch } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Category from '../component-product/category';
import SelectAllCheckbox from '../component-product/checkbox';
import ProductCardDashboard from '../component-product/product-card-dashboard';
import SortingDropdown from '../component-product/sorting';
import { DialogDelete } from '../dialog-product/dialog-delete';

export function TabContentNonActive() {
  const { user } = useAuthStore();
  const { products, setProducts, updateProductStatus } = useProductStore();
  const { selectedProducts, toggleProductSelection } = useCheckboxStore();
  const [isFetching, setIsFetching] = useState(true);
  const storeId = user?.Stores?.id;
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
          <SelectAllCheckbox allProductIds={products?.map((p) => p.id) || []} />
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
          <ProductCardDashboard
            key={product.id}
            product={product}
            selectedProducts={selectedProducts}
            toggleProductSelection={toggleProductSelection}
            updateProductStatus={updateProductStatus}
          />
        ))
      )}
    </Box>
  );
}
