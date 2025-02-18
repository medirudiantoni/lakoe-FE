import { Box, Button, Center, Grid, Heading, HStack, Image, MenuContent, MenuItem, MenuRoot, MenuTrigger, Text, VStack } from "@chakra-ui/react"
import SellerNavbar from "../components/navbar"
import { ArrowDownUp, Search, SlidersHorizontal } from "lucide-react"
import SellerFooter from "../components/footer";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import CategoryDropDown, { CategoryType } from "../components/category";
import { useSellerStore } from "@/hooks/store";
import { ProductType } from "@/features/auth/types/prisma-types";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsByStoreId } from "@/features/auth/services/product-service";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "@/components/ui/pagination";
import ProductCard from "../components/product-card";

interface ProductsResponse {
  products: ProductType[],
  totalPage: number;
}

export default function SellerHomepage() {
  const { pathname } = useLocation();
  const { store } = useSellerStore();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchSectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<CategoryType | null>(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<CategoryType | null>(null);
  const [page, setPage] = useState<number>(1);

  const { data, error, isLoading } = useQuery<ProductsResponse>({
    queryKey: ["products", page],
    queryFn: () => fetchProductsByStoreId(String(store?.id), page, 10)
  });

  useEffect(() => {
    console.log("total page: ", data?.totalPage);
    console.log("current page: ", page);
  }, [data, page])

  useEffect(() => {
    console.log("products by tanstack: ", data);
  }, [data]);

  useEffect(() => {
    if (pathname.includes('/search')) {
      handleFocusSearch();
    }
  }, [pathname]);

  function handleFocusSearch() {
    searchInputRef.current?.focus();
    searchSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    console.log("products", store?.products);
  }, [store])

  return (
    <Box w="full" h="fit" minH="100vh">
      <SellerNavbar onSearch={() => handleFocusSearch()} />

      {/* Banner start */}
      <VStack ref={searchSectionRef} px={{ base: "5", lg: "10" }} w="full" maxW="7xl" mx="auto" h="fit" pt="32" pb="10">
        <Box w="full" aspectRatio="4/1" overflow="hidden" borderRadius={10}>
          {store && (
            <Image src={store.bannerAttachment} w="full" h="full" objectFit="cover"></Image>
          )}
        </Box>
      </VStack>
      {/* Banner end */}

      {/* Search Input Start */}
      <HStack px={{ base: "5", lg: "10" }} w="full" maxW="7xl" mx="auto">
        <HStack w="full" alignItems="stretch" position="relative">

          <Box className="peer group" w="fit" borderRadius="lg" px="3" bg={'#18181b'} color="white">
            <Button variant={"plain"} color={"white"} border={"none"}>Kategori</Button>
            <CategoryDropDown
              onSelectCategory={setSelectedCategory}
              onSelectSubCategory={setSelectedSubCategory}
              onSelectSubSubCategory={setSelectedSubSubCategory}
            />
          </Box>

          <form className="flex-1">
            <HStack position="relative">
              <Search size={20} className="absolute left-2 di" />
              <input ref={searchInputRef} type="text" className="w-full h-full bg-[#F4F4F5] py-2.5 rounded-lg ps-10 pr-2 placeholder:font-normal outline-none focus:ring-2" placeholder="Cari produk" />
            </HStack>
          </form>

        </HStack>
      </HStack>
      {/* Search Input end */}

      {/* Title, filter, & sort Start */}
      <HStack px={{ base: "5", lg: "10" }} justifyContent="space-between" w="full" maxW="7xl" mx="auto" py="10">
        <HStack alignItems={"end"}>
          <Heading size="3xl" fontWeight="semibold" lineHeight="1" className="font-poppins">{selectedCategory?.name ? selectedCategory.name : "Semua Produk"}</Heading>
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
            <MenuRoot positioning={{ placement: "bottom", gutter: 4 }}>
              <MenuTrigger asChild>
                <Button px="4" py="2" borderRadius="lg" bg="gray.200" color="black">
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
      </HStack>
      {/* Title, filter, & sort End */}

      {/* Products display Start */}
      {isLoading ? (
        <Center w="full" h="20">Loading...</Center> // di sini tempat skeleton
      ) : error ? (
        <Center w="full" h="20">Gagal memuat produk</Center>
      ) : (
        data?.products ? (
          <Box w="full" h="fit" maxW="7xl" mx="auto" pb="200px">
            <Grid px={{ base: "5", lg: "10" }} templateColumns="repeat(4, 1fr)" gapX="16" gapY="10" mb={10}>
              {data?.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
            {data.totalPage > 1 && (
              <HStack w="full" justifyContent="center">
                <PaginationRoot
                  count={data.totalPage}
                  onPageChange={(e) => setPage(e.page)}
                  pageSize={1}
                  defaultPage={1}>
                  <HStack>
                    <PaginationPrevTrigger />
                    <PaginationItems />
                    <PaginationNextTrigger />
                  </HStack>
                </PaginationRoot>
              </HStack>
            )}
          </Box>
        ) : (
          <Center w="full" h="20" mb="200px">
            <Text color="gray.500">Belum ada produk</Text>
          </Center>
        )
      )}

      {/* Products display End */}

      {/* Footer start */}
      <SellerFooter />
      {/* Footer end */}
    </Box>
  );
}
