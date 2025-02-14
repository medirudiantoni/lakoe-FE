import { Button } from '@/components/ui/button'
import { Box, HStack, Text } from '@chakra-ui/react'
import { CirclePlus, RotateCcw } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import ButtonVariantType from '../component-product/variant-type-button'
import ButtonDialogVariantType from '../component-product/dialog-add-variant-type'
import Cookies from 'js-cookie'
import ItemVariantTypeForm from './item-variant-form'
import VariantOptionValuesForm from './variant-option-values'
import VariantAllOptionForm from './variant-all'
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useParams } from 'react-router'
import { ProductType, VariantOptionType, VariantOptionValueType, VariantType } from '@/features/auth/types/prisma-types'

interface Props {
    onChangeVariantData?: (data: VariantType[]) => void;
    isVariantType: boolean;
    setIsVariantType: (value: boolean) => void;
    productDataUpdateCase?: ProductType | null;
}

const VariantSectionForm: React.FC<Props> = ({ onChangeVariantData, setIsVariantType, isVariantType, productDataUpdateCase }) => {
    const { productId } = useParams();
    const [variantTypeNames, setVariantTypeNames] = useState<string[]>([]);
    const [variantData, setVariantData] = useState<VariantType[]>([]);
    const [allVariantsValues, setAllVariantsValues] = useState<VariantOptionValueType | null>(null);
    const [firstMount, setFirstMount] = useState<boolean>(true);

    useEffect(() => {
        console.log("var data: ", variantData)
    }, [variantData])

    useEffect(() => {
        if (productId && productDataUpdateCase) {
            setVariantData(productDataUpdateCase.variants!)
        };
    }, [productId, productDataUpdateCase]);

    const generateCombinations = useCallback((variants: VariantType[], currentFinal?: VariantType): VariantOptionType[] => {
        const regularVariants = variants.filter(v => v.name !== 'final');
        if (regularVariants.length === 0) return [];

        let combinations: VariantOptionType[] = [];

        const combine = (current: string[], variantIndex: number) => {
            if (variantIndex === regularVariants.length) {
                const combinationName = current.join(' ');
                // Cari nilai existing dari final yang sebelumnya
                const existingOption = currentFinal?.variantOptions?.find(
                    opt => opt.name === combinationName
                );

                combinations.push({
                    name: combinationName,
                    variantOptionValues: existingOption?.variantOptionValues || [{
                        sku: '',
                        weight: 0,
                        stock: 0,
                        price: 0,
                        isActive: true,
                    }]
                });
                return;
            }

            const currentVariant = regularVariants[variantIndex];
            const options = currentVariant.variantOptions;

            options?.forEach(option => {
                combine([...current, option.name], variantIndex + 1);
            });
        };

        combine([], 0);
        return combinations;
    }, []);

    useEffect(() => {
        const regularVariants = variantData.filter(v => v.name !== 'final');
        const currentFinal = variantData.find(v => v.name === 'final');

        if (regularVariants.length > 0 && regularVariants.every(v => v.variantOptions && v.variantOptions.length > 0)) {
            const combinations = generateCombinations(regularVariants, currentFinal);

            // Hanya update jika kombinasi berubah
            const currentCombinations = currentFinal?.variantOptions || [];
            if (JSON.stringify(currentCombinations) !== JSON.stringify(combinations)) {
                setVariantData(prev => {
                    const nonFinalVariants = prev.filter(v => v.name !== 'final');
                    return [
                        ...nonFinalVariants,
                        {
                            name: 'final',
                            isActive: true,
                            variantOptions: combinations
                        }
                    ];
                });
            }
        }
    }, [variantData, generateCombinations]);

    /* ------------------------------------------------------------------- DIKIRIM KE PARENT START */
    useEffect(() => {
        onChangeVariantData && onChangeVariantData(variantData);
    }, [variantData, onChangeVariantData]);
    /* --------------------------------------------------------------------- DIKIRIM KE PARENT END */

    /* ------------------------------------------------------------------------ VARIANT NAME START */
    useEffect(() => {
        const variantFromCookie = Cookies.get("variant-names");
        if (!variantFromCookie) {
            const variantNames = ["warna", "ukuran"];
            setVariantTypeNames(variantNames);
            Cookies.set("variant-names", JSON.stringify(variantNames));
        } else {
            try {
                const parsedVarCook = JSON.parse(variantFromCookie);
                if (Array.isArray(parsedVarCook)) {
                    setVariantTypeNames(parsedVarCook);
                }
            } catch (error) {
                console.error("Error parsing cookie data:", error);
            }
        }
    }, []);
    useEffect(() => {
        if (variantTypeNames.length > 0) {
            Cookies.set("variant-names", JSON.stringify(variantTypeNames));
        }
    }, [variantTypeNames]);
    /* -------------------------------------------------------------------------- VARIANT NAME END */

    /* ------------------------------------------------------------ VARIANT TOGGLE AND FINAL START */
    const handleVariantToggle = useCallback((variant: string) => {
        setVariantData(prev => {
            const existingVariant = prev.find(item => item.name === variant);

            if (existingVariant) {
                if (prev.length === 2) {
                    return [];
                } else {
                    return prev.filter(item => item.name !== variant && item.name !== 'final');
                }
            } else {
                const newVariant = {
                    name: variant,
                    isActive: true,
                    variantOptions: []
                };
                const nonFinalVariants = prev.filter(item => item.name !== 'final');
                return [...nonFinalVariants, newVariant];
            }
        });
    }, []);
    /* -------------------------------------------------------------- VARIANT TOGGLE AND FINAL END */

    /* ----------------------------------------------------------------- HANDLE VARIANT DATA START */
    const handleDataVariant = useCallback((data: VariantOptionType[], name: string, isActive: boolean) => {
        setVariantData(prev => {
            const newState = [...prev];
            const existingVarId = newState.findIndex(item => item.name === name);

            if (existingVarId !== -1) {
                newState[existingVarId] = {
                    name,
                    isActive,
                    variantOptions: data
                };
            } else {
                newState.push({
                    name,
                    isActive,
                    variantOptions: data
                });
            }

            // Filter out final variant as it will be regenerated
            if (firstMount) {
                setFirstMount(false);
                return newState;
            } else {
                return newState.filter(v => v.name !== 'final');
            }
        });
    }, []);
    /* ----------------------------------------------------------------- HANDLE VARIANT DATA END */

    /* ------------------------------------------------------------------- HANDLE FINAL DATA START */
    const handleDataOptionValues = useCallback((optionName: string, data: VariantOptionValueType) => {
        setVariantData(prevState => {
            const newState = prevState.map(variant => {
                if (variant.name === 'final') {
                    return {
                        ...variant,
                        variantOptions: variant.variantOptions?.map(option => {
                            if (option.name === optionName) {
                                return {
                                    ...option,
                                    variantOptionValues: option.variantOptionValues && [{
                                        ...option.variantOptionValues[0],
                                        ...data
                                    }]
                                };
                            }
                            return option;
                        })
                    };
                }
                return variant;
            });

            // Log untuk debugging
            // console.log('Updated State:', newState);
            return newState;
        });
    }, []);
    /* ------------------------------------------------------------------- HANDLE FINAL DATA END */

    /* ------------------------------------------------------------------- HANDLE ALL OPTION FINAL DATA START */
    const handleBulkUpdate = (data: VariantOptionValueType) => {
        setAllVariantsValues(data);
        setVariantData(prev => {
            return prev.map(variant => {
                if(variant.name === "final"){
                    variant.variantOptions?.map(option => {
                        option.variantOptionValues?.map(val => {
                            val.isActive = data.isActive,
                            val.sku = (`${data.sku.toUpperCase()}-${Array.from(option.name).map(e => e === " " ? "-" : e).join("").toUpperCase()}`),
                            val.price = data.price,
                            val.stock = data.stock,
                            val.weight = data.weight
                        })
                    });
                }
                return variant;
            })
        });
    };
    /* ------------------------------------------------------------------- HANDLE ALL OPTION FINAL DATA END */

    /* ------------------------------------------------------------------------------ HANDLE RESET ALL DATA START */
    const handleResetAllData = () => {
        setVariantData([]);
    }
    /* ------------------------------------------------------------------------------ HANDLE RESET ALL DATA END */

    return (
        <Box py={3} m={4} mb={10} backgroundColor={'white'} borderRadius={10} borderBottom={1} borderBottomColor="blue">
            <Box px={3} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                    <Text fontSize={'24px'} fontWeight={'bold'}>Variant</Text>
                    <Text>Tambah varian agar pembeli dapat memilih produk yang sesuai, yuk!</Text>
                </Box>
                <HStack>
                    <Button onClick={() => setIsVariantType(!isVariantType)} variant={'outline'} borderRadius={'50px'}>
                        <CirclePlus />
                        <span className="ms-2">Tambahkan Variant</span>
                    </Button>
                    {variantData.length > 1 && (
                        <DialogRoot role="alertdialog">
                            <DialogTrigger asChild>
                                <Button bg="red.100" borderColor="red.200" color="red.700" gap={0} onClick={() => setIsVariantType(!isVariantType)} variant={'outline'} borderRadius={'50px'}>
                                    <RotateCcw />
                                    <span className="ms-2">Reset Varian</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Apakah Kamu Yakin?</DialogTitle>
                                </DialogHeader>
                                <DialogBody>
                                    <p>
                                        Jika dihapus maka data tidak dapat dipulihkan dan anda akan membuat data ulang dari awal jika ingin membuat varian produk
                                    </p>
                                </DialogBody>
                                <DialogFooter>
                                    <DialogActionTrigger asChild>
                                        <Button variant="outline">Batal</Button>
                                    </DialogActionTrigger>
                                    <Button colorPalette="red" onClick={handleResetAllData}>Hapus</Button>
                                </DialogFooter>
                                <DialogCloseTrigger />
                            </DialogContent>
                        </DialogRoot>
                    )}
                </HStack>
            </Box>

            {/* Variant Type Name Form Start */}
            {isVariantType && (
                <Box px={3} display={'flex'} flexWrap="wrap" gap={3} mt={6}>
                    {variantTypeNames.map((name, id) => (
                        <ButtonVariantType
                            onClick={() => handleVariantToggle(name)}
                            key={id}
                            status={variantData.some(item => item.name === name)}
                        >{name}</ButtonVariantType>
                    ))}
                    <ButtonDialogVariantType
                        value={(e) => setVariantTypeNames([...variantTypeNames, e])}
                    />
                </Box>
            )}
            {/* Variant Type Name Form End */}
            {variantData.map((variant, id) => (
                variant.name !== "final" && (
                    <ItemVariantTypeForm
                        key={id}
                        index={id}
                        label={variant.name}
                        onDataChange={(data) => handleDataVariant(data, variant.name, true)}
                        itemVariantUpdateCase={variant.variantOptions}
                    />
                )
            ))}
            {/* Variant Type Item End */}

            {/* Atur Sekaligus start */}
            {variantData.length !== 0 && (
                <Box px={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={5}>
                    <Box>
                        <Text fontSize={'24px'} fontWeight={'bold'}>
                            Daftar Varian
                        </Text>
                        <Text>Kamu dapat mengatur harga, stok dan SKU sekaligus</Text>
                    </Box>
                    <VariantAllOptionForm
                        variantName='Semua'
                        dataValues={handleBulkUpdate}
                        dataPlaceHolder={allVariantsValues ? allVariantsValues : null}
                    />
                </Box>
            )}
            {/* Atur Sekaligus end */}


            {/* Variant Final Start */}
            {variantData.map((variant) => (
                variant.name === "final" ? (
                    variant.variantOptions?.map((option, id) => (
                        <VariantOptionValuesForm
                            key={id}
                            variantName={option.name}
                            dataValues={(data) => handleDataOptionValues(option.name, data)}
                            dataPlaceHolder={option.variantOptionValues && option.variantOptionValues[0]}
                        />
                    ))
                ) : null
            ))}
            {/* Variant Final End */}

        </Box>
    );
};

export default VariantSectionForm;