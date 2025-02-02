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
    setIsActive(initialStatus); 
  }, [initialStatus]);

  const handleToggleChange = async () => {
    const token = Cookies.get('token');
    const newStatus = !isActive;
  
    const togglePromise = toggleProductStatus(productId, token!, newStatus);
  
    toast.promise(togglePromise, {
      loading: `Mengubah status menjadi ${newStatus ? 'aktif' : 'tidak aktif'}...`,
      success: `Produk ${newStatus ? 'berhasil diaktifkan!' : 'berhasil dinonaktifkan!'}`,
      error: 'Gagal mengubah status produk.',
    });
  
    try {
      await togglePromise;
      setIsActive(newStatus);
      onStatusChange(productId, newStatus);
    } catch (error) {
      console.error('Failed to toggle product status:', error);
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
