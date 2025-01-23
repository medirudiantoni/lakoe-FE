import { InputGroup } from '@/components/ui/input-group';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Text,
} from '@chakra-ui/react';
import { ChevronDown, PackageOpen, PackageSearch } from 'lucide-react';
import CheckBox from './Checkbox';

const TabContentNonActive = () => {
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
            <MenuRoot>
              <MenuTrigger asChild>
                <Button
                  variant={'outline'}
                  width={'100%'}
                  display={'flex'}
                  justifyContent={'space-between'}
                >
                  <span className="font-normal">Semua Kategori</span>
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
        <Text color={'gray.400'}>0 Produk</Text>
        <CheckBox display="block" />
      </Flex>
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
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
        >
          <PackageOpen size={'85px'} color="#75757C" />
          <Box ml={2}>
            <Text fontWeight={''} fontSize={'24px'} mt={'-10px'}>
              {' '}
              Semua produk telah aktif
            </Text>
            <Text fontSize={'14px'} color={'gray.500'}>
              Kamu bisa membuat produk baru dan menyimpannya
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TabContentNonActive;
