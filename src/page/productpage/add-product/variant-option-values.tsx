import { Field } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import { VariantOptionValueType } from '@/features/auth/types/prisma-types';
import { Box, Group, Input, InputAddon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

interface Props {
    register?: any;
    errors?: any;
    variantName: string;
    dataValues?: (data: VariantOptionValueType) => void;
    dataPlaceHolder?: VariantOptionValueType;
}

// export interface VariantOptionValues {
//     isActive: boolean;
//     price: number;
//     sku: string;
//     stock: number;
//     weight: number;
// }

const VariantOptionValuesForm: React.FC<Props> = ({ variantName, dataValues, dataPlaceHolder }) => {
    const [data, setData] = useState<VariantOptionValueType>({
        isActive: true,
        price: 0,
        sku: "",
        stock: 0,
        weight: 0
    });

    // useEffect(() => {
    //     console.log("dt: ", data)
    // }, [data])

    useEffect(() => {
        if (dataPlaceHolder) {
            // console.log("dt plchldr: ", dataPlaceHolder)
            setData(dataPlaceHolder)
        }
    }, [dataPlaceHolder]);

    // useEffect(() => {
    //     dataValues && dataValues(data);
    //     console.log("values: ", data)
    // }, [data]);

    const sendDataToParent = () => {
        dataValues && dataValues(data);
    }

    return (
        <Box onMouseLeave={sendDataToParent} onBlur={sendDataToParent} w="full" px={3} pb={5} my={2} className='border-2 rounded-lg bg-slate-50'>
            <Box display={'flex'} gap={3} alignItems={'center'} mt={5}>
                <span className="font-medium text-md text-blue-700">{variantName}</span>
                <Switch
                    size={'lg'}
                    colorPalette={'blue'}
                    checked={data.isActive}
                    onCheckedChange={() => setData({ ...data, isActive: !data.isActive })}
                />
                <span>Aktif</span>
            </Box>
            <Box display={'flex'} gap={'3'}>
                <Field label="Harga" mt={5} width={'55%'}>
                    <Group attached>
                        <InputAddon>Rp</InputAddon>
                        <Input
                            type='number'
                            value={data.price}
                            onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
                            placeholder="Masukan harga barang" />
                    </Group>
                </Field>
                <Field label="Stock Produk" mt={5} width={'45%'}>
                    <Input
                        type='number'
                        value={data.stock}
                        onChange={(e) => setData({ ...data, stock: Number(e.target.value) })}
                        placeholder="Masukan jumlah stock"
                    />
                </Field>
            </Box>
            <Box display={'flex'} gap={'3'}>
                <Field label="SKU(Stock Keeping)" mt={5} width={'55%'}>
                    <Input
                        type='text'
                        value={data.sku}
                        onChange={(e) => setData({ ...data, sku: e.target.value })}
                        placeholder="Masukan SKU"
                    />
                </Field>
                <Field label="Berat Produk" mt={5} width={'45%'}>
                    <Group attached width={'full'}>
                        <Input
                            type='number'
                            value={data.weight}
                            onChange={(e) => setData({ ...data, weight: Number(e.target.value) })}
                            placeholder="Masukan berat produk" />
                        <InputAddon>Gram</InputAddon>
                    </Group>
                </Field>
            </Box>
        </Box>
    )
}

export default VariantOptionValuesForm