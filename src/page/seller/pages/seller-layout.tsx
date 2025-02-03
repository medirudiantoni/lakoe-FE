import { LoadingScreen } from "@/components/loading-screen/loading-screen"
import { useSellerStore } from "@/hooks/store"
import { apiURL } from "@/utils/baseurl"
import { Box } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, Outlet, useNavigate, useParams } from "react-router"

const SellerPage = () => {
  const { store, setStore } = useSellerStore()
  const [isThereStore, setIsThereStore] = useState<boolean | null>(null);
  const { storeName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("store: ", store)
    if(store){
      setIsThereStore(true)
    } else {
      if(storeName){
        getStore(storeName)
      }
    }
  }, [store]);

  useEffect(() => {
    console.log(storeName)
    if(storeName){
      getStore(storeName);
    } else {
      navigate('/not-found')
    }
  }, [storeName]);

  function getStore(params: string) {
    axios.get(`${apiURL}store/public/${params}`)
      .then(res => {
        setIsThereStore(true);
        setStore(res.data);
        console.log("res data: ", res.data)
      })
      .catch(error => {
        setIsThereStore(false)
        console.log(error)
      })
  };

  if(isThereStore === false){
    return <Navigate to="/not-found" />
  } else if (isThereStore === null){
    return <LoadingScreen />
  }
  return (
    <Box w="full" minH="100vh">
      <Outlet />
    </Box>
  )
}

export default SellerPage