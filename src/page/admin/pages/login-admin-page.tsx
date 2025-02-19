import LogoIcon from '@/components/icons/logo';
import { Field } from '@/components/ui/field';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { z } from 'zod';
import { useState } from 'react';

import { PasswordInput } from '@/components/ui/password-input';
import { useAdminAuthStore } from '@/features/auth/store/auth-admin-store';
import { fetchLogin } from '@/features/auth/services/auth-service'; // Gunakan fetchLogin
import { fetchLoginAdmin } from '@/features/auth/services/auth-admin';

const loginSchema = z.object({
  email: z.string().min(1, 'Email harus diisi').email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAdmin } = useAdminAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    setIsLoading(true);
    toast.promise(
      fetchLoginAdmin(data)
        .then((res) => {
          if (res.status === 200) {
            const { token, adminId, roleId, email } = res.data;
  
            console.log('resdataadmin', res.data)
            Cookies.set('token-admin', token);
            Cookies.set('adminId', adminId);
  
            setAdmin({ id: adminId, email, roleId });
  
            navigate('/admin');
  
            return 'Login berhasil!';
          }
        })
        .catch((error) => {
          throw error.response?.data?.message || 'Terjadi kesalahan saat login.';
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        loading: 'Sedang login...',
        success: (message) => <div>{message}</div>,
        error: (err) => <div>{err}</div>,
      },
      {
        position: 'top-center',
        style: {
          background: '#FFFF',
          color: '#1d1d1d',
          fontWeight: 'normal',
        },
      }
    );
  };
  
  return (
    <Box display="flex" alignItems="center" pt={'32'} flexDirection="column" width="100vw" height="100vh">
      <LogoIcon />
      <Box width="25%" mt={5}>
        <Text py={5} textAlign="center" fontSize="28px" fontWeight="semibold">
          Admin Login
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field label="Email">
            <Input placeholder="Masukkan email" {...register('email')} />
            {errors.email && (
              <Text color="red.500" fontSize="xs" mt="1.5">
                {errors.email.message}
              </Text>
            )}
          </Field>

          <Field label="Password" mt={5}>
            <PasswordInput placeholder="Masukkan password" {...register('password')} />
            {errors.password && (
              <Text color="red.500" fontSize="xs" mt="1.5">
                {errors.password.message}
              </Text>
            )}
          </Field>

          <Button
            colorPalette="blue"
            width="full"
            borderRadius="7px"
            mt={3}
            type="submit"

            disabled={isLoading}
          >
            Masuk
          </Button>
        </form>
      </Box>
    </Box>
  );
}
