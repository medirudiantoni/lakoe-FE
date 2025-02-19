import ProfileLottie from '@/components/icons/lottie-profile';
import { Field } from '@/components/ui/field';
import { updateUser } from '@/features/auth/services/user-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { Box, Button, Grid, GridItem, Input, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function Profile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name,
    phone: user?.phone,
    email: user?.email,
  });

  const token = Cookies.get('token');
  const userId = user?.id;

  const mutation = useMutation({
    mutationFn: (data: { email?: string; phone?: string }) =>
      updateUser(userId!, token!, data),
    onSuccess: () => {
      toast.success('Data berhasil diperbarui');
      setIsEditing(false);
    },
    onError: () => {
      toast.error('Data gagal diperbarui');
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    mutation.mutate({
      email: formData.email,
      phone: formData.phone,
    });
  };

  return (
    <Box p={3} m={4} backgroundColor={'white'} borderRadius={10}>
      <Text
        fontSize={'32px'}
        fontWeight={'semibold'}
        borderBottom={'1px solid'}
        borderColor={'gray.200'}
        py={'20px'}
      >
        Selamat datang, {formData.name}🙌
      </Text>
      <Text fontSize={'22px'} mt={4} fontWeight={'medium'}>
        Informasi Profile
      </Text>
      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem mt={5}>
          <Field label="Name">
            <Input
              placeholder="Masukan nama"
              name="name"
              value={formData.name}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Field>
          <Field label="Email" mt={3}>
            <Input
              placeholder="Masukan email"
              name="email"
              value={formData.email}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Field>
          <Field label="No telepon" mt={3}>
            <Input
              placeholder="Masukan no telepon"
              name="phone"
              value={formData.phone}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Field>
          <Button
            mt={4}
            onClick={toggleEdit}
            colorPalette={isEditing ? 'red' : 'blue'}
          >
            {isEditing ? 'Batalkan' : 'Ubah'}
          </Button>
          {isEditing && (
            <Button mt={4} ml={2} colorPalette={'blue'} onClick={handleUpdate}>
              Perbarui
            </Button>
          )}
        </GridItem>
        <GridItem display={'flex'} justifyContent={'center'}>
          <ProfileLottie />
        </GridItem>
      </Grid>
    </Box>
  );
}
