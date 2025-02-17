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
  };
  orderItems: OrderItem[];
  totalPrice: number;
  id: number;
  status: string;
  colorPalette: string;
  product: {
    image: string;
    name: string;
    quantity: number;
    price: number;
  };
}
  