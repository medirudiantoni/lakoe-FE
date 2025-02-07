import { apiURL } from '@/utils/baseurl';
import axios, { AxiosResponse } from 'axios';

export const fetchLocationById = async (locationId:string, token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + `location/${locationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("res Data:", res.data);

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

export const createLocation = async (data: FormData, token: string) => {
    console.log("Data yang dikirim ke backend:", Object.fromEntries(data));

  try {
    const res: AxiosResponse = await axios.post(apiURL + `location/`, data, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const deleteLocation = async (locationId: string, token: string) => {
  try {
    const res: AxiosResponse = await axios.delete(
      apiURL + `location/${locationId}`,
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


export const updateLocation = async (data: FormData, locationId: string, token: string) => {
  
  try {
    const res: AxiosResponse = await axios.put(
      apiURL + `location/${locationId}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Response dari API:', res.data);
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