import { apiURL } from '@/utils/baseurl';
import axios from 'axios';
import { CartItemType } from '../types/prisma-types';

export const fetchInitCart = async (
  buyerId: string,
  storeId: string,
  tokenBuyer: string
) => {
  try {
    const res = await axios.post(
      apiURL + `cart/init`,
      { buyerId, storeId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenBuyer}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};

export const fetchAddToCart = async (
  data: CartItemType,
  tokenBuyer: string
) => {
  try {
    const res = await axios.post(apiURL + `cart`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenBuyer}`,
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};

export const fetchBuyerCart = async (tokenBuyer: string) => {
  try {
    const res = await axios.get(apiURL + `cart`, {
      headers: {
        Authorization: `Bearer ${tokenBuyer}`,
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};

export const updateCartItemQty = async (
  quantity: number,
  cartItemId: string,
  tokenBuyer: string
) => {
  console.log('cart item id:-----  ', cartItemId);
  try {
    const res = await axios.patch(
      apiURL + `cart/${cartItemId}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${tokenBuyer}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};

export const removeCartItem = async (
  cartItemId: string,
  tokenBuyer: string
) => {
  try {
    const res = await axios.delete(apiURL + `cart/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${tokenBuyer}`,
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};
