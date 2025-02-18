import { apiURL } from "@/utils/baseurl";
import axios, { AxiosResponse } from "axios";

export const checkout = async (data: FormData) => {
    try {
      const res: AxiosResponse = await axios.post(apiURL + 'checkout', data, {
        headers: {
          'Content-Type': 'application/json',
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