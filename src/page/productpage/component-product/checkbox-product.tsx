import { Checkbox } from '@/components/ui/checkbox';
import {  } from '@chakra-ui/react';

interface CheckBoxProps {
  checked: boolean;
  onCheckedChange: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onCheckedChange }) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onCheckedChange}
      colorPalette={'blue'}
      size="md"
      cursor={'pointer'}
    />
  );
};

export default CheckBox;
