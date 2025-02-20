import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductType } from '@/features/auth/types/prisma-types';
import { formatRupiah } from '@/lib/rupiah';
import { Badge, Box, Flex, HStack, Image, Text } from '@chakra-ui/react';
import { Link2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router';
import DialogOption from '../dialog-product/dialog-option';
import { DialogPrice } from '../dialog-product/dialog-price';
import { DialogStock } from '../dialog-product/dialog-stock';
import ProductToggleSwitch from './switch-status';

interface Props {
  product: ProductType;
  selectedProducts: string[];
  toggleProductSelection: (id: string) => void;
  updateProductStatus: (productId: string, newStatus: boolean) => void;
}

const ProductCardDashboard: React.FC<Props> = ({
  product,
  selectedProducts,
  toggleProductSelection,
  updateProductStatus,
}) => {
  useEffect(() => {
    console.log('product card: ', product);
  }, [product]);
  const finalIndex = product.variants?.findIndex(
    (varian) => varian.name === 'final'
  );
  const variantOption =
    product.variants &&
    product.variants[Number(finalIndex)]?.variantOptions?.find((e, id) =>
      id === 0 ? e : false
    );
  const option =
    product.variants && product.variants[Number(finalIndex)]?.variantOptions;
  const productValues =
    variantOption?.variantOptionValues && variantOption?.variantOptionValues[0];

  const price = () => {
    let variantsPrice: number[] = [];
    option?.map((o) =>
      variantsPrice.push(
        o.variantOptionValues ? o.variantOptionValues[0].price : 0
      )
    );
    const minPrice = Math.min(...variantsPrice);
    const maxPrice = Math.max(...variantsPrice);
    console.log('min & max: ', variantsPrice);
    if (minPrice === maxPrice) {
      return formatRupiah(minPrice);
    } else {
      return `${formatRupiah(minPrice)} - ${formatRupiah(maxPrice)}`;
    }
  };

  return (
    <Box
      key={product.id}
      width="full"
      border="1px solid"
      borderColor="gray.200"
      height="170px"
      borderRadius="10px"
      mt={3}
      display="flex"
      justifyContent="space-between"
      px={3}
      py={4}
    >
      <Box display="flex" alignItems="center">
        <Image
          src={product.attachments[0]}
          width={40}
          height={36}
          borderRadius="20px"
          p={3}
          pt={1}
          mr={3}
        />
        <Box>
          <HStack>
            {product.variants?.map((item) => {
              if (item.name !== 'final')
                return (
                  <Badge key={item.id} mb={1} colorPalette="blue">
                    {item.variantOptions?.length} Varian {item.name}
                  </Badge>
                );
            })}
          </HStack>
          <Text fontSize="18px" fontWeight="bold">
            {product.name}
          </Text>
          <Flex fontSize="14px" fontWeight="normal" mt={1}>
            <Text fontWeight="semibold">Harga: {price()}</Text>
            <Text color="gray.500" ml={1}>
              • Stok: {productValues?.stock} • SKU: {productValues?.sku}
            </Text>
          </Flex>
          <Box display="flex" gap={2}>
            {product.variants && product.variants?.length <= 1 ? (
              <>
                <DialogPrice productId={product.id} />
                <DialogStock productId={product.id} />
              </>
            ) : (
              <Link to={`/edit-product/${product.id}`}>
                <Button variant="outline" mt={4} borderRadius="20px">
                  Edit Produk
                </Button>
              </Link>
            )}
            <Link to={`/product-detail/${product.id}`}>
              <Button variant="outline" mt={4} borderRadius="20px">
                <Link2 />
                Lihat halaman
              </Button>
            </Link>
            <DialogOption productId={product.id} />
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="end"
      >
        <Checkbox
          checked={selectedProducts.includes(product.id)}
          onCheckedChange={() => toggleProductSelection(product.id)}
        />
        <ProductToggleSwitch
          key={product.id}
          productId={product.id}
          initialStatus={product.isActive}
          onStatusChange={updateProductStatus}
        />
      </Box>
    </Box>
  );
};

export default ProductCardDashboard;
