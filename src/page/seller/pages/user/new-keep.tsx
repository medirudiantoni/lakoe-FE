import { Box, Tabs, Text } from '@chakra-ui/react';
// import { useNavigate } from "react-router";
import { getUserById } from '@/features/auth/services/buyer';
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import { useSellerStore } from '@/hooks/store';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
// import { TabsPesanan } from './tabs/tab-pesanan';
import { TabsProfile } from './tabs/tab-profile';
import { useLocation } from 'react-router';

export function NewKeep() {
  const { buyer } = useAuthBuyerStore();
  // const queryClient = useQueryClient();
  const { store } = useSellerStore();
  const token = Cookies.get(`token-buyer-${store?.name}`);
  const { pathname } = useLocation();

  // useEffect(() => {
  //   console.log('location iniii', pathname);
  //   if(pathname.includes('order')){
  //     console.log("order true")
  //   } else {
  //     console.log("order false")
  //   }
  // }, [pathname]);

  const { data } = useQuery({
    queryKey: ['user-buyer', buyer?.id],
    queryFn: async () => {
      const res = await getUserById(String(buyer?.id), token!);
      console.log('resss', res.data);
      return res.data;
    },
    enabled: !!buyer?.id,
  });

  const [, setFormData] = useState({
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

  // const mutation = useMutation({
  //   mutationFn: async () => {
  //     const data = new FormData();
  //     data.append('name', formData.name);
  //     data.append('phone', formData.phone);
  //     data.append('email', formData.email);

  //     return updateDataBuyer(String(buyer?.id), data, token!);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['user-buyer', buyer?.id] });
  //     toast.success('Success');
  //   },
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   mutation.mutate();
  // };

  useEffect(() => {
    console.log('test dataaa', data);
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return (
    <Box pt={28} mx={'auto'} maxW="7xl" px={'35px'}>
      <Text fontWeight={'semibold'} fontSize={24} mb={'24px'}>
        Informasi Profile
      </Text>

      <Tabs.Root defaultValue={`${pathname.includes('order') ? 'pesanan' : 'profile'}`} variant={'subtle'}>
        <Tabs.List>
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          {/* <Tabs.Trigger value="pesanan">Pesanan</Tabs.Trigger> */}
        </Tabs.List>
        <Tabs.Content value="profile">
          <TabsProfile />
        </Tabs.Content>
        {/* <Tabs.Content value="pesanan">
          <TabsPesanan />
        </Tabs.Content> */}
      </Tabs.Root>
    </Box>
  );
}
