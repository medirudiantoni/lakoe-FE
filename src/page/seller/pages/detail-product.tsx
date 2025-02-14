import { Box, Button, Flex, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"
import SellerNavbar from "../components/navbar"
import SellerFooter from "../components/footer";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { formatRupiah } from "@/lib/rupiah";
import useCart, { Cart } from "@/hooks/cart-store";
import { LoadingScreen } from "@/components/loading-screen/loading-screen";
import toast from "react-hot-toast";
import { ProductType, VariantOptionType } from "@/features/auth/types/prisma-types";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByUrl } from "@/features/auth/services/product-service";

interface SelectedOptionValue {
  name: string;
  value: string;
}

const SellerDetailProduct = () => {
  const { productUrl } = useParams();
  const { addCart } = useCart();
  const [price, setPrice] = useState<string>("");
  const [choosenOptions, setChoosenOptions] = useState<SelectedOptionValue[]>([]);
  const [selectedOption, setSelectedOption] = useState<VariantOptionType | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);

  useEffect(() => {
    console.log("index: ", selectedOption)
  }, [selectedOption]);

  const { data: product, isLoading } = useQuery<ProductType>({
    queryKey: ["product", "productUrl"],
    queryFn: () => fetchProductByUrl(String(productUrl))
  });

  useEffect(() => {
    if(selectedOption && selectedOption.variantOptionValues){
      setPrice(formatRupiah(selectedOption.variantOptionValues[0].price))
    }
  }, [selectedOption])

  useEffect(() => {
    const finalIndex = Number(product?.variants?.findIndex(e => e.name === "final"));
    const optionName: string[] = [];
    choosenOptions.forEach(e => optionName.push(e.value)); 
    const variantOption = product?.variants && product.variants[finalIndex].variantOptions?.find(e => e.name === `${optionName.join(" ")}`);
    const optionIndex = Number(product?.variants && product.variants[finalIndex].variantOptions?.findIndex(e => e.name === `${optionName.join(" ")}`));
    if(variantOption){
      setSelectedOption(variantOption);
      setSelectedOptionIndex(optionIndex);
    }
  }, [choosenOptions])

  useEffect(() => {
    priceSetter();
  }, [product])

  function priceSetter() {
    const finalIndex = Number(product?.variants?.findIndex(e => e.name === "final"));
    const prices: number[] = [];
    product?.variants && product.variants[finalIndex].variantOptions?.map(e => {
      e.variantOptionValues && prices.push(e.variantOptionValues[0].price);
    });
    const lowPrice = Math.min(...prices);
    const highPrice = Math.max(...prices);
    if (prices.length <= 1) {
      setPrice(formatRupiah(lowPrice || highPrice))
    } else {
      if(lowPrice === highPrice){
        setPrice(formatRupiah(lowPrice))
      } else {
        setPrice(`${formatRupiah(lowPrice)} - ${formatRupiah(highPrice)}`)
      }
    }
  }

  const handleVariantSelect = (variantName: string, optionValue: string) => {
    setChoosenOptions(prev => {
      const filtered = prev.filter(opt => opt.name !== variantName)
      return [...filtered, { name: variantName, value: optionValue }]
    })
  }

  // Check if option is selected
  const isOptionSelected = (variantName: string, optionValue: string): boolean => {
    return choosenOptions.some(opt => 
      opt.name === variantName && opt.value === optionValue
    )
  }

  // Check if all required variants are selected
  // const areAllVariantsSelected = (): boolean => {
  //   if (!product?.variants) return false
    
  //   const requiredVariants = product.variants.filter(v => v.name !== "final")
  //   return requiredVariants.every(variant =>
  //     choosenOptions.some(opt => opt.name === variant.name)
  //   )
  // }

  const handleAddCart = () => {
    if (!product || !selectedOption) {
      toast.error("Pilih semua varian sebelum menambahkan ke keranjang");
      return;
    }
  
    const newCartItem: Cart = {
      ...product,
      quantity: 1,
      optionIndex: selectedOptionIndex, // Gunakan ID dari varian terpilih sebagai optionIndex
      price: Number(selectedOption.variantOptionValues && selectedOption.variantOptionValues[0].price)
    };
  
    addCart(newCartItem);
    toast.success("Produk ditambahkan ke keranjang!");
  };
  



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <Box w="full" minH="100vh" className="font-poppins">
      <SellerNavbar />

      <Box w="full" maxW="6xl" mx="auto" py="32">

        <Flex w="full" gap="20" mb="10">
          <Box w="2/5" h="fit">
            <Image w="full" aspectRatio="square" objectFit="contain" src={product?.attachments[0]}></Image>
          </Box>
          <VStack alignItems="stretch" justifyContent="space-between" flex="1">
            <Box w="full">
              <Heading size="2xl" fontWeight="semibold">{product?.name}</Heading>
              <Text fontSize="md" fontWeight="medium" color="gray.600">{product?.category?.name}</Text>
              <Text fontSize="lg" fontWeight="semibold" my="4" color="blue.800">{price}</Text>
              <Box w="full">
                {product?.variants?.map(variant => {
                  if (variant.name !== "final")
                    return (
                      <HStack alignItems="start" key={variant.id} w="full">
                        <Box py={2} w="2/6">{variant.name}</Box>
                        <HStack flexWrap="wrap" py={2} flex={1}>
                          {variant.variantOptions?.map(option => (
                            <Button 
                              key={option.id} 
                              variant="outline"
                              bg={isOptionSelected(variant.name, option.name) ? "gray.200" : "white"}
                              color={isOptionSelected(variant.name, option.name) ? "black" : "gray.800"}
                              onClick={() => handleVariantSelect(variant.name, option.name)}
                            >{option.name}</Button>
                          ))}
                        </HStack>
                      </HStack>
                    )
                })}
              </Box>
            </Box>
            <HStack w="full" py="5">
              <Button flex={1} bg="white" color="blue.600" borderColor="blue.600">Beli Langsung</Button>
              <Button onClick={handleAddCart} flex={1} className="bg-blue-700">+ Keranjang</Button>
              {/* <Button onClick={() => handleAddCart(product!)} flex={1} className="bg-blue-700">+ Keranjang</Button> */}
            </HStack>
          </VStack>
        </Flex>

        <Box w="full" borderRadius="xl" borderWidth={0} borderColor="gray.400">
          <Heading fontWeight="semibold" mb="2">Deskripsi Produk</Heading>
          <Text>{product?.description}</Text>
        </Box>

      </Box>

      <SellerFooter />

    </Box>
  )
}

export default SellerDetailProduct