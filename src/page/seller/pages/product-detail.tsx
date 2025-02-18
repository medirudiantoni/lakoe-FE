import { LoadingScreenBuyer } from '@/components/loading-screen/loading-screen-buyer';
import { fetchAddToCart } from '@/features/auth/services/cart-service';
import { fetchProductByUrl } from '@/features/auth/services/product-service';
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import { useProductStore } from '@/features/auth/store/product-store';
import {
  CartItemType,
  ProductType,
  VariantOptionType,
} from '@/features/auth/types/prisma-types';
import useCart from '@/hooks/cart-store';
import { useSellerStore } from '@/hooks/store';
import { formatRupiah } from '@/lib/rupiah';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import SellerFooter from '../components/footer';
import SellerNavbar from '../components/navbar';

interface SelectedOptionValue {
  name: string;
  value: string;
}

const SellerProductDetail = () => {
  const { productUrl } = useParams();
  const { addCart } = useCart();
  const { buyer } = useAuthBuyerStore();
  const [priceDisplay, setPriceDisplay] = useState<string>('');
  const [priceNumber, setPriceNumber] = useState<number>(0);
  const [selectedOptionName, setSelectedOptionName] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<VariantOptionType | null>(null);
  const [choosenOptions, setChoosenOptions] = useState<SelectedOptionValue[]>(
    []
  );
  const { store } = useSellerStore();
  const { setProducts } = useProductStore();
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [tokenBuyer, setTokenBuyer] = useState('');

  useEffect(() => {
    const tokenBuyerString = Cookies.get(`token-buyer-${store?.name}`);
    setTokenBuyer(String(tokenBuyerString));
  }, []);

  const navigate = useNavigate();

  const { data: product, isLoading } = useQuery<ProductType>({
    queryKey: ['product', 'productUrl'],
    queryFn: () => fetchProductByUrl(String(productUrl)),
  });

  const handleBuyNow = () => {
    if (!buyer) {
      console.log('belum loginnnnnn');
      toast.error('Lu belum login kocak!, login dulu sana');
      return;
    }
    if (!product) {
      return;
    }
    if (!selectedOption) {
      toast.error('Kamu belum memilih varian produk');
      return;
    }

    const selectedVariantOptionValue = selectedOption.variantOptionValues?.[0];

    if (!selectedVariantOptionValue) {
      console.error('Tidak ada variant option value yang dipilih!');
      return;
    }

    setProducts([
      {
        name: product.name,
        price: priceNumber,
        productId: product.id,
        quantity: 1,
        category: product.category?.name,
        image: product.attachments[0],
      },
    ]);

    navigate(`/${store?.name}/checkout`);
  };

  useEffect(() => {
    if (product?.variants && selectedOptionName) {
      const optionName = selectedOptionName.join(' ');
      const finalIndex = Number(
        product.variants.findIndex((e) => e.name === 'final')
      );
      const theOption = product.variants[finalIndex].variantOptions?.find(
        (e) => e.name === optionName
      );
      if (theOption && theOption.variantOptionValues) {
        setSelectedOption(theOption);
        setPriceDisplay(formatRupiah(theOption.variantOptionValues[0].price));
        setPriceNumber(theOption.variantOptionValues[0].price);
      }
    }
  }, [selectedOptionName]);

  /*
  1. Ambil nama variant dan nama variantOption
  2. tempatkan ke dalam sebuah array sesuai dengan urutan variant
     2.1 buat fungsinya
     2.2 identifikasi index nama variant
     2.3 buatkan array yang diisi dengan string kosong sebagai initial value dengan jumlah data string yang sama dengan jumlah variant
     2.4 masukkan data ke dalam array berdasarkan index yang sudah ditentukan tadi
  3. cari variantOption di variant final yang namanya sama dengan array yang telah dibuat tadi
  */
  function getVariantAndOption(variantName: string, optionName: string) {
    setChoosenOptions((prev) => {
      const filtered = prev.filter((opt) => opt.name !== variantName);
      return [...filtered, { name: variantName, value: optionName }];
    });
    if (!product?.variants) return;

    const variantIndex = product.variants.findIndex(
      (e) => e.name === variantName
    );
    if (variantIndex === -1) return;

    setSelectedOptionName((prev) => {
      const newSelectedOptions = [...prev];

      // Jika array belum diinisialisasi dengan panjang yang sesuai, isi dengan string kosong
      if (newSelectedOptions.length !== Number(product?.variants?.length) - 1) {
        newSelectedOptions.length = Number(product?.variants?.length) - 1;
        newSelectedOptions.fill('');
      }

      // Update opsi yang dipilih berdasarkan index varian
      newSelectedOptions[variantIndex] = optionName;
      return newSelectedOptions;
    });
  }

  useEffect(() => {
    if (product) priceSetter();
  }, [product]);

  function priceSetter() {
    const finalIndex = Number(
      product?.variants?.findIndex((e) => e.name === 'final')
    );
    const prices: number[] = [];
    product?.variants &&
      product.variants[finalIndex].variantOptions?.map((e) => {
        e.variantOptionValues && prices.push(e.variantOptionValues[0].price);
      });
    const lowPrice = Math.min(...prices);
    const highPrice = Math.max(...prices);
    if (prices.length <= 1) {
      setPriceDisplay(formatRupiah(lowPrice || highPrice));
      setPriceNumber(lowPrice);
    } else {
      if (lowPrice === highPrice) {
        setPriceDisplay(formatRupiah(lowPrice));
      } else {
        setPriceDisplay(
          `${formatRupiah(lowPrice)} - ${formatRupiah(highPrice)}`
        );
      }
    }
  }

  const isOptionSelected = (
    variantName: string,
    optionValue: string
  ): boolean => {
    return choosenOptions.some(
      (opt) => opt.name === variantName && opt.value === optionValue
    );
  };

  useEffect(() => {
    if (product) {
      setTimeout(() => {
        setIsLoadingPage(false);
      }, 500);
    }
    if (product?.variants && product.variants.length === 1) {
      if (product.variants[0].variantOptions) {
        setSelectedOption(product.variants[0].variantOptions[0]);
      }
    } else {
      setSelectedOption(null);
    }
  }, [product]);

  function handleAddToCart() {
    if (!buyer) {
      console.log('belum loginnnnnn');
      toast.error('Lu belum login kocak!, login dulu sana');
      return;
    }
    if (product?.variants && product?.variants.length < 2) {
      const data: CartItemType = {
        buyerId: buyer?.id,
        variantOptionValueId:
          selectedOption?.variantOptionValues &&
          selectedOption.variantOptionValues[0].id,
        productId: String(product?.id),
        storeId: product?.storeId,
        name: `${product.name}`,
        quantity: 1,
        price: priceNumber,
        product: product,
      };
      console.log('datanya: ', data);
      // addCart(data);
      toast.success('Produk Telah ditambahkan ke keranjang');
      fetchAddToCart(data, tokenBuyer).then((res) => {
        console.log('add cart sukses: ', res.cartItem);
        const dataWithIdCart: CartItemType = { ...data, id: res.cartItem.id };
        addCart(dataWithIdCart);
      });
      // mutation.mutate(data);
    } else {
      if (selectedOption) {
        const data: CartItemType = {
          buyerId: buyer?.id,
          variantOptionValueId:
            selectedOption.variantOptionValues &&
            selectedOption.variantOptionValues[0].id,
          productId: String(product?.id),
          storeId: product?.storeId,
          name: `${product?.name} - ${selectedOptionName.join(' ')}`,
          quantity: 1,
          price: priceNumber,
          product,
        };
        toast.success('Produk Telah ditambahkan ke keranjang');
        fetchAddToCart(data, tokenBuyer).then((res) => {
          console.log('add cart sukses: ', res.cartItem);
          const dataWithIdCart: CartItemType = { ...data, id: res.cartItem.id };
          addCart(dataWithIdCart);
        });
        // mutation.mutate(data);
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading || isLoadingPage) {
    return <LoadingScreenBuyer />;
  }
  return (
    <Box w="full" minH="100vh" className="font-poppins">
      <SellerNavbar />

      <Box w="full" maxW="6xl" mx="auto" py="32">
        <Flex w="full" gap="20" mb="10">
          <Box w="2/5" h="fit">
            <Image
              w="full"
              aspectRatio="square"
              objectFit="contain"
              src={product?.attachments[0]}
            ></Image>
          </Box>
          <VStack alignItems="stretch" justifyContent="space-between" flex="1">
            <Box w="full">
              <Heading size="2xl" fontWeight="semibold">
                {product?.name}
              </Heading>
              <Text fontSize="md" fontWeight="medium" color="gray.600">
                {product?.category?.name}
              </Text>
              <Text fontSize="lg" fontWeight="semibold" my="4" color="blue.800">
                {priceDisplay}
              </Text>
              <Box w="full">
                {product?.variants?.map((variant) => {
                  if (variant.name !== 'final')
                    return (
                      <HStack alignItems="start" key={variant.id} w="full">
                        <Box py={2} w="2/6">
                          {variant.name}
                        </Box>
                        <HStack flexWrap="wrap" py={2} flex={1}>
                          {variant.variantOptions?.map((option) => (
                            <Button
                              key={option.id}
                              variant="outline"
                              bg={
                                isOptionSelected(variant.name, option.name)
                                  ? 'gray.200'
                                  : 'white'
                              }
                              color={
                                isOptionSelected(variant.name, option.name)
                                  ? 'black'
                                  : 'gray.800'
                              }
                              onClick={() =>
                                getVariantAndOption(variant.name, option.name)
                              }
                            >
                              {option.name}
                            </Button>
                          ))}
                        </HStack>
                      </HStack>
                    );
                })}
              </Box>
            </Box>
            <HStack w="full" py="5">
              {product?.variants && product.variants.length < 2 ? (
                <>
                  <Button
                    flex={1}
                    _active={{ transform: 'scale(0.95)' }}
                    bg="white"
                    color="blue.600"
                    borderColor="blue.600"
                    onClick={handleBuyNow}
                  >
                    Beli Langsung
                  </Button>
                  <Button
                    flex={1}
                    _active={{ transform: 'scale(0.95)' }}
                    className="bg-blue-700"
                    onClick={handleAddToCart}
                  >
                    + Keranjang
                  </Button>
                </>
              ) : selectedOption === null ? (
                <>
                  <Button
                    flex={1}
                    disabled
                    bg="white"
                    color="blue.600"
                    borderColor="blue.600"
                  >
                    Beli Langsung
                  </Button>
                  <Button flex={1} disabled className="bg-blue-600">
                    + Keranjang
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    flex={1}
                    _active={{ transform: 'scale(0.95)' }}
                    bg="white"
                    color="blue.600"
                    borderColor="blue.600"
                    onClick={handleBuyNow}
                  >
                    Beli Langsung
                  </Button>
                  <Button
                    flex={1}
                    _active={{ transform: 'scale(0.95)' }}
                    className="bg-blue-700"
                    onClick={handleAddToCart}
                  >
                    + Keranjang
                  </Button>
                </>
              )}
            </HStack>
          </VStack>
        </Flex>

        <Box w="full" borderRadius="xl" borderWidth={0} borderColor="gray.400">
          <Heading fontWeight="semibold" mb="2">
            Deskripsi Produk
          </Heading>
          <Text>{product?.description}</Text>
        </Box>
      </Box>

      <SellerFooter />
    </Box>
  );
};

export default SellerProductDetail;
