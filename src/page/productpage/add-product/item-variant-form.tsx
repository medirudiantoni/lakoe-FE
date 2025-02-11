import { Field } from '@/components/ui/field'
import { Box, Center, HStack, Input, Text } from '@chakra-ui/react'
import { X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
// import { VariantOptionValues } from './variant-option-values'
import { VariantOptionType, VariantOptionValueType, VariantType } from '@/features/auth/types/prisma-types'
import { useParams } from 'react-router'

interface Props {
    label: string;
    index: number;
    onDataChange?: (data: VariantOptionType[]) => void;
    itemVariantUpdateCase?: VariantOptionType[];
}

// export interface VariantOptions {
//     name: string;
//     variantOptionValues: VariantOptionValueType[];
// }

const ItemVariantTypeForm: React.FC<Props> = ({ label, onDataChange, itemVariantUpdateCase }) => {
    const { productId } = useParams();
    const [inputText, setInputText] = useState("");
    const [variantOptionValues, setVariantOptionValues] = useState<VariantOptionType[]>([]);
    const [firstMount, setFirstMount] = useState<boolean>(true);

    // useEffect(() => console.log("itemVariantUpdateCase: ", itemVariantUpdateCase), [itemVariantUpdateCase]);

    useEffect(() => {
        if(productId && itemVariantUpdateCase && firstMount){
            setVariantOptionValues(itemVariantUpdateCase);
            setFirstMount(false)
        }
    }, [itemVariantUpdateCase]);

    useEffect(() => {
        onDataChange &&
            onDataChange(variantOptionValues);
    }, [variantOptionValues]);

    const removeInputValue = (value: string) => {
        setVariantOptionValues(prev => prev.filter(item => item.name !== value));
    };

    const addInputValue = (event: React.KeyboardEvent<HTMLInputElement>, value: string) => {
        if (event.key === "Enter" && value.trim()) {
            event.preventDefault();
            setVariantOptionValues(prev => [...prev, {
                name: value,
                variantOptionValues: []
            }]);
            setInputText("");
        }
    };

    return (
        <Box mb="5" px={3}>
            <Field label={label} mt={5}>
                <HStack w="full" px={2} borderWidth={1} borderColor="gray.200" borderRadius="md">
                    {
                        variantOptionValues.map((item, id) => (
                            <HStack w={"fit-content"} key={id} gap={1} pl="2" pr="0.5" bgColor="gray.200" borderRadius={4}>
                                <Text w={"fit"} whiteSpace="nowrap">{item.name}</Text>
                                <Center onClick={() => removeInputValue(item.name)} role="button" w="5" h="5" _hover={{ bg: "gray.300" }} borderRadius={4} cursor="pointer">
                                    <X />
                                </Center>
                            </HStack>
                        ))
                    }
                    <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        border="none"
                        px={0}
                        outline="none"
                        placeholder=""
                        onKeyDown={(e: any) => addInputValue(e, e.target.value)}
                    />
                </HStack>
            </Field>

        </Box>
    )
};

export default ItemVariantTypeForm;