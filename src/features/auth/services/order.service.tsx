import axios from 'axios';
import { apiURL } from '@/utils/baseurl';

export type recipient = {
    receiverName: string;
    receiverAddress: string;
    receiverPhone: string;
    receiverEmail: string;
    receiverDistrict: string;
    receiverLatitude: number;
    receiverLongitude: number;
    receiverVillage: string;
}

export type DataRequestOrder = {
    buyerId: string,
    cartItemIds: string;
    courier: string;
    shippingCost: string;
    variantOptionId: string;
    singleQuantity: number;
    recipient: string;
    storeName: string;
}

export const createOrder = async (data: DataRequestOrder) => {
    try {
        const res = await axios.post(apiURL + `checkout/alt`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return res;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Something went wrong');
        }
        console.error('Unexpected Error:', error);
        throw error;
    }
}