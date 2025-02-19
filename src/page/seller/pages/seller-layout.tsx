import { LoadingScreenBuyer } from '@/components/loading-screen/loading-screen-buyer';
import { fetchCurrentUserBuyerData } from '@/features/auth/services/buyer';
import { fetchBuyerCart } from '@/features/auth/services/cart-service';
import { useAuthBuyerStore } from '@/features/auth/store/auth-buyer-store';
import {
  CartItemType,
  CartType,
  StoreType,
} from '@/features/auth/types/prisma-types';
import useCart from '@/hooks/cart-store';
import { useSellerStore } from '@/hooks/store';
import { apiURL } from '@/utils/baseurl';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Navigate, Outlet, useNavigate, useParams } from 'react-router';

const SellerPage = () => {
  const { setStore, store } = useSellerStore();
  const { storeName } = useParams();
  const { setBuyer, buyer } = useAuthBuyerStore();
  const { cart, setManyCart } = useCart();
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery<StoreType>({
    queryKey: ['store'],
    queryFn: async () => {
      const response = await axios.get(apiURL + `store/public/${storeName}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        }
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (buyer === null) {
      retrieveCurrentBuyer();
    }
  }, [buyer]);

  useEffect(() => {
    if (cart.length === 0 && buyer) {
      retrieveBuyerCart();
    }
  }, [cart, buyer]);

  function retrieveCurrentBuyer() {
    const token = Cookies.get(`token-buyer-${storeName}`);
    if (token)
      fetchCurrentUserBuyerData(token)
        .then((res) => {
          const emailWithStoreName = res.user.email;
          const buyerStoreName = emailWithStoreName
            .split('-')
            .slice(1)
            .join('-');
          if (storeName === buyerStoreName) {
            setBuyer(res.user);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }
  function retrieveBuyerCart() {
    const tokenBuyer = Cookies.get(`token-buyer-${store?.name}`);
    if (tokenBuyer)
      fetchBuyerCart(tokenBuyer)
        .then((res: CartType) => {
          const data: CartItemType[] = res.cartItems ? res.cartItems : [];
          setManyCart(data);
        })
        .catch((error) => {
          toast.error(error);
        });
    else navigate(`/${store?.name}/login-buyer`);
  }

  useEffect(() => {
    if (data) {
      setStore(data);
    }
  }, [data]);

  if (isLoading) return <LoadingScreenBuyer />;
  if (error) return <Navigate to="/not-found" />;
  return (
    <Box w="full" minH="100vh">
      <Outlet />
    </Box>
  );
};

export default SellerPage;
