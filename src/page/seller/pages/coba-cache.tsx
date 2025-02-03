import { StoreType } from "@/features/auth/types/prisma-types"
import { formatRupiah } from "@/lib/rupiah"
import { Box, Button } from "@chakra-ui/react"
import { useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const CobaCache = () => {
  const queryClient = useQueryClient();

  let data = queryClient.getQueryData<StoreType>(["store"]);

  useEffect(() => {
    console.log("data cache: ", data)
  }, [data])

  const navigate = useNavigate();
  
  return (
    <Box w="full" minH="100vh" className="bg-slate-200 py-20 font-poppins">
        <Button onClick={() => navigate(-1)} position="absolute" top={10} left={10}><ArrowLeft /> Back</Button>
        <div className="w-full max-w-2xl mx-auto p-5 border-2 rounded-lg bg-white grid grid-cols-3 gap-4">
            {data ? data.products?.map(product => (
                <div key={product.id} className="col-span-1 h-fit">
                    <img src={product.attachments[0]} className="w-full aspect-square object-cover mb-2"></img>
                    <p className="text-xl font-semibold">{product.name}</p>
                    <p className="text-sm text-slate-500 font-medium">{product.category?.name}</p>
                    <p className="text-lg font-bold text-blue-700">{formatRupiah(product.price)}</p>
                </div>
            )) : (
                <div className="col-span-3 flex items-center justify-center h-10 bg-slate-300">
                    <p>Tidak ada data? coba back dulu</p>
                </div>
            )}
        </div>
    </Box>
  )
}

export default CobaCache