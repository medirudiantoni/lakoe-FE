import { Badge, Box, Button, Table, } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { apiURL } from '@/utils/baseurl';
import { formatRupiah } from '@/lib/rupiah';

export function Admin() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('Semua'); 

  const {
    data: withdraws = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['withdraws'],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}withdraw/`);
      console.log('respondataw', response.data)
      return Array.isArray(response.data) ? response.data : [];
    },
    staleTime: 1000 * 60, // 1 menit
  });

  const adminId = Cookies.get('adminId');

  const mutation = useMutation({
    mutationFn: async ({
      withdrawId,
      status,
    }: {
      withdrawId: string;
      status: string;
    }) => {
      await axios.post(`${apiURL}withdraw/process`, {
        withdrawId,
        status,
        adminId,
      });
      return { withdrawId, status };
    },
    onMutate: async ({ withdrawId, status }) => {
      await queryClient.cancelQueries({ queryKey: ['withdraws'] });

      const previousWithdraws = queryClient.getQueryData<any[]>(['withdraws']);

      queryClient.setQueryData(['withdraws'], (old: any[] | undefined) => {
        return (
          old?.map((withdraw) =>
            withdraw.id === withdrawId ? { ...withdraw, status } : withdraw
          ) || []
        );
      });

      return { previousWithdraws };
    },
    onError: (err, _, context) => {
      console.error('Withdraw error:', err); // Tetap bisa membaca error di console
      if (context?.previousWithdraws) {
        queryClient.setQueryData(['withdraws'], context.previousWithdraws);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['withdraws'] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching withdraws</p>;

  // Filter withdraws berdasarkan status yang dipilih
  const filteredWithdraws = statusFilter === 'Semua'
    ?  withdraws : withdraws.filter((withdraw) => withdraw.status === statusFilter)
    ;

  return (
    <Box pt={5} px={12} textAlign={'right'}>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className='cursor-pointer outline-none w-[150px] px-3 bg-[#F8F8F8]' 
      >
        <option value="Semua">Semua</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

      <Table.Root width="100%" cellPadding="10" variant={'outline'} mt={4}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Store Name</Table.ColumnHeader>
            <Table.ColumnHeader>Permintaan Withdraw</Table.ColumnHeader>
            <Table.ColumnHeader>Bank</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Aksi</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredWithdraws.map((withdraw) => (
            <Table.Row key={withdraw.id}>
              <Table.Cell width={'20%'}>{withdraw.store?.name}</Table.Cell>
              <Table.Cell width={'20%'}>{formatRupiah(withdraw.amount)}</Table.Cell>
              <Table.Cell width={'10%'}>{withdraw.store?.bankAccounts?.[0].bank?.name}</Table.Cell>
              <Table.Cell width={'30%'}>
                <Badge
                  colorPalette={
                    withdraw.status === 'Pending'
                      ? 'yellow'
                      : withdraw.status === 'Approved'
                        ? 'green'
                        : 'red'
                  }
                >
                  {withdraw.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Button
                  colorPalette="green"
                  size="sm"
                  mr={2}
                  disabled={withdraw.status !== 'Pending'}
                  onClick={() =>
                    mutation.mutate({
                      withdrawId: withdraw.id,
                      status: 'Approved',
                    })
                  }
                >
                  Approve
                </Button>
                <Button
                  colorPalette="red"
                  size="sm"
                  disabled={withdraw.status !== 'Pending'}
                  onClick={() =>
                    mutation.mutate({
                      withdrawId: withdraw.id,
                      status: 'Rejected',
                    })
                  }
                >
                  Reject
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
