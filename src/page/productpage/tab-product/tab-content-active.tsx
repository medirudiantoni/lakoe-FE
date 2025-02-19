import { InputGroup } from '@/components/ui/input-group';
import {
  fetchProduct,
  fetchProductsBySelectedCategory,
  sortQuery,
} from '@/features/auth/services/product-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useProductStore } from '@/features/auth/store/toggle-active-product.store';
import { Box, Flex, Grid, GridItem, Input, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { PackageSearch } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Category from '../component-product/category';

import { useCheckboxStore } from '@/features/auth/store/product-store';
import { ProductType } from '@/features/auth/types/prisma-types';
import SelectAllCheckbox from '../component-product/checkbox';
import ProductCardDashboard from '../component-product/product-card-dashboard';
import SortingDropdown from '../component-product/sorting';
import { DialogDelete } from '../dialog-product/dialog-delete';

export function TabContentActive() {
  const { user } = useAuthStore();
  const { products, setProducts, updateProductStatus } = useProductStore();
  const { selectedProducts, toggleProductSelection } = useCheckboxStore();
  const [isFetching, setIsFetching] = useState(true);
  const [query, setQuery] = useState('');
  const [, setProductsToDisplay] = useState<ProductType[]>([]);
  const [sortValue, setSortValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    restoreProductAfterSearch();
  }, [products]);

  function restoreProductAfterSearch() {
    if (products && query.length === 0) setProductsToDisplay(products);
  }

  useEffect(() => {
    if (sortValue) retrieveSortValue();
  }, [sortValue]);

  function retrieveSortValue() {
    if (storeId)
      sortQuery(sortValue, storeId)
        .then((res) => setProductsToDisplay(res))
        .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (selectedCategories.length > 0) retrieveSelectedCategories();
    else if (products) setProductsToDisplay(products);
  }, [selectedCategories]);

  function retrieveSelectedCategories() {
    if (storeId)
      fetchProductsBySelectedCategory(selectedCategories, storeId)
        .then((res) => setProductsToDisplay(res))
        .catch((error) => console.log(error));
  }

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

  const activeProducts = products?.filter((product) => product.isActive) || [];

  // useEffect(() => {
  //   setProductsToDisplay(activeProducts);
  // }, [activeProducts])

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" width={'100%'} gap={2}>
        <GridItem position={'relative'}>
          <InputGroup flex="1" width={'100%'}>
            <Input
              px={11}
              placeholder="Search produk"
              outline={'#0086B4'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={retrieveSelectedCategories}
            />
          </InputGroup>
          <Box position={'absolute'} top={2} left={4}>
            <PackageSearch color="#75757C" />
          </Box>
        </GridItem>
        <GridItem>
          <Box position={'relative'}>
            <Category onChangeData={setSelectedCategories} />
          </Box>
        </GridItem>
        <GridItem>
          <Box position={'relative'}>
            <SortingDropdown onChangeSortValue={setSortValue} />
          </Box>
        </GridItem>
      </Grid>
      <Flex justifyContent={'space-between'} alignItems={'center'} mt={3}>
        <Text color={'gray.400'}>{activeProducts.length} Produk</Text>
        <Box display={'flex'} alignItems={'center'} gap={2} color={'#75757C'}>
          {isAnyProductSelected && <DialogDelete />}
          <SelectAllCheckbox allProductIds={products?.map((p) => p.id) || []} />
        </Box>
      </Flex>

      {activeProducts.length === 0 ? (
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
              <Text fontSize={'24px'} mt={'-10px'}>
                Tidak ada produk aktif
              </Text>
              <Text fontSize={'14px'} color={'gray.500'}>
                Semua produk sudah dinonaktifkan.
              </Text>
            </Box>
          </Box>
        </Box>
      ) : (
        activeProducts.map((product) => (
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
