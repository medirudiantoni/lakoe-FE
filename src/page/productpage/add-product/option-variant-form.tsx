import { Field } from '@/components/ui/field';
import { VariantOptionType } from '@/features/auth/types/prisma-types';
import { Box, Center, HStack, Input } from '@chakra-ui/react';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Props {
  label: string;
  index: number;
  onDataChange?: (data: VariantOptionType[]) => void;
}

const VariantOptionsForm: React.FC<Props> = ({ label, onDataChange }) => {
  const [inputText, setInputText] = useState('');
  const [variantOptionNames, setVariantOptionNames] = useState<
    VariantOptionType[]
  >([]);

  useEffect(() => {
    onDataChange && onDataChange(variantOptionNames);
  }, [variantOptionNames]);

  const removeInputValue = (value: string) => {
    setVariantOptionNames((prev) => prev.filter((item) => item.name !== value));
  };

  const addInputValue = (
    event: React.KeyboardEvent<HTMLInputElement>,
    value: string
  ) => {
    if (event.key === 'Enter' && value.trim()) {
      event.preventDefault();
      setVariantOptionNames((prev) => [
        ...prev,
        {
          name: value,
          variantOptionValues: [],
        },
      ]);
      setInputText('');
    }
  };
  return (
    <Box mb="5">
      <Field label={label} mt={5}>
        <HStack
          w="full"
          px={2}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="md"
        >
          {variantOptionNames.map((item, id) => (
            <HStack
              key={id}
              gap={1}
              pl="2"
              pr="0.5"
              bgColor="gray.200"
              borderRadius={4}
            >
              <p>{item.name}</p>
              <Center
                onClick={() => removeInputValue(item.name)}
                role="button"
                w="5"
                h="5"
                _hover={{ bg: 'gray.300' }}
                borderRadius={4}
                cursor="pointer"
              >
                <X />
              </Center>
            </HStack>
          ))}
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
  );
};

export default VariantOptionsForm;
