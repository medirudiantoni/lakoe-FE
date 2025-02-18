// order-types.ts

export type Product = {
    name: string;
    attachments?: string[];
  };
  
  export type OrderItem = {
    product: Product;
    quantity: number;
    name:string
    image:string
  };
  
 export interface Order {
  invoice?: {
    invoiceNumber: string;
    receiverName: string;
    receiverPhone: string;
    serviceCharge: number;
    price: number
    waybill: string;
  };
  orderItems: OrderItem[];
  totalPrice: number;
  id: number;
  courier: string;
  status: string;
  recipientAddress: string;
  createdAt: string;
  colorPalette: string;
  product: {
    image: string;
    name: string;
    quantity: number;
    price: number;
  };
}
  
export interface OrderDetailResponse {
  order: Order;
}