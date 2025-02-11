import { Button } from '@/components/ui/button';
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import { VariantOptionValueType } from '@/features/auth/types/prisma-types';
import { Box, Group, Input, InputAddon } from '@chakra-ui/react'
import { NotebookPen } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface Props {
    variantName: string;
    dataValues?: (data: VariantOptionValueType) => void;
    dataPlaceHolder?: VariantOptionValueType | null;
}

// export interface VariantOptionValues {
//     isActive: boolean;
//     price: number;
//     sku: string;
//     stock: number;
//     weight: number;
// }

const VariantAllOptionForm: React.FC<Props> = ({ variantName, dataValues, dataPlaceHolder }) => {
    const [data, setData] = useState<VariantOptionValueType>({
        isActive: true,
        price: 0,
        sku: "",
        stock: 0,
        weight: 0
    });

    useEffect(() => {
        if (dataPlaceHolder)
            setData(dataPlaceHolder)
    }, [dataPlaceHolder])

    // useEffect(() => {
    //     dataValues && dataValues(data);
    //     console.log("values: ", data)
    // }, [data]);

    const handelSetAllOption = () => {
        dataValues && dataValues(data);
    }

    return (
        <DialogRoot placement={"center"} closeOnInteractOutside={false} size="xl">
            <DialogTrigger asChild>
                <Button variant={'solid'} colorPalette={'blue'} borderRadius={'50px'}>
                    <NotebookPen />
                    <span className="ms-2">Atur Sekaligus</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Atur Sekaligus
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Box>
                        <Box display={'flex'} gap={3} alignItems={'center'} mt={1}>
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
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Batal</Button>
                    </DialogActionTrigger>
                    <DialogActionTrigger asChild>
                        <Button onClick={handelSetAllOption}>Terapkan</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
        // <Box w="full" px={3} pb={5} my={2} className='border-2 rounded-lg bg-slate-50'>
        //     <Box display={'flex'} gap={3} alignItems={'center'} mt={5}>
        //         <span className="font-medium text-md text-blue-700">{variantName}</span>
        //         <Switch 
        //             size={'lg'} 
        //             colorPalette={'blue'} 
        //             checked={data.isActive}
        //             onCheckedChange={() => setData({...data, isActive: !data.isActive})}
        //         />
        //         <span>Aktif</span>
        //     </Box>
        //     <Box display={'flex'} gap={'3'}>
        //         <Field label="Harga" mt={5} width={'55%'}>
        //             <Group attached>
        //                 <InputAddon>Rp</InputAddon>
        //                 <Input
        //                     type='number'
        //                     onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
        //                     placeholder="Masukan harga barang" />
        //             </Group>
        //         </Field>
        //         <Field label="Stock Produk" mt={5} width={'45%'}>
        //             <Input
        //                 type='number'
        //                 onChange={(e) => setData({ ...data, stock: Number(e.target.value) })}
        //                 placeholder="Masukan jumlah stock"
        //             />
        //         </Field>
        //     </Box>
        //     <Box display={'flex'} gap={'3'}>
        //         <Field label="SKU(Stock Keeping)" mt={5} width={'55%'}>
        //             <Input
        //                 type='text'
        //                 value={data.sku}
        //                 onChange={(e) => setData({ ...data, sku: e.target.value })}
        //                 placeholder="Masukan SKU"
        //                 />
        //         </Field>
        //         <Field label="Berat Produk" mt={5} width={'45%'}>
        //             <Group attached width={'full'}>
        //                 <Input
        //                     type='number'
        //                     onChange={(e) => setData({ ...data, weight: Number(e.target.value) })}
        //                     placeholder="Masukan berat produk" />
        //                 <InputAddon>Gram</InputAddon>
        //             </Group>
        //         </Field>
        //     </Box>
        // </Box>
    )
}

export default VariantAllOptionForm