import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { apiURL } from '@/utils/baseurl';
import { ProductType } from '../types/product-type';

export const addProduct = async (data: FormData, token:string) => {
  try {
    const res: AxiosResponse = await axios.post(apiURL + 'product', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log("📡 Response dari API:", res);

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

export const searchQuery = async (query: string, token: string): Promise<ProductType[]> => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + `product/product/search?query=${query}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Full Response:', res.data); 
    if (!res.data) {
      throw new Error('Products not found in the response');
    }

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



export const fetchProduct = async (storeId: string, token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + `product/store/${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string, token: string) => {
  try {
    const res: AxiosResponse = await axios.delete(apiURL + `product/${productId}`, {
      headers: {
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

export const updateProduct = async (data:FormData, productId: string) => {
  const token = Cookies.get('token')
  try {
    const res: AxiosResponse = await axios.put(
      apiURL + `product/${productId}`, data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }
    );

    console.log("Response dari API:", res.data);
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

export const updateProductPrice = async (productId: string,price:number, token: string) => {
  try {
    const res: AxiosResponse = await axios.patch(
      apiURL + `product/price/${productId}`,{price},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }
    );

    console.log("Response dari API:", res.data);
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

export const updateProductStock = async (productId: string, stock:number, token: string) => {
  try {
    const res: AxiosResponse = await axios.patch(
      apiURL + `product/stock/${productId}`,{stock},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

export const toggleProductStatus = async (productId: string, token: string, newStatus: boolean) => {
  try {
    const res: AxiosResponse = await axios.patch(
      `${apiURL}product/${productId}/toggle-active`,
      { isActive: newStatus }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data.products; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};
