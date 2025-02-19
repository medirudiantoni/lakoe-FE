import axios from 'axios';
import type { Order } from '@/features/auth/types/order.types';
import type { OrderDetailResponse } from '@/features/auth/types/order.types';
import { apiURL } from '@/utils/baseurl';

// export const fetchOrders = async (status: string, storeId: string): Promise<Order[]> => {
//   try {
//     console.log("Fetching orders with:", { status, storeId }); // 🔍
//     const { data } = await axios.get(apiURL + `order`, {
//       params: {
//         ...(status !== 'Semua' ? { status } : {}),
//         ...(storeId ? { storeId } : {}),
//       },
//     });
//     return data.orders;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || 'Gagal memuat data pesanan');
//   }
// };

export const fetchOrders = async (token: string): Promise<Order[]> => {
  try {
    console.log('Fetching orders...'); // 🔍 Debugging

    const { data } = await axios.get(apiURL + 'order', {
      headers: {
        Authorization: `Bearer ${token}`, // 🛡️ Tambahkan token autentikasi
      },
    });

    return data.orders;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Gagal memuat data pesanan'
    );
  }
};

export const fetchOrderDetail = async (
  id: string
): Promise<OrderDetailResponse> => {
  try {
    const response = await axios.get(apiURL + `order/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Gagal memuat detail pesanan'
    );
  }
};

export const fetchTrackingData = async (trackingId: string) => {
  if (!trackingId) {
    console.warn('⚠️ Tracking ID tidak ditemukan, melewati fetch.');
    return [];
  }

  console.log('Fetching Tracking Data for ID:', trackingId);

  try {
    const response = await axios.get(apiURL + `order/tracking/${trackingId}`);

    console.log('Fetched Tracking Data:', response.data);

    return response.data.trackingData ?? [];
  } catch (error) {
    console.error('Error fetching tracking data:', error);
    return [];
  }
};

export const processOrder = async (
  orderId: string,
  userId: string,
  buyerId: string
) => {
  if (!userId) throw new Error('User tidak ditemukan. Silakan login ulang.');
  if (!buyerId) throw new Error('Data pembeli tidak ditemukan.');

  const response = await axios.post('http://localhost:5000/api/v1/order', {
    userId,
    orderId,
    buyerId,
  });

  return response.data;
};

export const fetchOrdersByStoreId = async (
  storeId: string
): Promise<Order[]> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/order${storeId}`,
      {
        params: { storeId },
      }
    );
    return response.data.orders;
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    throw new Error('Gagal mengambil pesanan');
  }
};
