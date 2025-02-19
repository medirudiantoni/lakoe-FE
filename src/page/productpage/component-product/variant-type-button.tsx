import { Button } from '@/components/ui/button';
import React, { PropsWithChildren } from 'react';

interface ButtonVariantTypeProps extends PropsWithChildren {
  onClick?: () => void;
  status: boolean;
}

const ButtonVariantType: React.FC<ButtonVariantTypeProps> = ({
  children,
  onClick,
  status = false,
}) => {
  return (
    <>
      {status ? (
        <Button
          onClick={onClick}
          variant="surface"
          borderRadius={'20px'}
          colorPalette={'cyan'}
        >
          {children}
        </Button>
      ) : (
        <Button onClick={onClick} variant="outline" borderRadius={'20px'}>
          {children}
        </Button>
      )}
    </>
  );
};

export default ButtonVariantType;
