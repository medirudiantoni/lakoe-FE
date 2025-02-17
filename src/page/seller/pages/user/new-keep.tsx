import {
  Box,
  Tabs,
  Text
} from '@chakra-ui/react';
// import { useNavigate } from "react-router";
import { getUserById, updateDataBuyer } from '@/features/auth/services/buyer';
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import { useSellerStore } from '@/hooks/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TabsPesanan } from './tabs/tab-pesanan';
import { TabsProfile } from './tabs/tab-profile';

export function NewKeep() {
  const { buyer } = useAuthBuyerStore();
  const token = Cookies.get('token-buyer');
  const queryClient = useQueryClient();
  const { store } = useSellerStore();

  useEffect(() => {
    console.log('buyer iniii', buyer);
  }, [buyer]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['user-buyer', buyer?.id],
    queryFn: async () => {
      const res = await getUserById(String(buyer?.id), token!);
      console.log('resss', res.data);
      return res.data;
    },
    enabled: !!buyer?.id,
  });

  const [formData, setFormData] = useState({
    name: buyer?.name || '',
    phone: buyer?.phone || '',
    email: buyer?.email || '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        phone: data.phone || '',
        email: data.email || '',
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async () => {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('email', formData.email);

      return updateDataBuyer(String(buyer?.id), data, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-buyer', buyer?.id] });
      toast.success('Success');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  useEffect(() => {
    console.log('test dataaa', data);
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return (
    <Box pt={28} mx={'auto'}  maxW="7xl" px={'35px'}>
      <Text fontWeight={'semibold'} fontSize={24} mb={'24px'}>
        Informasi Profile
      </Text>

      <Tabs.Root defaultValue="profile"  variant={'subtle'}>
      <Tabs.List >
        <Tabs.Trigger value="profile">
          Profile
        </Tabs.Trigger>
        <Tabs.Trigger value="pesanan">
          Pesanan
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="profile">
        <TabsProfile/>
      </Tabs.Content>
      <Tabs.Content value="pesanan">
        <TabsPesanan/>
      </Tabs.Content>
    </Tabs.Root>
    </Box>
  );
}
