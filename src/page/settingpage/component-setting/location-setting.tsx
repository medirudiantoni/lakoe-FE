import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import {
    Box,
    Button,
    Grid,
    GridItem,
    Input,
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { ChevronDown, MapPin } from 'lucide-react';
import { useState } from 'react';
import { DialogDelete } from '../dialog/dialog-delete';
import { DialogEdit } from '../dialog/dialog-edit';
import MapComponent from './locationApi';

export function LocationSetting() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={5}
      >
        <Box>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            Lokasi Toko
          </Text>
          <Text>Alamat ini akan digunakan sebagai alamat pengirimanmu</Text>
        </Box>
        <Button variant={'outline'} borderRadius={'50px'}>
          <DialogRoot
            lazyMount
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
          >
            <DialogTrigger asChild>
              <Text>Tambahkan Lokasi</Text>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambahkan Lokasi</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Field label="Email" required>
                  <Input placeholder="Enter your email" />
                </Field>
                <Box position={'relative'} mt={4}>
                  <MenuRoot>
                    <MenuTrigger asChild>
                      <Field label="Kota/Kecamatan" required>
                        <Button
                          variant={'outline'}
                          width={'100%'}
                          display={'flex'}
                          justifyContent={'space-between'}
                        >
                          <span className="font-normal">
                            Cari Kota/Kecamatan
                          </span>
                          <ChevronDown />
                        </Button>
                      </Field>
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
                <Box position={'relative'} mt={4}>
                  <MenuRoot>
                    <MenuTrigger asChild>
                      <Field label="Kode Pos" required>
                        <Button
                          variant={'outline'}
                          width={'100%'}
                          display={'flex'}
                          justifyContent={'space-between'}
                        >
                          <span className="font-normal">Kode Pos</span>
                          <ChevronDown />
                        </Button>
                      </Field>
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
                <Field label="Alamat" required mt={5}>
                  <Textarea placeholder="Masukan alamat"></Textarea>
                </Field>
                <MapComponent />
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <Button colorPalette={'blue'}>Save</Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </Button>
      </Box>
      <Box
        width="full"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="10px"
        mt={3}
        p={3}
      >
        <Grid templateColumns={' 1fr 2fr 1fr'}>
          <GridItem display={'flex'} flexDirection={'column'} gap={3}>
            <Text>Nama Lokasi</Text>
            <Text>Alamat</Text>
            <Text>Kota/Kecamatan</Text>
            <Text>Kode Pos</Text>
            <Text>Pinpoint</Text>
          </GridItem>
          <GridItem display={'flex'} flexDirection={'column'} gap={3}>
            <Text>Toko arya abadi</Text>
            <Text>
              Jl. Elang, No. 4, Sawah lama, Ciputat, Tangerang Selatan
            </Text>
            <Text>Kota Tangerang Selatan, Kec. Ciputat</Text>
            <Text>145173</Text>
            <Box display={'flex'} color={'blue.400'}>
            <MapPin />
            <Text color={'blue.400'}>Pinpoint</Text>
            </Box>
          
          
          </GridItem>
          <GridItem >
            <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
              <Box border={'1px solid'} p={2} borderRadius={'50px'} cursor={'pointer'}>
             <DialogDelete/>
              </Box>
              <Box border={'1px solid'} p={2} borderRadius={'50px'} cursor={'pointer'}>
              <DialogEdit/>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
