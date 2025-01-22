
import { InputGroup } from "@/components/ui/input-group"
import { Switch } from "@/components/ui/switch"
import { Box, Button, Flex, Grid, GridItem, Image, Input, MenuContent, MenuItem, MenuRoot, MenuTrigger, Text } from "@chakra-ui/react"
import { ChevronDown, Link, PackageSearch } from "lucide-react"
import CheckBox from "./Checkbox"

const TabContentNonActive = () => {
    return (
        <Box>
        <Grid templateColumns="repeat(3, 1fr)" width={'100%'} gap={2}>
          <GridItem>
          <InputGroup
          flex="1"
          startElement={<PackageSearch/>}
          width={'100%'}
        >
          <Input  placeholder="Search produk" outline={'#0086B4'}/>
        </InputGroup>

          </GridItem>
          <GridItem>
          <Box position={"relative"}>
          <MenuRoot>
            <MenuTrigger asChild>
              <Button variant={"outline"}  width={'100%'} display={'flex'} justifyContent={'space-between'}>
                <span className="font-normal">Semua Kategori</span>
                <ChevronDown />
              </Button>
            </MenuTrigger>
            <MenuContent position={"absolute"} width={"full"}>
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
          <Box position={"relative"}>
          <MenuRoot>
            <MenuTrigger asChild>
              <Button variant={"outline"}  width={'100%'} display={'flex'} justifyContent={'space-between'}>
                <span className="font-normal">Urutkan</span>
                <ChevronDown />
              </Button>
            </MenuTrigger>
            <MenuContent position={"absolute"} width={"full"}>
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
          <Text color={'gray.400'}>1 Produk</Text>
          <CheckBox display="block"/>
        </Flex>
      <Box
          width="full"
          border="1px solid"
          borderColor="gray.200"
          height="150px"
          borderRadius="10px"
          mt={3}
          display="flex"
          justifyContent={"space-between"}
          p={3}
        >
        <Box display={"flex"} alignItems={"center"}>
        <Image
          src="https://www.softcom.co.id/wp-content/uploads/2021/09/Monitor-HP-M24fwa-3.jpg"
          width={36}
          height={36}
          borderRadius="md"
          p={3}
          mr={3}
        />
        <Box>
        <Text fontSize="20px" fontWeight="bold">
        Monitor HP M24fwa 34Y23AA [23.8 Inch / IPS / Built in Speaker]
        </Text>
        <Flex fontSize="14px" fontWeight="normal" mt={1}>
          <Text fontWeight={"semibold"}>Harga: 120.000 </Text>
          <Text color={"gray.500"} ml={1}>• Stok: 16 • SKU: ajdaye24 </Text>
        </Flex>
        <Box display={'flex'} gap={2}>
        <Button variant={"outline"} mt={4} borderRadius={'20px'}>
          Ubah harga
        </Button>
        <Button variant={"outline"} mt={4} borderRadius={'20px'}>
          Ubah stock
        </Button>
        <Button variant={"outline"} mt={4} borderRadius={'20px'}>
          <Link/>
          Lihat halaman
        </Button>
        
        </Box>
 
        </Box>            
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={"space-between"} alignItems={'end'}>
          <CheckBox display={'none'}/>
          <Switch colorPalette={'blue'}/>
        </Box>

      </Box>

        </Box>
    )
}

export default TabContentNonActive