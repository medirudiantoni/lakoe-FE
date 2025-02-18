import { Field } from '@/components/ui/field';
import { Box, Group, Input, InputAddon, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  register: any;
  errors: any;
  isVariantDefault: boolean;
}

const PriceSectionForm: React.FC<Props> = ({
  register,
  errors,
  isVariantDefault,
}) => {
  return (
    <Box
      p={3}
      m={4}
      backgroundColor={'white'}
      borderRadius={10}
      display={'flex'}
      flexDirection={'column'}
    >
      {isVariantDefault && (
        <>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            Harga
          </Text>
          <Field label="Harga" mt={5}>
            <Group attached width={'full'}>
              <InputAddon>Rp</InputAddon>
              <Input
                placeholder="Masukan harga satuan barang"
                {...register('price')}
              />
            </Group>
            {errors.price && (
              <Text
                color={'red.500'}
                fontSize={'xs'}
                textAlign={'left'}
                marginTop={'1.5'}
              >
                {errors.price.message}
              </Text>
            )}
          </Field>
        </>
      )}

      <Field label="Minimal pembelian" mt={3}>
        <Group attached width={'full'}>
          <Input placeholder="1" {...register('minimumOrder')} />
          <InputAddon>Produk</InputAddon>
        </Group>
        {errors.minimumOrder && (
          <Text
            color={'red.500'}
            fontSize={'xs'}
            textAlign={'left'}
            marginTop={'1.5'}
          >
            {errors.minimumOrder.message}
          </Text>
        )}
      </Field>
    </Box>
  );
};

export default PriceSectionForm;
