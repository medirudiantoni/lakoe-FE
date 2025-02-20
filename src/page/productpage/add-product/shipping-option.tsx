import { Field } from '@/components/ui/field';
import { Box, Group, Input, InputAddon, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  errors: any;
  register: any;
  isVariantDefault: boolean;
}

const ShippingOptionSectionForm: React.FC<Props> = ({
  errors,
  register,
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
            Berat dan Pengiriman
          </Text>
          <Field label="Berat Produk" mt={5}>
            <Group attached width={'full'}>
              <Input
                placeholder="Masukan berat produk"
                {...register('weight')}
                type="number"
              />
              <InputAddon>gram</InputAddon>
            </Group>
            {errors.weight && (
              <Text
                color={'red.500'}
                fontSize={'xs'}
                textAlign={'left'}
                marginTop={'1.5'}
              >
                {errors.weight.message}
              </Text>
            )}
          </Field>
        </>
      )}
      <Box display={'flex'} alignItems={'end'} gap={3} mt={3}>
        <Field label="Ukuran Produk">
          <Group attached width={'full'}>
            <Input
              placeholder="Panjang"
              type="number"
              {...register('size.length', { valueAsNumber: true })}
            />
            <InputAddon>cm</InputAddon>
          </Group>
          {errors.size?.length && (
            <Text
              color={'red.500'}
              fontSize={'xs'}
              textAlign={'left'}
              marginTop={'1.5'}
            >
              {errors.size.length.message}
            </Text>
          )}
        </Field>
        <Field>
          <Group attached width={'full'}>
            <Input
              placeholder="Lebar"
              type="number"
              {...register('size.width', { valueAsNumber: true })}
            />
            <InputAddon>cm</InputAddon>
          </Group>
          {errors.size?.width && (
            <Text
              color={'red.500'}
              fontSize={'xs'}
              textAlign={'left'}
              marginTop={'1.5'}
            >
              {errors.size.width.message}
            </Text>
          )}
        </Field>
        <Field>
          <Group attached width={'full'}>
            <Input
              placeholder="Tinggi"
              type="number"
              {...register('size.height', { valueAsNumber: true })}
            />
            <InputAddon>cm</InputAddon>
          </Group>
          {errors.size?.height && (
            <Text
              color={'red.500'}
              fontSize={'xs'}
              textAlign={'left'}
              marginTop={'1.5'}
            >
              {errors.size.height.message}
            </Text>
          )}
        </Field>
      </Box>
    </Box>
  );
};

export default ShippingOptionSectionForm;
