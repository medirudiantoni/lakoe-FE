import LoadingButtonLottie from '@/components/icons/loading-button';
import { Button } from '@/components/ui/button';
import { Box } from '@chakra-ui/react';
import React from 'react';

const ButtonsSectionForm: React.FC<any> = ({ isLoading, isUpdateCase }) => {
  return (
    <Box
      p={3}
      pb={20}
      m={4}
      backgroundColor={'white'}
      borderRadius={10}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <Button variant="outline" borderRadius={'20px'}>
          Preview Halaman Checkout
        </Button>
        <Box display={'flex'} gap={2}>
          <Button variant="outline" borderRadius={'20px'}>
            Batal
          </Button>
          <Button
            type="submit"
            variant="solid"
            colorPalette={'blue'}
            borderRadius={'20px'}
            _active={{ bg: 'blue.800', transform: 'scale(0.95)' }}
            transitionDuration={'fast'}
          >
            {isLoading ? (
              <LoadingButtonLottie />
            ) : isUpdateCase ? (
              'Simpan Perubahan'
            ) : (
              'Tambah produk'
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ButtonsSectionForm;
