import { InputGroup } from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';
import products from "@/data-dummy/products.json";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Text,
} from '@chakra-ui/react';
import { ChevronDown, Link2, PackageSearch } from 'lucide-react';
import { Link } from 'react-router';
import Category from '../component-product/category';
import CheckBox from '../component-product/checkbox';
import { DialogDelete } from '../dialog-product/dialog-delete';
import { DialogNonaktif } from '../dialog-product/dialog-nonaktif';
import { DialogPrice } from '../dialog-product/dialog-price';
import { DialogStock } from '../dialog-product/dialog-stock';


const TabContentActive = () => {
  const activeProduct = products.filter((product) => product.status === "defaultChecked")
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" width={'100%'} gap={2}>
        <GridItem position={'relative'}>
          <InputGroup flex="1" width={'100%'}>
            <Input px={11} placeholder="Search produk" outline={'#0086B4'} />
          </InputGroup>
          <Box position={'absolute'} top={2} left={4}>
            <PackageSearch color="#75757C" />
          </Box>
        </GridItem>
        <GridItem>
          <Box position={'relative'}>
           <Category/>
          </Box>
        </GridItem>
        <GridItem>
          <Box position={'relative'}>
            <MenuRoot>
              <MenuTrigger asChild>
                <Button
                  variant={'outline'}
                  width={'100%'}
                  display={'flex'}
                  justifyContent={'space-between'}
                >
                  <span className="font-normal">Urutkan</span>
                  <ChevronDown />
                </Button>
              </MenuTrigger>
              <MenuContent position={'absolute'} width={'full'}>
                <MenuItem value="new-txt">New Text File</MenuItem>
                <MenuItem value="new-file">New File...</MenuItem>
                <MenuItem value="new-win">New Window</MenuItem>
                <MenuItem value="open-file">Open File...</MenuItem>
                <MenuItem value="export">Export</MenuItem>
              </MenuContent>
            </MenuRoot>
          </Box>
        </GridItem>
      </Grid>
      <Flex justifyContent={'space-between'} alignItems={'center'} mt={3}>
        <Text color={'gray.400'}>{activeProduct.length} Produk</Text>
        <Box display={'flex'} alignItems={'center'} gap={2} color={'#75757C'}>
        <DialogDelete/>
        <DialogNonaktif/>
        <CheckBox display="block" />
        </Box>
      </Flex>
      {products.filter((product) => product.status === "defaultChecked").map((product, index)=>(
              <Box
              width="full"
              border="1px solid"
              borderColor="gray.200"
              height="150px"
              borderRadius="10px"
              mt={3}
              display="flex"
              justifyContent={'space-between'}
              p={3}
            >
              <Box display={'flex'} alignItems={'center'}>
                <Image
                  src={product.image}
                  width={36}
                  height={36}
                  borderRadius="md"
                  p={3}
                  mr={3}
                />
                <Box>
                  <Text fontSize="20px" fontWeight="bold">
                 {product.name}
                  </Text>
                  <Flex fontSize="14px" fontWeight="normal" mt={1}>
                    <Text fontWeight={'semibold'}>Harga: {product.harga} </Text>
                    <Text color={'gray.500'} ml={1}>
                      • Stok: {product.stok} • SKU: {product.sku}
                    </Text>
                  </Flex>
                  <Box display={'flex'} gap={2}>
                    <DialogPrice />
                    <DialogStock />
                    <Link to={`/product-detail/${product.id}`} >
                    <Button variant={'outline'} mt={4} borderRadius={'20px'}>
                      <Link2 />
                      Lihat halaman
                    </Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
              <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                alignItems={'end'}
              >
                <CheckBox display={'none'} />
                <Switch colorPalette={'blue'} defaultChecked={product.status === "defaultChecked"} size={'lg'} />
              </Box>
            </Box>
      ))}
    </Box>
  );
};

export default TabContentActive;
