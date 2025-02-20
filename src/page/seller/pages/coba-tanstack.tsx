import { LoadingScreen } from '@/components/loading-screen/loading-screen';
import { StoreType } from '@/features/auth/types/prisma-types';
import { formatRupiah } from '@/lib/rupiah';
import { apiURL } from '@/utils/baseurl';
import { Box, Button, Center, Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const CobaTanstack = () => {
  const { data, error, isLoading } = useQuery<StoreType>({
    queryKey: ['store'],
    queryFn: async () => {
      const response = await axios.get(apiURL + `store/public/tokomedia`);
      return response.data;
    },
  });

  useEffect(() => {
    console.log('data: ', data);
  }, [data]);

  const navigate = useNavigate();

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <Center w="full" h="100vh">
        <Heading size="xl" fontWeight="semibold">
          Oops, something went wrong!
        </Heading>
      </Center>
    );

  return (
    <Box w="full" minH="100vh" className="bg-slate-200 py-20 font-poppins">
      <div className="w-full max-w-2xl mx-auto p-5 border-2 rounded-lg bg-white">
        <div className="w-full mb-5 grid grid-cols-3 gap-4">
          {data &&
            data.products?.map((product) => (
              <div key={product.id} className="col-span-1 h-fit">
                <img
                  src={product.attachments[0]}
                  className="w-full aspect-square object-cover mb-2"
                ></img>
                <p className="text-xl font-semibold">{product.name}</p>
                <p className="text-sm text-slate-500 font-medium">
                  {product.category?.name}
                </p>
                <p className="text-lg font-bold text-blue-700">
                  {formatRupiah(product.price)}
                </p>
              </div>
            ))}
        </div>
        <div>
          <Button w="full" onClick={() => navigate('/cache')}>
            ke halaman Cache
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default CobaTanstack;
