import { Switch } from '@/components/ui/switch';
import { toggleProductStatus } from '@/features/auth/services/product-service';
import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

interface ProductProps {
  productId: string;
  initialStatus: boolean;
  onStatusChange: (id: string, newStatus: boolean) => void;
}

const ProductToggleSwitch: React.FC<ProductProps> = ({ productId, initialStatus, onStatusChange }) => {
  const [isActive, setIsActive] = useState<boolean>(initialStatus);

  useEffect(() => {
    setIsActive(initialStatus); // Update state jika `initialStatus` berubah
  }, [initialStatus]);

  const handleToggleChange = async () => {
    const token = Cookies.get('token');
    const newStatus = !isActive;

    try {
      await toggleProductStatus(productId, token!, newStatus);
      setIsActive(newStatus);
      onStatusChange(productId, newStatus);
      toast.success(`Produk ${newStatus ? 'diaktifkan' : 'dinonaktifkan'}!`);
    } catch (error) {
      console.error('Failed to toggle product status:', error);
      toast.error('Gagal mengubah status produk.');
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Text>{isActive ? 'Active' : 'Inactive'}</Text>
      <Switch checked={isActive} onChange={handleToggleChange} colorPalette="blue" size="lg" />
    </Box>
  );
};

export default ProductToggleSwitch;
