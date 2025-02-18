import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
// import { useNavigate } from "react-router";
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
import { getUserById, updateDataBuyer } from '@/features/auth/services/buyer';
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import { useSellerStore } from '@/hooks/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LocationSetting } from './location';
import LogoutButtonBuyer from './logout';
import BuyerOrderPage from './order-page';
export function Keep() {
  const { buyer } = useAuthBuyerStore();
  const queryClient = useQueryClient();
  const { store } = useSellerStore();
  const token = Cookies.get(`token-buyer-${store?.name}`);

  useEffect(() => {
    console.log('buyer iniii', buyer);
  }, [buyer]);

  const { data } = useQuery({
    queryKey: ['user-buyer', buyer?.id],
    queryFn: async () => {
      const res = await getUserById(String(buyer?.id), token!);
      console.log('resss', res.data);
      return res.data; // Ambil langsung objek buyer dari response API
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
    <Flex
      w="full"
      flexDirection={{ base: 'column', lg: 'row' }}
      pt={{ base: '28', lg: '20' }}
      px={{ base: 5, lg: 0 }}
      gap={5}
      className="bg-slate-200"
    >
      <VStack
        w={{ base: 'full', lg: '340px' }}
        p={{ base: 0, lg: '5' }}
        pr={0}
        h={{ base: 'fit', lg: '100vh' }}
        position={{ base: 'relative', lg: 'sticky' }}
        top={{ base: 0, lg: '20' }}
      >
        <Box w="full" p="5" bg="white" borderRadius="xl">
          <Text fontSize="xl" fontWeight="semibold" mb="5">
            Tentang Akun
          </Text>
          <VStack alignItems="stretch" mb="5">
            <VStack alignItems="start" mb="5">
              <Text fontSize="lg" fontWeight="medium">
                Akun
              </Text>
              <Text
                w="full"
                pb="2"
                borderBottomWidth={1}
                borderColor="gray.200"
              >
                {buyer?.name}
              </Text>
              <Text
                w="full"
                pb="2"
                borderBottomWidth={1}
                borderColor="gray.200"
              >
                {buyer?.phone}
              </Text>
              <Text
                w="full"
                pb="2"
                borderBottomWidth={1}
                borderColor="gray.200"
              >
                {buyer?.email}
              </Text>
              <DialogRoot closeOnInteractOutside={false}>
                <DialogTrigger asChild>
                  <Button>Edit</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Informasi Akun</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <DialogBody pb="4">
                      <Stack gap="4" mb="2">
                        <Field label="Nama">
                          <Input
                            placeholder="Nama"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          ></Input>
                        </Field>
                      </Stack>
                      <Stack gap="4" mb="2">
                        <Field label="Email">
                          <Input
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          ></Input>
                        </Field>
                      </Stack>
                      <Stack gap="4" mb="2">
                        <Field label="No. Telp">
                          <Input
                            placeholder="No. Telp"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          ></Input>
                        </Field>
                      </Stack>
                    </DialogBody>
                    <DialogFooter>
                      <DialogActionTrigger>
                        <Button variant="outline">Cancel</Button>
                      </DialogActionTrigger>
                      <Button type="submit">Simpan</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </DialogRoot>
            </VStack>
            <VStack alignItems="start">
              <LocationSetting />
            </VStack>
            <VStack alignItems="start">
              <LogoutButtonBuyer />
            </VStack>
          </VStack>
          {/* <Button>Edit</Button> */}
        </Box>
      </VStack>
      <Box flex="1" p="5" pl={0} h="fit" overflowX="hidden">
        <BuyerOrderPage />
      </Box>
    </Flex>
  );
}
