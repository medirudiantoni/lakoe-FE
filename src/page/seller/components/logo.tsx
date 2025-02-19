import { HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface SellerLogoProps {
  imageSrc?: string;
  brandName: string;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

const SellerLogo: React.FC<SellerLogoProps> = ({
  imageSrc,
  brandName,
  fontSize = 'xl',
}) => {
  return (
    <HStack>
      {imageSrc && <Image src={imageSrc} maxW="12"></Image>}
      <Text fontSize={fontSize} fontWeight="bold" className="font-poppins">
        {brandName}
      </Text>
    </HStack>
  );
};

export default SellerLogo;
