import { apiURL } from '@/utils/baseurl';
import axios, { AxiosResponse } from 'axios';
import { LoginFormProps, RegisterFormProps } from '../types/auth-types';

export const fetchRegister = async (data: RegisterFormProps) => {
  try {
    const res: AxiosResponse = await axios.post(
      apiURL + 'auth-buyer/register',
      data,
      {
        headers: {
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
    throw error;
  }
};

export const fetchLogin = async (data: LoginFormProps) => {
  try {
    const res: AxiosResponse = await axios.post(
      apiURL + 'auth-buyer/login',
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
    throw error;
  }
};



