import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
// import { useNavigate } from "react-router";
import SellerNavbar from '../../components/navbar';
import SellerFooter from '../../components/footer';
import BuyerOrderPage from './order-page';
import { useEffect, useState } from 'react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserById, updateDataBuyer } from '@/features/auth/services/buyer';
import Cookies from 'js-cookie';
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import LogoutButtonBuyer from './logout';
import { LocationSetting } from './location';
import toast from 'react-hot-toast';
import { useSellerStore } from '@/hooks/store';
import { Keep } from './keep';
import { NewKeep } from './new-keep';

const BuyerLayout = () => {
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
      console.log('resss', res.data)
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
    <Box w="full" minH="100vh" className="font-poppins" overflowX="hidden">
      <SellerNavbar />
        <NewKeep/>
      <SellerFooter />
    </Box>
  );
};

export default BuyerLayout;
