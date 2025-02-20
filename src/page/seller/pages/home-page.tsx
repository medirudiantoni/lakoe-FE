// import {
//   PaginationItems,
//   PaginationNextTrigger,
//   PaginationPrevTrigger,
//   PaginationRoot,
// } from '@/components/ui/pagination';
import { fetchProductsByStoreId, searchQuery } from '@/features/auth/services/product-service';
import { ProductType } from '@/features/auth/types/prisma-types';
import { useSellerStore } from '@/hooks/store';
import {
  Box,
  Grid,
  HStack,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import SellerFooter from '../components/footer';
import SellerNavbar from '../components/navbar';
import ProductCard from '../components/product-card';
import { Search } from 'lucide-react';
import Cookies from 'js-cookie';
import LoadingSearchBuyer from '@/components/icons/loading-search-buyer';

interface ProductsResponse {
  products: ProductType[];
  totalPage: number;
}

export default function SellerHomepage() {
  const { pathname } = useLocation();
  const { store } = useSellerStore();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchSectionRef = useRef<HTMLDivElement>(null);
  const [page] = useState<number>(1); // setPage dihapus
  const [searchQueryInput, setSearchQueryInput] = useState<string>('');

  const { data, error, isLoading } = useQuery<ProductsResponse>({
    queryKey: ['products', store?.id, page],
    queryFn: () => fetchProductsByStoreId(String(store?.id), page, 10),
    enabled: !!store?.id && !searchQueryInput, 
  });

  const token = Cookies.get('token')

  const { data: searchData, isLoading: isSearchLoading } = useQuery<ProductType[]>({
    queryKey: ['searchProducts', searchQueryInput, store?.id],
    queryFn: () => searchQuery(searchQueryInput, String(token), String(store?.id)),
    enabled: !!searchQueryInput,
  });



  useEffect(() => {
    console.log('total page: ', data?.totalPage);
    console.log('current page: ', page);
  }, [data, page]);

  useEffect(() => {
    console.log('products by tanstack: ', data);
  }, [data]);

  useEffect(() => {
    if (pathname.includes('/search')) {
      handleFocusSearch();
    }
  }, [pathname]);

  function handleFocusSearch() {
    searchInputRef.current?.focus();
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    console.log('products', store?.products);
  }, [store]);

  return (
    <Box w="full" h="fit" minH="100vh">
      <SellerNavbar onSearch={() => handleFocusSearch()} />
             
 

      {/* Banner start */}
      <VStack
        ref={searchSectionRef}
        px={{ base: '5', lg: '10' }}
        w="full"
        maxW="7xl"
        mx="auto"
        h="fit"
        pt="28" 
        pb="10"
      >
        <Box w="full" aspectRatio="4/1" overflow="hidden" borderRadius={10}>
          {store && (
            <Image
              src={store.bannerAttachment}
              w="full"
              h="full"
              objectFit="cover"
            ></Image>
          )}
        </Box>
      </VStack>
      {/* Banner end */}

      <Box px={'40'} fontSize={'2xl'} fontWeight={'semibold'} mb={4}>
             <Text>Semua Produk</Text>
          </Box>

          <form className="flex-1 mb-10 mx-40" onSubmit={(e) => e.preventDefault()}>
        <HStack position="relative">
          <Search size={20} className="absolute left-3" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQueryInput}
            onChange={(e) => setSearchQueryInput(e.target.value)}
            className="w-full h-full bg-[#FFFF] border border-solid border-gray-200 py-2.5 rounded-lg ps-10 pr-2 placeholder:font-normal outline-none focus:ring-2"
            placeholder="Cari produk"
          />
        </HStack>
      </form>
      {/* Search Input Start */}
      <HStack px={{ base: '5', lg: '10' }} w="full" maxW="7xl" mx="auto">
        
        <HStack w="full" alignItems="stretch" position="relative">
          {/* <Box
            className="peer group"
            w="fit"
            borderRadius="lg"
            px="3"
            bg={'#18181b'}
            color="white"
          >
            <Button variant={'plain'} color={'white'} border={'none'}>
              Kategori
            </Button>
            <CategoryDropDown
              onSelectCategory={setSelectedCategory}
              onSelectSubCategory={setSelectedSubCategory}
              onSelectSubSubCategory={setSelectedSubSubCategory}
            />
          </Box> */}
  

        </HStack>
      </HStack>
      {/* Search Input end */}

      {/* Title, filter, & sort Start */}
      {/* <HStack
        px={{ base: '5', lg: '10' }}
        justifyContent="space-between"
        w="full"
        maxW="7xl"
        mx="auto"
        py="10"
      >
        <HStack alignItems={'end'}>
          <Heading
            size="3xl"
            fontWeight="semibold"
            lineHeight="1"
            className="font-poppins"
          >
            {selectedCategory?.name ? selectedCategory.name : 'Semua Produk'}
          </Heading>
          {selectedSubCategory && (
            <HStack fontWeight="semibold">
              <Text>/</Text>
              <Text>{selectedSubCategory?.name}</Text>
              {selectedSubSubCategory && (
                <>
                  <Text>/</Text>
                  <Text>{selectedSubSubCategory?.name}</Text>
                </>
              )}
            </HStack>
          )}
        </HStack>
        <HStack>
          <HStack role="button" px="4" py="2" borderRadius="lg" bg="gray.200">
            <Text fontWeight="medium">Filter</Text>
            <SlidersHorizontal size="16px" />
          </HStack>
          <Box position="relative">
            <MenuRoot positioning={{ placement: 'bottom', gutter: 4 }}>
              <MenuTrigger asChild>
                <Button
                  px="4"
                  py="2"
                  borderRadius="lg"
                  bg="gray.200"
                  color="black"
                >
                  <Text fontWeight="medium">Sort</Text>
                  <ArrowDownUp size="16px" />
                </Button>
              </MenuTrigger>
              <MenuContent position="absolute" top="12">
                <MenuItem value="new-txt">New Text File</MenuItem>
                <MenuItem value="new-file">New File...</MenuItem>
                <MenuItem value="new-win">New Window</MenuItem>
                <MenuItem value="open-file">Open File...</MenuItem>
                <MenuItem value="export">Export</MenuItem>
              </MenuContent>
            </MenuRoot>
          </Box>
        </HStack>
      </HStack> */}
      {/* Title, filter, & sort End */}

      {/* Products display Start */}
      {isLoading || isSearchLoading ? (
        <Text  h="68vh" mx={'24'}><LoadingSearchBuyer/></Text>
      ) : error ? (
        <Text h="68vh" mx={'40'}>Gagal memuat produk</Text>
      ) : (
        <Box w="full" h="fit" maxW="7xl" mx="auto" pb="100px">
          <Grid px={{ base: '5', lg: '10' }} templateColumns="repeat(4, 1fr)" gapX="12" gapY="10" mb={10} > 
          {(searchQueryInput ? searchData : data?.products)?.length! > 0 ? (
            (searchQueryInput ? searchData : data?.products)?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <Text  h="28vh" w={'500px'}>Produk yang anda cari tidak ditemukan</Text>
          )}

          </Grid>
          {/* {!searchQueryInput && data!.totalPage > 1 && (
            <HStack w="full" justifyContent="center">
              <PaginationRoot count={data!.totalPage} onPageChange={(e) => setPage(e.page)} pageSize={1} defaultPage={1}>
                <HStack>
                  <PaginationPrevTrigger />
                  <PaginationItems />
                  <PaginationNextTrigger />
                </HStack>
              </PaginationRoot>
            </HStack>
          )} */}
        </Box>
      ) 
    }
      {/* Products display End */}

      {/* Footer start */}
      <SellerFooter />
      {/* Footer end */}
    </Box>
  );
}
