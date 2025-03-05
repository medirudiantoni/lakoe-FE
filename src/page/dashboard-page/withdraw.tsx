import { useState } from 'react';
import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
import {
  Box,
  Input,
  Text,
  Badge,
  Skeleton,
} from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { fetchBalance } from '@/features/auth/services/store-service';
import Cookies from 'js-cookie';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../@/components/ui/table';

type Withdraw = {
  id: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
};

function WithdrawForm({ storeId }: { storeId: string }) {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get('token');

  // Fetch saldo
  const { data: balanceData, refetch: refetchBalance } = useQuery<{ balance: number }>({
    queryKey: ['balance', storeId],
    queryFn: async () => (storeId ? await fetchBalance(storeId, token!) : { balance: 0 }),
    enabled: !!storeId,
  });

  // Fetch daftar withdraw
  const {
    data: withdrawList = [],
    isLoading: isLoadingWithdraws,
    refetch: refetchWithdrawList,
  } = useQuery<Withdraw[]>({
    queryKey: ['withdrawList', storeId],
    queryFn: async () => {
      if (!storeId) return [];
      try {
        const response = await axios.get<{ data: Withdraw[] }>(
          `${apiURL}withdraw?storeId=${storeId}`
        );
        return response.data.data || [];
      } catch (error) {
        console.error('Error fetching withdraw list:', error);
        return [];
      }
    },
    enabled: !!storeId,
  });

  const balance = balanceData?.balance ?? 0;
  const isWithdrawPending = withdrawList.some((w) => w.status === 'Pending');

  const handleWithdraw = async () => {
    setError(null);
    const withdrawAmount = Number(amount);

    if (!withdrawAmount || withdrawAmount <= 0) {
      setError('Masukkan jumlah withdraw yang valid');
      return;
    }

    if (withdrawAmount > balance) {
      setError('Saldo tidak cukup');
      return;
    }

    await toast.promise(
      axios.post(
        `${apiURL}withdraw/request`,
        { amount: withdrawAmount, storeId },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
      {
        loading: 'Mengajukan withdraw...',
        success: () => {
          setAmount('');
          refetchWithdrawList();
          refetchBalance();
          return 'Withdraw berhasil diajukan';
        },
        error: (err) => err.response?.data?.message || 'Terjadi kesalahan',
      }
    );
  };

  return (
    <Box>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="outline" mt="5" size="sm" width="full">
            Withdraw
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb="2" fontWeight="medium">
              Saldo anda: Rp {balance.toLocaleString('id-ID')}
            </Text>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Masukkan jumlah withdraw"
              disabled={isWithdrawPending}
            />
            {error && <Text color="red" mt="2">{error}</Text>}
            {isWithdrawPending && (
              <Text fontSize="sm" color="gray.500" mt="1">
                Menunggu proses withdraw...
              </Text>
            )}

            <Text fontWeight="medium" mt="4">
              Riwayat Withdraw:
            </Text>
            {isLoadingWithdraws ? (
              <Skeleton height="150px" mt="2" />
            ) : withdrawList.length > 0 ? (
              <div className="overflow-x-auto max-h-64">
              <Table className="min-w-full">
                <TableHeader >
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawList.map((withdraw) => (
                    <TableRow key={withdraw.id}>
                      <TableCell>{new Date(withdraw.createdAt).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>Rp {withdraw.amount.toLocaleString('id-ID')}</TableCell>
                      <TableCell>
                        <Badge
                          colorPalette={
                            withdraw.status === 'Pending'
                              ? 'orange'
                              : withdraw.status === 'Approved'
                              ? 'green'
                              : 'red'
                          }
                        >
                          {withdraw.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            ) : (
              <Text color="gray.500" mt="2">
                Belum ada transaksi withdraw
              </Text>
            )}
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Batal</Button>
            </DialogActionTrigger>
            <Button
              onClick={handleWithdraw}
              colorPalette="blue"
              disabled={isWithdrawPending || !amount}
            >
              Ajukan
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}

export default WithdrawForm;
