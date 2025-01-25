import { Field } from '@/components/ui/field';
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '@/components/ui/file-upload';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface FormValues {
  slogan: string;
  nameStore: string;
}
export function InformationSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <Box>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'semibold'} fontSize={'20px'}>
          Informasi Pribadi
        </Text>
      </Flex>
      <Grid
        templateColumns={'repeat(2, 1fr)'}
        gap={3}
        borderBottom={'1px solid'}
        borderColor={'gray.300'}
        py={'5'}
      >
        <GridItem>
          <Box>
            <form onSubmit={onSubmit} className="w-full">
              <Stack gap="4" align="flex-start" width={'full'}>
                <Field
                  label="Slogan"
                  invalid={!!errors.slogan}
                  errorText={errors.slogan?.message}
                >
                  <Input
                    {...register('slogan', {
                      required: 'Slogan is required',
                    })}
                    placeholder="Buat slogan untuk toko"
                  />
                </Field>
                <Field
                  label="Nama Toko"
                  invalid={!!errors.nameStore}
                  errorText={errors.nameStore?.message}
                >
                  <Input
                    {...register('nameStore', {
                      required: 'Nama Toko is required',
                    })}
                    placeholder="Buat nama untuk toko"
                  />
                </Field>
                <Button colorPalette={'blue'} type="submit">Submit</Button>
              </Stack>
            </form>
          </Box>
        </GridItem>
        <GridItem>
          <Field label="Deskripsi">
            <Textarea placeholder="Comment..." h={'124px'} />
          </Field>
        </GridItem>
      </Grid>
      <Flex justifyContent={'space-between'} alignItems={'center'} my={5}>
        <Text fontWeight={'semibold'} fontSize={'20px'}>
          Logo Toko
        </Text>
      </Flex>
      <Box display={'flex'} width={'full'} gap={3} pb={10}>
        <FileUploadRoot maxW="4/12" alignItems="stretch" maxFiles={10}>
          <FileUploadRoot
            maxW="xs"
            alignItems="stretch"
            maxFiles={10}
            cursor={'pointer'}
          >
            <FileUploadDropzone
              label="Drag and drop here to upload"
              description="Foto 1"
            />
            <FileUploadList />
          </FileUploadRoot>
        </FileUploadRoot>
      </Box>
    </Box>
  );
}
