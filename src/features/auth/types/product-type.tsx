export type ProductType = {
  id: string;
  name: string;
  description: string;
  attachments?: File;
  url: string;
  sku?: string;
  weight?: number;
  stock?: number;
  price?: string;
  minimumOrder: string;
  storeId?: string;
  categoryId?: string;
  isActive: boolean;
  size: JSON;
};

export type Variant = {
  name: string;
  isActive: boolean;
  productId: string;
};

export type VariantOption = {
  name: string;
  variantId: string;
};

export type VariantOptionValue = {
  sku: string;
  weight: number;
  stock: number;
  price: number;
  isActive: boolean;
};
