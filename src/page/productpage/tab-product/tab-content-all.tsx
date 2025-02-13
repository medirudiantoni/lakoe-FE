import { InputGroup } from '@/components/ui/input-group';
import {
  fetchProduct,
  fetchProductsBySelectedCategory,
  searchQuery,
  sortQuery,
} from '@/features/auth/services/product-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useCheckboxStore } from '@/features/auth/store/product-store';
import { useProductStore } from '@/features/auth/store/toggle-active-product.store';
import {
  Box,
  Center,
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
import { DialogDelete } from '../dialog-product/dialog-delete';
import SortingDropdown from '../component-product/sorting';
import { ProductType } from '@/features/auth/types/prisma-types';

export function TabContentAll() {
  const { user } = useAuthStore();
  const { products, setProducts, updateProductStatus } = useProductStore();
  const { selectedProducts, toggleProductSelection } = useCheckboxStore();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [productsToDisplay, setProductsToDisplay] = useState<ProductType[]>([]);
  const [sortValue, setSortValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    restoreProductAfterSearch();
  }, [products]);

  function restoreProductAfterSearch(){
    if(products && query.length === 0)
      setProductsToDisplay(products)
  }

  useEffect(() => {
    if(sortValue)
      retrieveSortValue();
  }, [sortValue]);

  function retrieveSortValue(){
    if(storeId)
    sortQuery(sortValue, storeId)
      .then(res => setProductsToDisplay(res))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    if(selectedCategories.length > 0)
      retrieveSelectedCategories()
    else 
      if(products)
      setProductsToDisplay(products)
  }, [selectedCategories]);

  function retrieveSelectedCategories(){
    if(storeId)
      fetchProductsBySelectedCategory(selectedCategories, storeId)
        .then(res => setProductsToDisplay(res))
        .catch(error => console.log(error))
  }

  const storeId = user?.Stores?.id;
  const isAnyProductSelected = selectedProducts.length > 0;

  useEffect(() => {
    const token = Cookies.get('token')
    if (storeId && token) {
      fetchProduct(storeId, token)
        .then(setProducts)
        .catch(() => toast.error('Gagal mengambil data produk'))
        .finally(() => setIsFetching(false))
    }
  }, [storeId, setProducts])

  useEffect(() => {
    if (!query) return;

    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const token = Cookies.get('token');
      if (!storeId || !token || !query) return;

      const searchResults = await searchQuery(query, token, storeId);
      console.log("searchResult: ", searchResults);
      // setProducts(Array.isArray(searchResults) ? searchResults : []);
      setProductsToDisplay(searchResults);
    } catch (err: any) {
      console.error('Search error:', err);
      toast.error(err.response?.data?.message || 'Error searching products.');
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) return <Text>Loading...</Text>;

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" width="100%" gap={2}>
        <GridItem position="relative">
          <InputGroup flex="1" width="100%">
            <Input
              px={11}
              placeholder="Search produk"
              outline="#0086B4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={restoreProductAfterSearch}
            />
          </InputGroup>
          <Box position="absolute" top={2} left={4}>
            <PackageSearch color="#75757C" />
          </Box>
        </GridItem>
        <GridItem>
          <Category onChangeData={setSelectedCategories} />
        </GridItem>
        <GridItem>
          <SortingDropdown onChangeSortValue={setSortValue} />
        </GridItem>
      </Grid>
      <Flex justifyContent="space-between" alignItems="center" mt={3}>
        <Text color="gray.400">{products?.length} Produk</Text>
        <Box display="flex" alignItems="center" gap={2} color="#75757C">
          {isAnyProductSelected && <DialogDelete />}
          <SelectAllCheckbox allProductIds={products?.map((p) => p.id) || []} />
        </Box>
      </Flex>

      {loading ? (
        <Text>Searching...</Text>
      ) : (
        productsToDisplay.length > 0 ? productsToDisplay.map((product) => {
          return (
            <ProductCardDashboard
              key={product.id}
              product={product}
              selectedProducts={selectedProducts}
              toggleProductSelection={toggleProductSelection}
              updateProductStatus={updateProductStatus}
            />
          );
        }) : (
          <Center>
            <Text color={"gray.500"}>Produk kosong</Text>
          </Center>
        )
      )}
    </Box>
  );
}
