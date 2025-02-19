export type Product = {
  name: string;
  attachments?: string[];
};

export type OrderItem = {
  product: Product;
  quantity: number;
  name: string;
  image: string;
};

export interface Order {
  invoice?: {

    buyerId: string
    invoiceNumber: string;
    receiverName: string;
    receiverPhone: string;
    serviceCharge: number;
    price: number
    waybill: string;

  };
  storeId: string
  trackingId: string
  orderItems: OrderItem[];
  totalPrice: number;
  buyer: {
    id:string
  }
  id: string;
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
