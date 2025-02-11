import { Field } from '@/components/ui/field';
import { Box, Group, Image, Input, InputAddon, Text, Textarea, VStack } from '@chakra-ui/react';
import React from 'react'
import CategoryDropdown from '../component-product/category-detail-product';
import { X } from 'lucide-react';

const ProductInfoForm: React.FC<any> = ({
    errors,
    register,
    previewImages,
    handleRemoveImage,
    handleFileChange,
    categoryId
}) => {
    return (
        <>
            <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
                <Text fontSize={'24px'} fontWeight={'bold'}>
                    Informasi Produk
                </Text>
                <Box display={'flex'} flexDirection={'column'} gap={4} mt={5}>
                    <Field label="Nama Produk">
                        <Input placeholder="Masukan Nama Produk" {...register('name')} />
                        {errors.name && (
                            <Text color={'red.500'} fontSize={'xs'} textAlign={'left'} marginTop={'1.5'}>
                                {errors.name.message}
                            </Text>
                        )}
                    </Field>
                    <Field label="URL Halaman Checkout">
                        <Group attached width={'full'}>
                            <InputAddon>lakoe.store/</InputAddon>
                            <Input placeholder="nama-produk" {...register('url')} />
                        </Group>
                        {errors.url && (
                            <Text color={'red.500'} fontSize={'xs'} textAlign={'left'} marginTop={'1.5'}>
                                {errors.url.message}
                            </Text>
                        )}
                    </Field>
                    <Field label="Kategori" position={'relative'}>
                        <CategoryDropdown selectedCategoryId={categoryId} />
                    </Field>
                </Box>
            </Box>
            <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
                <Text fontSize={'24px'} fontWeight={'bold'}>
                    Detail Produk
                </Text>
                <Box display={'flex'} flexDirection={'column'} gap={4} mt={5}>
                    <Field label="Deskripsi">
                        <Textarea placeholder="Masukan informasi lebih lengkap tentang produk kamu" h={40} {...register('description')} />
                        {errors.description && (
                            <Text color="red.500" fontSize={'xs'} textAlign={'left'} marginTop={'1.5'}>
                                {errors.description.message}
                            </Text>
                        )}
                    </Field>
                    <Box>
                        <Field label="Foto Produk" mb={2}></Field>
                        <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <VStack
                                    key={index}
                                    border="2px dashed gray"
                                    borderRadius="md"
                                    width="full"
                                    height="180px"
                                    align="center"
                                    justify="center"
                                    position="relative"
                                    overflow="hidden"
                                    cursor="pointer"
                                    onClick={() =>
                                        document.getElementById(`file-upload-${index}`)?.click()
                                    } // Klik untuk upload
                                >
                                    {previewImages[index] ? (
                                        <>
                                            <Image
                                                src={previewImages[index]}
                                                alt={`Foto ${index + 1}`}
                                                boxSize="full"
                                                objectFit="cover"
                                            />
                                            <Box
                                                position="absolute"
                                                top="2"
                                                right="2"
                                                bg="red.500"
                                                color="white"
                                                borderRadius="4px"
                                                width="20px"
                                                height="20px"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                fontWeight="bold"
                                                cursor="pointer"
                                                _hover={{ bg: 'red.600' }}
                                                p={1}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Mencegah trigger upload saat tombol hapus diklik
                                                    handleRemoveImage(index);
                                                }}
                                            >
                                                <X />
                                            </Box>
                                        </>
                                    ) : (
                                        <>
                                            {/* Placeholder untuk upload */}
                                            <Text fontSize="sm" color="gray.500">
                                                {index === 0 ? 'Foto Utama' : `Foto ${index + 1}`}
                                            </Text>
                                        </>
                                    )}
                                    <Input
                                        id={`file-upload-${index}`}
                                        type="file"
                                        accept="image/*"
                                        display="none"
                                        onChange={(e) => handleFileChange(e, index)}
                                    />
                                </VStack>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ProductInfoForm