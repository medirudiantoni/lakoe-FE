import axios, { AxiosResponse } from 'axios';

import { LoginFormProps } from '../types/auth-types';
import { apiURL } from '@/utils/baseurl';

export const fetchLoginAdmin = async (data: LoginFormProps) => {
  try {
    const res: AxiosResponse = await axios.post(apiURL + 'admin/login', data, {
      headers: {
        'Content-Type': 'application/json',
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

export const fetchCurrentAdminData = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(
      apiURL + 'admin/current',
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

