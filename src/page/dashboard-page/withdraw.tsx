import { useState } from 'react';
import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
import { Box, Input, Text } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { fetchBalance } from '@/features/auth/services/store-service';
import { useSellerStore } from '@/hooks/store';
import Cookies from 'js-cookie';
import { formatRupiah } from '@/lib/rupiah';


function WithdrawForm({ storeId }: { storeId: string }) {
  const [amount, setAmount] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const {store} = useSellerStore()
  const token = Cookies.get('token')

  const { data: balance, isLoading, isError } = useQuery({
    queryKey: ['balance', store?.id],
    queryFn: async () => fetchBalance(store!.id, token!),
    enabled: !!store?.id, 
  });

  const handleWithdraw = async () => {
    setError(null);

    if (amount === '' || amount <= 0) {
      setError('Masukan jumlah withdraw');
      // toast.error('Masukan jumlah withdraw');
      return;
    }

    if (amount > balance) {
      setError('Saldo tidak cukup');
      return;
    }

    try {
      await axios.post(`${apiURL}withdraw/request`, { amount, storeId });
      toast.success('Berhasil mengajukan withdraw');
      setAmount('');
    } catch (err) {
      setError('Saldo tidak cukup');
    }
  };

  return (
    <Box>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="outline" mt={'5'} size="sm" width={'full'}>
            Withdraw
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw</DialogTitle>
          </DialogHeader>
          <DialogBody>
          <Text mb="2" fontWeight={'medium'}>Saldo anda :      Rp {balance?.balance?.toLocaleString('id-ID') || '0'}</Text>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Masukan jumlah withdraw"
              outline={'blue'}
            />
            {error && (
              <Text color={'red'} mt={'2'}>
                {error}
              </Text>
            )}
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Batal</Button>
            </DialogActionTrigger>
             <Button onClick={handleWithdraw} colorPalette={'blue'}>Ajukan</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}

export default WithdrawForm;
