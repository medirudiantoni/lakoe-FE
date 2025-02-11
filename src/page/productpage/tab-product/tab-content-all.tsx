import { InputGroup } from '@/components/ui/input-group';
import {
  fetchProduct,
  searchQuery,
} from '@/features/auth/services/product-service';
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
import { DialogDelete } from '../dialog-product/dialog-delete';
import SortingDropdown from '../component-product/sorting';

export function TabContentAll() {
  const { user } = useAuthStore();
  const { products, setProducts, updateProductStatus } = useProductStore();
  const { selectedProducts, toggleProductSelection } = useCheckboxStore();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

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

      const searchResults = await searchQuery(query, token);
      console.log("searchResult: ", searchResults);
      setProducts(Array.isArray(searchResults) ? searchResults : []);
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
            />
          </InputGroup>
          <Box position="absolute" top={2} left={4}>
            <PackageSearch color="#75757C" />
          </Box>
        </GridItem>
        <GridItem>
          <Category />
        </GridItem>
        <GridItem>
          <SortingDropdown />
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
        products?.map((product) => {
          return (
            <ProductCardDashboard
              key={product.id}
              product={product}
              selectedProducts={selectedProducts}
              toggleProductSelection={toggleProductSelection}
              updateProductStatus={updateProductStatus}
            />
          );
        })
      )}
    </Box>
  );
}
