import axios, { AxiosResponse } from 'axios';

import { LoginFormProps, RegisterFormProps } from '../types/auth-types';
import { apiURL } from '@/utils/baseurl';

export const fetchLogin = async (data: LoginFormProps) => {
  try {
    const res: AxiosResponse = await axios.post(apiURL + 'auth/login', data, {
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

export const fetchRegister = async (data: RegisterFormProps) => {
  try {
    const res: AxiosResponse = await axios.post(
      apiURL + 'auth/register',
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
