import { BuyerType } from '../store/auth-buyer-store';

export type UserType = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  subscribetionStart?: string;
  subscribetionEnd?: string;
  roleId?: string;
  role?: RoleType;
  planId?: string;
  plan?: PlanType;
  carts?: CartType[];
  cartItems?: CartItemType[];
  invoice?: InvoiceType[];
  locations?: LocationType[];
  createdAt: string;
  updatedAt: string;
  stores?: StoreType;
};

export type RoleType = {
  id: string;
  name: string;
  user?: UserType[];
};

export type PlanType = {
  id: string;
  name: string;
  feature: string;
  user?: UserType[];
};

export type CartType = {
  id?: string;
  totalPrice: number;
  discount?: number;
  isComplete?: boolean;
  buyerId?: string;
  buyer?: BuyerType;
  storeId?: string;
  store?: StoreType;
  cartItems?: CartItemType[];
  invoices?: InvoiceType[];
};

export type CartItemType = {
  id?: string;
  quantity: number;
  price: number;
  name: string;
  product?: ProductType;
  productId?: string;
  cartId?: string;
  cart?: CartType;
  store?: StoreType;
  storeId?: string;
  buyer?: BuyerType;
  buyerId?: string;
  variantOptionValue?: VariantOptionValueType;
  variantOptionValueId?: string;
};

export type InvoiceType = {
  id: string;
  price: number;
  serviceCharge: number;
  status: string;
  receiverLatitude: number;
  receiverLongtitude: number;
  receiverDistrict: string;
  receiverVillage: string;
  receiverPhone?: string;
  receiverAddress: string;
  receiverName: string;
  receiverEmail: string;
  invoiceNumber: string;
  notes?: string;
  waybill?: string;
  cartId?: string;
  carts?: CartType;
  userId?: string;
  users?: UserType;
  courierId?: string;
  courier?: CourierType;
  confirmationPayment?: ConfirmationPaymentType;
  payments?: PaymentType;
  invoiceHistory?: InvoiceHistoryType[];
  createdAt: string;
  updatedAt: string;
};

export type ConfirmationPaymentType = {
  id: string;
  amount: number;
  bank: string;
  invoiceId: string;
  invoices?: InvoiceType;
};

export type InvoiceHistoryType = {
  id: string;
  status: string;
  createdAt: string;
  invoiceId?: string;
  invoices?: InvoiceType;
};

export type PaymentType = {
  id: string;
  bank: string;
  amount: number;
  status: string;
  invoiceId: string;
  invoice?: InvoiceType;
};

export type CourierType = {
  id: string;
  courierCode: string;
  courierServiceName: string;
  courierServiceCode: string;
  price: number;
  Invoices?: InvoiceType;
};

export type StoreType = {
  id: string;
  name: string;
  slogan: string;
  description: string;
  domain?: string;
  logoAttachment?: string;
  bannerAttachment?: string;
  userId?: string;
  userIdRel?: UserType;
  carts?: CartType[];
  cartItems?: CartItemType[];
  products?: ProductType[];
  bankAccounts?: BankAccountType[];
  storeOnDecorations?: StoreOnDecorationType[];
  operationHours?: OperationHourType[];
  messageTemplate?: MessageTemplateType[];
  location?: LocationType[];
};

export type StoreOnDecorationType = {
  id: string;
  decorationId?: string;
  decorations?: DecorationType;
  storeId?: string;
  stores?: StoreType;
};

export type DecorationType = {
  id: string;
  storeOnDecorations?: StoreOnDecorationType[];
};

export type OperationHourType = {
  id: string;
  day: string;
  openAt: number;
  closeAt: number;
  isOff: boolean;
  storeId?: string;
  stores?: StoreType;
};

export type MessageTemplateType = {
  id: string;
  name: string;
  content: string;
  storeId?: string;
  stores?: StoreType;
};

export type LocationType = {
  id: string;
  name: string;
  address: string;
  postalCode: number;
  cityDistrict: string;
  latitude: number;
  longitude: number;
  isMainLocation: boolean;
  storeId?: string;
  stores?: StoreType;
  userId?: string;
  user?: UserType;
};

export type BankAccountType = {
  id: string;
  bank: string;
  accNumber: number;
  accName: string;
  storeId?: string;
  stores?: StoreType;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  attachments: string[];
  isActive: boolean;
  url: string;
  minimumOrder: number;
  size?: string;
  price: number;
  sku: string;
  stock: number;
  weight: number;
  storeId?: string;
  stores?: StoreType;
  categoryId?: string;
  category?: CategoryType;
  variants?: VariantType[];
};

export type VariantType = {
  id?: string;
  name: string;
  isActive: boolean;
  productId?: string;
  products?: ProductType;
  variantOptions?: VariantOptionType[];
};

export type VariantOptionType = {
  id?: string;
  name: string;
  variantId?: string;
  variant?: VariantType;
  variantOptionValuesId?: string;
  variantOptionValues?: VariantOptionValueType[];
};

export type VariantOptionValueType = {
  id?: string;
  sku: string;
  weight: number;
  stock: number;
  price: number;
  isActive: boolean;
  cartItems?: CartItemType[];
  variantOptions?: VariantOptionType;
  combinations?: string[];
};

export type CategoryType = {
  id: string;
  name: string;
  parentId?: string;
  parent?: CategoryType;
  children?: CategoryType[];
  products?: ProductType[];
};

// Type untuk Orders
export type OrderType = {
  id?: string;
  biteshipOrderId?: string;
  midtransOrderId?: string;
  status: string;
  courier: string;
  recipientName: string;
  recipientAddress: string;
  totalPrice: number;
  metadata?: JSON;
  storeId?: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItemType[];
};

export type OrderItemType = {
  id?: string;
  orderId?: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  category?: string;
  height?: number;
  length?: number;
  weight?: number;
  width?: number;
  image: string;
};
