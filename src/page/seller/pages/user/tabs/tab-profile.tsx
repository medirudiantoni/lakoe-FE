import { Field } from '@/components/ui/field';
import { Box, Button, Grid, GridItem, Input, Text } from '@chakra-ui/react';
import { LocationSetting } from '../location';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserById, updateDataBuyer } from '@/features/auth/services/buyer';
import Cookies from 'js-cookie';
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import toast from 'react-hot-toast';
import LogoutButtonBuyer from '../logout';
import { useSellerStore } from '@/hooks/store';

export function TabsProfile() {
  const { buyer } = useAuthBuyerStore();
  const { store } = useSellerStore();
  const token = Cookies.get(`token-buyer-${store?.name}`);
  const queryClient = useQueryClient();
  
  const [isEditing, setIsEditing] = useState(false); // State untuk mode edit

  const { } = useQuery({
    queryKey: ['user-buyer', buyer?.id],
    queryFn: async () => {
      const res = await getUserById(String(buyer?.id), token!);
      return res.data; 
    },
    enabled: !!buyer?.id,
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (buyer) {
      setFormData({
        name: buyer.name || '',
        phone: buyer.phone || '',
        email: buyer.email ? buyer.email.split('-')[0] : '',
      });
    }
  }, [buyer]);
  

  const mutation = useMutation({
    mutationFn: async () => {
      const updateForm = new FormData();
      updateForm.append('name', formData.name);
      updateForm.append('phone', formData.phone);
      updateForm.append('email', formData.email);

      return updateDataBuyer(String(buyer?.id), updateForm, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-buyer', buyer?.id] });
      toast.success('Profil berhasil diperbarui!');
      setIsEditing(false); // Kembali ke mode non-edit setelah sukses
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };
  
  const handleSave = () => {
    mutation.mutate();
  };
  
  return (
    <Box>
      <Text fontSize={'18px'} fontWeight={'semibold'}>
        Profil Saya
      </Text>

      <Box display={'flex'} justifyContent={'space-between'} mt={4}>
        <Text>
          Kelola informasi profil Anda untuk mengontrol, melindungi, dan mengamankan akun.
        </Text>
        {isEditing ? (
          <Button colorScheme="blue" onClick={handleSave} >
            Simpan
          </Button>
        ) : (
          <Button onClick={handleEditClick}>Edit</Button>
        )}
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid templateColumns="repeat(3, 1fr)" mt={'16px'} gap={4}>
          <GridItem>
            <Field label="Nama">
              <Input
                placeholder="Nama"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Field>
          </GridItem>
          <GridItem>
            <Field label="No. Telp">
              <Input
                placeholder="No. Telp"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Field>
          </GridItem>
          <GridItem>
            <Field label="Email">
              <Input
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Field>
          </GridItem>
        </Grid>
      </form>


      <LocationSetting />
      <LogoutButtonBuyer />
    </Box>
  );
}
