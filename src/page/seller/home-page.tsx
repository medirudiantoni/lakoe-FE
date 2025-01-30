import { Box, Grid, Heading, HStack, Image, Input, Text, VStack } from "@chakra-ui/react"
import SellerNavbar from "./components/navbar"
import { ArrowDownUp, Search, SlidersHorizontal } from "lucide-react"
import SellerFooter from "./components/footer";

const url_banner_dummy = 'https://res.cloudinary.com/dbtcocjdk/image/fetch/f_auto,dpr_2.0,w_800/https:/storage.jukeboxprint.com/s/images/Graphic%20Design%20Trends%202024%20359.jpg';

const dummy_product = [
    {
        id: 1,
        name: "Halmington Jacket dark",
        category: "Pakaian Pria",
        price: "Rp 2.343.500,-",
        attachments: ["https://i.pinimg.com/736x/b9/69/bb/b969bba3af3c94b29409049c2fed717b.jpg", "https://i.pinimg.com/736x/6a/ff/7b/6aff7b9d1a097538cf3cd93b9ce90c57.jpg"],
    },
    {
        id: 2,
        name: "Kemeja Jil Sander",
        category: "Pakaian Pria",
        price: "Rp 1.343.500,-",
        attachments: ["https://i.pinimg.com/736x/76/1c/49/761c49926373a605a71391d1272c5cf0.jpg", "https://i.pinimg.com/736x/37/25/63/3725630bee7ef38841a03f1ad9d5b5f4.jpg"],
    },
    {
        id: 3,
        name: "Samsung Galaxy S24 Ultra",
        category: "Smartphone",
        price: "Rp 23.240.500,-",
        attachments: ["https://i.pinimg.com/736x/00/48/a7/0048a7ec27539ccd6437b7b0087f4108.jpg", "https://i.pinimg.com/736x/ea/99/81/ea99810744a9257d8cf09d4214ac5c27.jpg", "https://i.pinimg.com/736x/8e/db/b0/8edbb010eee8a26f44ff331e281df5dd.jpg", "https://i.pinimg.com/736x/be/18/49/be18494fd2e3638dc40cd533f611da98.jpg"],
    },
    {
        id: 4,
        name: "HP Elite book",
        category: "Laptop",
        price: "Rp 16.240.500,-",
        attachments: ["https://i.pinimg.com/736x/36/49/97/36499765914857e715c672592fb9fa15.jpg", "https://i.pinimg.com/736x/af/70/c5/af70c59d48f929899c16dd7fc4473737.jpg"],
    },
]

export default function SellerHomepage() {
    return (
        <Box w="full" h="fit" minH="100vh">
            <SellerNavbar />

            {/* Banner start */}
            <VStack w="full" maxW="7xl" mx="auto" h="fit" pt="32" pb="10">
                <Box w="full" aspectRatio="4/1" overflow="hidden" borderRadius={10}>
                    <Image src={url_banner_dummy} w="full" h="full" objectFit="cover"></Image>
                </Box>
            </VStack>
            {/* Banner end */}

            {/* Search Input Start */}
            <HStack w="full" maxW="7xl" mx="auto" alignItems="stretch">
                <Box role="button" w="fit" borderRadius="lg" px="5" py="2" bg="blue.600" color="white">Kategori</Box>
                <form className="flex-1">
                    <HStack w="full" borderRadius="lg" bg="gray.200" px="2">
                        <Search color="#737373" />
                        <Input placeholder="Cari Produk" _placeholder={{ fontWeight: "400", fontSize: "md" }} focusRing={"none"} px="0" borderWidth="0"></Input>
                    </HStack>
                </form>
            </HStack>
            {/* Search Input end */}

            {/* Title, filter, & sort Start */}
            <HStack justifyContent="space-between" w="full" maxW="7xl" mx="auto" py="10">
                <Heading size="3xl" fontWeight="semibold" className="font-poppins">Semua Produk</Heading>
                <HStack>
                    <HStack role="button" px="4" py="2" borderRadius="lg" bg="gray.200">
                        <Text fontWeight="medium">Filter</Text>
                        <SlidersHorizontal size="16px" />
                    </HStack>
                    <HStack role="button" px="4" py="2" borderRadius="lg" bg="gray.200">
                        <Text fontWeight="medium">Sort</Text>
                        <ArrowDownUp size="16px" />
                    </HStack>
                </HStack>
            </HStack>
            {/* Title, filter, & sort End */}

            {/* Products display Start */}
            <Grid templateColumns="repeat(4, 1fr)" gapX="16" gapY="10" w="full" h="fit" maxW="7xl" mx="auto" pb="200px">
                {dummy_product.map(product => (
                    <Box role="button" key={product.id} h="fit-content" p="3" w="full" _hover={{ bg: "gray.100" }}>
                        <Image w="full" aspectRatio="1/1" mb="2" src={product.attachments[0]}></Image>
                        <VStack alignItems="start" justifyContent="space-between" className="font-poppins">
                            <Box mb="1">
                                <Heading size="lg" fontWeight="semibold">{product.name}</Heading>
                                <Text fontSize="xs" color="gray.600">{product.category}</Text>
                            </Box>
                            <Text fontSize="md" fontWeight="semibold">{product.price}</Text>
                        </VStack>
                    </Box>
                ))}
            </Grid>
            {/* Products display End */}

            {/* Footer start */}
            <SellerFooter />
            {/* Footer end */}

        </Box>
    )
}