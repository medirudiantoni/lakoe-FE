import axios, { AxiosResponse } from 'axios';

import { apiURL } from '@/utils/baseurl';

export const fetchCategory = async () => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + `category`);

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

export const fetchAllCategoryLevel1 = async () => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + `category/level/1`);

    return res.data.categories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};
