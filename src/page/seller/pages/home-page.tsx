import { Box, Button, Grid, Heading, HStack, Image, MenuContent, MenuItem, MenuRoot, MenuTrigger, Text, VStack } from "@chakra-ui/react"
import SellerNavbar from "../components/navbar"
import { ArrowDownUp, Search, SlidersHorizontal } from "lucide-react"
import SellerFooter from "../components/footer";
import ProductCard from "../components/product-cart";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { dummy_product } from "../dummies";
import CategoryDropDown, { CategoryType } from "../components/category";

const url_banner_dummy = 'https://res.cloudinary.com/dbtcocjdk/image/fetch/f_auto,dpr_2.0,w_800/https:/storage.jukeboxprint.com/s/images/Graphic%20Design%20Trends%202024%20359.jpg';

export default function SellerHomepage() {
    const { pathname } = useLocation();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchSectionRef = useRef<HTMLDivElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<CategoryType | null>(null);
    const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<CategoryType | null>(null);

    useEffect(() => {
        if (pathname.includes('/search')) {
            handleFocusSearch();
        }
    }, [pathname]);

    function handleFocusSearch() {
        searchInputRef.current?.focus();
        searchSectionRef.current?.scrollIntoView({ behavior: "smooth" })
        console.log("search active!")
    }

    return (
        <Box w="full" h="fit" minH="100vh">
            <SellerNavbar onSearch={() => handleFocusSearch()} />

            {/* Banner start */}
            <VStack ref={searchSectionRef} px={{ base: "5", lg: "10" }} w="full" maxW="7xl" mx="auto" h="fit" pt="32" pb="10">
                <Box w="full" aspectRatio="4/1" overflow="hidden" borderRadius={10}>
                    <Image src={url_banner_dummy} w="full" h="full" objectFit="cover"></Image>
                </Box>
            </VStack>
            {/* Banner end */}

            {/* Search Input Start */}
            <HStack px={{ base: "5", lg: "10" }} w="full" maxW="7xl" mx="auto">
                <HStack w="full" alignItems="stretch" position="relative">

                    <Box className="peer group" w="fit" borderRadius="lg" px="5" py="2" bg="blue.600" color="white">
                        <button>Kategori</button>
                        <CategoryDropDown
                            onSelectCategory={setSelectedCategory}
                            onSelectSubCategory={setSelectedSubCategory}
                            onSelectSubSubCategory={setSelectedSubSubCategory}
                        />
                    </Box>

                    <form className="flex-1">
                        <HStack position="relative">
                            <Search className="absolute left-2" />
                            <input ref={searchInputRef} type="text" className="w-full h-full bg-neutral-200 py-2.5 rounded-lg ps-10 pr-2 placeholder:font-medium outline-none focus:ring-2" placeholder="Cari produk" />
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
            <Grid px={{ base: "5", lg: "10" }} templateColumns="repeat(4, 1fr)" gapX="16" gapY="10" w="full" h="fit" maxW="7xl" mx="auto" pb="200px">
                {dummy_product.map((product: any) => (
                    <ProductCard
                        id={product.id}
                        imgSrc={product.attachment[0]}
                        category={product.category}
                        name={product.name}
                        price={product.price}
                        key={product.id}
                    />
                ))}
            </Grid>
            {/* Products display End */}

            {/* Footer start */}
            <SellerFooter />
            {/* Footer end */}

        </Box>
    )
}