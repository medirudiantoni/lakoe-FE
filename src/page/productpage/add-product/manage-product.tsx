import { Field } from '@/components/ui/field'
import { Box, Input, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    errors: any;
    register: any;
}

const ManageProductSectionForm: React.FC<Props> = ({ errors, register }) => {

    return (
        <Box
            p={3}
            m={4}
            backgroundColor={'white'}
            borderRadius={10}
            display={'flex'}
            flexDirection={'column'}
        >
            <Text fontSize={'24px'} fontWeight={'bold'}>
                Pengelolaan Produk
            </Text>
            <Box display={'flex'} gap={3}>
                <Field label="Stok Produk" mt={5}>
                    <Input placeholder="Masukan stok barang" {...register('stock')} />
                    {errors.stock && (
                        <Text
                            color={'red.500'}
                            fontSize={'xs'}
                            textAlign={'left'}
                            marginTop={'1.5'}
                        >
                            {errors.stock.message}
                        </Text>
                    )}
                </Field>
                <Field label="SKU (Stock Keeping Unit)" mt={5}>
                    <Input placeholder="Masukan SKU" {...register('sku')} />
                    {errors.sku && (
                        <Text
                            color={'red.500'}
                            fontSize={'xs'}
                            textAlign={'left'}
                            marginTop={'1.5'}
                        >
                            {errors.sku.message}
                        </Text>
                    )}
                </Field>
            </Box>
        </Box>
    )
}

export default ManageProductSectionForm