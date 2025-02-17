import axios from "axios";
import Cookies from "js-cookie";
import { apiURL } from "@/utils/baseurl";
import { CartItemType } from "../types/prisma-types";

export const fetchAddToCart = async (data: CartItemType) => {
    const tokenBuyer = Cookies.get("token-buyer");
    try {
        const res = await axios.post(apiURL + `cart`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenBuyer}`
            }
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
}

export const fetchBuyerCart = async () => {
    const tokenBuyer = Cookies.get("token-buyer");
    try {
        const res = await axios.get(apiURL + `cart`, {
            headers: {
                Authorization: `Bearer ${tokenBuyer}`
            }
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
}