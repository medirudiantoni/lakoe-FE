import { apiURL } from "@/utils/baseurl"
import axios, { AxiosResponse } from "axios"

export const getUserById = async (buyerId:string, token:string) => {
    try {
        const res:AxiosResponse = await axios.get(apiURL + `user-buyers/${buyerId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        throw error
    }
}

export const updateDataBuyer = async (buyerId:string, data:FormData, token:string) => {
  try {
    const res:AxiosResponse = await axios.put(`${apiURL}buyer/${buyerId}`, data, {
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return res.data;
  } catch (error) {
    throw error
  }
}

export const fetchCurrentUserBuyerData = async (token: string) => {
    try {
    console.log('token', token)
      const res: AxiosResponse = await axios.get(
        apiURL + 'auth-buyer/current',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("data res 43: ", res.data);
  
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