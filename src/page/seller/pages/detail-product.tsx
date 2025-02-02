import { Box, Button, Flex, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"
import SellerNavbar from "../components/navbar"
import SellerFooter from "../components/footer";
import { dummy_product } from "../dummies";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { formatRupiah } from "@/lib/rupiah";
import useCart, { Cart } from "@/hooks/cart-store";
import { LoadingScreen } from "@/components/loading-screen/loading-screen";
import toast from "react-hot-toast";

// const imageLink = "https://i.pinimg.com/736x/d1/9d/84/d19d84c83abfaf4ce3c296a4910f1bfe.jpg"
const clothesSize = ["SM", "M", "L", "XL"];

const SellerDetailProduct = () => {
  const { productId } = useParams();
  const { addCart } = useCart();
  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    const theProduct = dummy_product.find((item) => item.id === productId);
    setProduct(theProduct);
  }, [productId]);

  const handleAddCart = (product: Cart) => {
    addCart(product);
    toast.success('Produk telah ditambahkan ke keranjang.')
  }

  if(product === null){
    return <LoadingScreen />
  }
  return (
    <Box w="full" minH="100vh" className="font-poppins">
      <SellerNavbar />

      <Box w="full" maxW="6xl" mx="auto" py="32">

        <Flex w="full" gap="20" mb="10">
          <Box w="2/5" h="fit">
            <Image w="full" aspectRatio="square" src={product.attachment[0]}></Image>
          </Box>
          <VStack alignItems="stretch" justifyContent="space-between" flex="1">
            <Box w="full">
              <Heading size="4xl" fontWeight="medium">{product.name}</Heading>
              <Text fontSize="md" fontWeight="medium" color="gray.600">{product.category}</Text>
              <Text fontSize="2xl" fontWeight="semibold" my="4">{formatRupiah(product.price)}</Text>
              <Box w="full">
                <Text fontWeight="semibold">Size</Text>
                <HStack w="full">
                  {clothesSize.map((size, id) => (
                    <Box role="button" _hover={{ bg: "gray.300" }} cursor="pointer" p="2" bg="gray.200" borderRadius="lg" key={id} minW="10" textAlign="center">{size}</Box>
                  ))}
                </HStack>
              </Box>
            </Box>
            <HStack w="full" py="5">
              <Button flex={1} bg="white" color="blue.600" borderColor="blue.600">Beli Langsung</Button>
              <Button onClick={() => handleAddCart(product)} flex={1} className="bg-blue-700">+ Keranjang</Button>
            </HStack>
          </VStack>
        </Flex>

        <Box w="full" borderRadius="xl" borderWidth={0} borderColor="gray.400">
          <Heading fontWeight="semibold" mb="2">Deskripsi Produk</Heading>
          <Text>Halo guys david di sini dan ini adalah lakoe</Text>
        </Box>

      </Box>

      <SellerFooter />

    </Box>
  )
}

export default SellerDetailProduct