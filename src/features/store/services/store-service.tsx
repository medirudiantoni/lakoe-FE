import axios, { AxiosResponse } from 'axios';

import { apiURL } from '@/utils/baseurl';
import { StoreFormProps } from '../types/store-types';

export const fetchStore = async (data: StoreFormProps, userId: string) => {
    try {
        console.log('datanya coy ', data)
        console.log('userid coy ', userId)
      const res: AxiosResponse = await axios.post(
        apiURL + `store/${userId}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
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