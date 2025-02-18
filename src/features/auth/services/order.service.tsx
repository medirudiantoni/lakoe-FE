// src/services/order.service.ts
import axios from 'axios';
import type { Order } from '@/features/auth/types/order.types';
import type { OrderDetailResponse } from '@/features/auth/types/order.types';
export const fetchOrders = async (status: string): Promise<Order[]> => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/v1/order', {
      params: { status: status === 'Semua' ? undefined : status },
    });
    return data.orders;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Gagal memuat data pesanan');
  }
};




// Fungsi untuk mendapatkan detail order berdasarkan ID
export const fetchOrderDetail = async (id: string): Promise<OrderDetailResponse> => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/order/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Gagal memuat detail pesanan');
    }
  };