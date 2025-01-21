import { InputGroup } from "@/components/ui/input-group"
import { Box, Button, Flex, Grid, GridItem, Input, MenuContent, MenuItem, MenuRoot, MenuTrigger, Tabs, Text } from "@chakra-ui/react"
import { ChevronDown, CirclePlus, PackageSearch } from "lucide-react"

const ComponentProduct = () => {
    return(
         <Box p={3} m={4} backgroundColor={'white'}>               
           <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontWeight={"semibold"}>
              Daftar Product
            </Text>
            <Button backgroundColor={'#0086B4'} borderRadius={'50px'} color={"white"} >
                <CirclePlus />
                <span className="ms-2">
                    Tambahkan Product
                </span>
             </Button>
           </Flex>
            <Tabs.Root defaultValue="semua" mt={5}>
              <Tabs.List>
                <Tabs.Trigger value="semua">
                  Semua
                </Tabs.Trigger>
                <Tabs.Trigger value="aktif">
                  Aktif
                </Tabs.Trigger>
                <Tabs.Trigger value="tidak aktif">
                  Tidak Aktif
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="semua">
                <Box>
                <Grid templateColumns="repeat(3, 1fr)" width={'100%'} gap={2}>
                  <GridItem>
                  <InputGroup
                  flex="1"
                  startElement={<PackageSearch />}
                  width={'100%'}
                              
                >
                  <Input marginLeft={2} placeholder="Search produk" />
                </InputGroup>

                  </GridItem>
                  <GridItem>
                  <MenuRoot>
                    <MenuTrigger asChild>
                      <Button variant={"outline"}  width={'100%'} display={'flex'} justifyContent={'space-between'}>
                        <span className="font-normal">Semua Kategori</span>
                        <ChevronDown />
                      </Button>
                    </MenuTrigger>
                    <MenuContent>
                      <MenuItem value="new-txt">New Text File</MenuItem>
                      <MenuItem value="new-file">New File...</MenuItem>
                      <MenuItem value="new-win">New Window</MenuItem>
                      <MenuItem value="open-file">Open File...</MenuItem>
                      <MenuItem value="export">Export</MenuItem>
                    </MenuContent>
                  </MenuRoot>
                  </GridItem>
                  <GridItem>
                  <MenuRoot>
                    <MenuTrigger asChild>
                    <Button variant={"outline"}  width={'100%'} display={'flex'} justifyContent={'space-between'}>
                        <span className="font-normal">Urutkan</span>
                        <ChevronDown />
                      </Button>
                    </MenuTrigger>
                    <MenuContent>
                      <MenuItem value="new-txt">New Text File</MenuItem>
                      <MenuItem value="new-file">New File...</MenuItem>
                      <MenuItem value="new-win">New Window</MenuItem>
                      <MenuItem value="open-file">Open File...</MenuItem>
                      <MenuItem value="export">Export</MenuItem>
                    </MenuContent>
                  </MenuRoot>
                  </GridItem>
                </Grid>
                </Box>
              </Tabs.Content>
              <Tabs.Content value="aktif">Manage your projects</Tabs.Content>
              <Tabs.Content value="tidak aktif">
                Manage your tasks for freelancers
              </Tabs.Content>
            </Tabs.Root>
          </Box>
                
    )
}

export default ComponentProduct 