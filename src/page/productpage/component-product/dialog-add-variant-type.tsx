import { Button } from '@/components/ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Input, Stack } from '@chakra-ui/react';
import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

interface ButtonDialogVariantTypeProps {
  value: (val: string) => void;
}

const ButtonDialogVariantType: React.FC<ButtonDialogVariantTypeProps> = ({
  value,
}) => {
  const [isValue, setValue] = useState('');
  const handleSetValue = () => {
    value(isValue);
    setValue('');
  };
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" borderRadius={'20px'}>
          <CirclePlus />
          Buat Tipe Varian
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah tipe varian baru</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={4}>
            <Field label="Nama Variant">
              <Input
                value={isValue}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Nama Variant Baru"
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Batal</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button onClick={handleSetValue}>Simpan</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ButtonDialogVariantType;
