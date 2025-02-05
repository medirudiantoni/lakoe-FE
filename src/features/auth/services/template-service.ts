import axios, { AxiosResponse } from 'axios';

import { apiURL } from '@/utils/baseurl';
import { TemplateFormProps } from '../types/template-types';

export const CreatedTemplate = async (
  data: TemplateFormProps,
  token: string
) => {
  try {
    const res: AxiosResponse = await axios.post(
      apiURL + `message-template`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
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

export const fetchTemplate = async (storeId: string, token: string) => {
  try {
    const res: AxiosResponse = await axios.get(
      apiURL + `message-template/store/${storeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.data || !Array.isArray(res.data)) {
      console.warn('Template pesan kosong atau format tidak sesuai:', res.data);
      return [];
    }

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      return []; // Jika error terjadi, tetap kembalikan array kosong agar tidak crash
    }
    console.error('Unexpected Error:', error);
    return [];
  }
};

export const deleteTemplate = async (templateId: string, token: string) => {
  try {
    const res: AxiosResponse = await axios.delete(
      apiURL + `message-template/${templateId}`,
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

export const updateTemplate = async (
  templateId: string,
  data: { name: string; content: string },
  token: string
) => {
  try {
    const res: AxiosResponse = await axios.put(
      apiURL + `message-template/${templateId}`,
      data,
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
