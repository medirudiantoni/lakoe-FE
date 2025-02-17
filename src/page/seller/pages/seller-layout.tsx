import { LoadingScreen } from "@/components/loading-screen/loading-screen"
import { useAuthBuyerStore } from "@/features/auth/store/auth-buyer-store"
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
} from "react-router";
import Cookies from "js-cookie"
import { fetchCurrentUserBuyerData } from "@/features/auth/services/buyer"
import toast from "react-hot-toast"

const SellerPage = () => {
  const { storeName } = useParams();
  const { setBuyer, buyer } = useAuthBuyerStore();
  const { data, error, isLoading } = useQuery<StoreType>({
    queryKey: ["store"],
    queryFn: async () => {
      const response = await axios.get(apiURL + `store/public/${storeName}`);
      return response.data
    },
  });

  useEffect(() => {
    if (buyer === null) {
      retrieveCurrentBuyer();
    }
  }, [buyer]);

  function retrieveCurrentBuyer() {
    const token = Cookies.get(`token-buyer-${storeName}`);
    if (token)
      fetchCurrentUserBuyerData(token)
        .then((res) => {
          const emailWithStoreName = res.user.email;
          const buyerStoreName = emailWithStoreName.split("-").slice(1).join("-");
          if(storeName === buyerStoreName){
            toast.success(`Selamat datang kembali ${res.user.name}`)
            setBuyer(res.user);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error('Oops!, Something went wrong');
        });
  }

  const { setStore } = useSellerStore();
  useEffect(() => {
    if (data) {
      setStore(data);
    }
  }, [data])

  if (isLoading) return <LoadingScreen />
  if (error) return <Navigate to="/not-found" />
  return (
    <Box w="full" minH="100vh">
      <Outlet />
    </Box>
  )
}

export default SellerPage;