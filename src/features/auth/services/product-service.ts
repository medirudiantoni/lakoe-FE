import axios, { AxiosResponse } from 'axios';

import { apiURL } from '@/utils/baseurl';
import { ProductType } from '../types/product-type';

export const addProduct = async (data: ProductType) => {
  try {
    const res: AxiosResponse = await axios.post(apiURL + 'product', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
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

