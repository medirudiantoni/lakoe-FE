import { LoadingScreen } from "@/components/loading-screen/loading-screen"
import { StoreType } from "@/features/auth/types/prisma-types"
import { useSellerStore } from "@/hooks/store"
import { apiURL } from "@/utils/baseurl"
import { Box } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import { 
  Navigate, 
  Outlet, 
  useParams 
} from "react-router"

const SellerPage = () => {
  const { storeName } = useParams();
  const { data, error, isLoading } = useQuery<StoreType>({
    queryKey: ["store"],
    queryFn: async () => {
      const response = await axios.get(apiURL + `store/public/${storeName}`);
      return response.data
    },
  });

  const { setStore } = useSellerStore();
  useEffect(() => {
    if(data){
      setStore(data);
    }
  }, [data])

  if(isLoading) return <LoadingScreen />
  if(error) return <Navigate to="/not-found" />
  return (
    <Box w="full" minH="100vh">
      <Outlet />
    </Box>
  )
}

export default SellerPage