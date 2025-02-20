import { apiURL } from '@/utils/baseurl';
import axios, { AxiosResponse } from 'axios';

export const updateUser = async (
  userId: string,
  token: string,
  data: { email?: string; phone?: string }
) => {
  try {
    const res: AxiosResponse = await axios.patch(
      apiURL + `user/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
