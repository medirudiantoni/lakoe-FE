import axios, { AxiosResponse } from 'axios';

import { apiURL } from '@/utils/baseurl';

export const addProduct = async (data: FormData, token:string) => {
  try {
    const res: AxiosResponse = await axios.post(apiURL + 'product', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });

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

export const fetchProduct = async (storeId: string, token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + `store/${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};
