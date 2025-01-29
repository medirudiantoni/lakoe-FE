import { Spinner, Stack } from "@chakra-ui/react";
import LogoIcon from "../icons/logo";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/auth-store/auth-store";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import LoadingLottie from "../icons/Loading";


export function LoadingScreen() {
    const [params, setParams] = useState<any | null>(null)
    const { setUser } = useAuthStore();
    const navigate = useNavigate();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.size == 0) {
      setParams(null)
    } else {
      setParams({
        token: searchParams.get('token'),
        name: searchParams.get('name'),
        email: searchParams.get('email'),
        phone: searchParams.get('phone'),
        role: searchParams.get('role'),
        store: searchParams.get('store'),
        updatedAt: searchParams.get('updatedAt'),
        createdAt: searchParams.get('createdAt'),
        id: searchParams.get('id'),
      });
    }
  }, [window.location]);

  useEffect(() => {
    if (params !== null) {
      setUser(params);
      Cookies.set('token', params.token as string);

      const storeParse = JSON.parse(params.store);
      toast.success('success')
      if(storeParse){
        navigate('/dashboard')
      } else {
        navigate('/register-store')
      }
    }
  }, [params]);
  return (
    <Stack
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      h={"100vh"}
    >
      <LogoIcon />
        <LoadingLottie/>
    </Stack>
  );
}
