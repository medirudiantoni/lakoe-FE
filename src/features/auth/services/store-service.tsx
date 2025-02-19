import axios, { AxiosResponse } from 'axios';

import { apiURL } from '@/utils/baseurl';
import { StoreFormProps } from '../types/store-types';

export const CreatedStore = async (
  data: StoreFormProps,
  userId: string,
  token: string
) => {
  try {
    const res: AxiosResponse = await axios.post(
      apiURL + `store/${userId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};

export const updateStore = async (data: FormData, storeId: string) => {
  try {
    const res: AxiosResponse = await axios.put(
      apiURL + `store/${storeId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};

export const fetchStore = async (storeId: string, token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + `store/${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const fetchBalance = async (storeId: string, token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + `balance/${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
