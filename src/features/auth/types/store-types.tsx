import { UserType } from '../store/auth-store';

export type StoreFormProps = {
  id: string;
  name: string;
  slogan: string;
  description: string;
  logoAttachment: File | null;
  bannerAttachment: File | null;
};

export interface StoreType extends StoreFormProps {
  domain?: string;
}

export interface CartType {
  id: string;
  price: number;
  discount: number;
  isComplete: boolean;
  users: UserType[];
  userId: string;
  stores: StoreType;
  storeId: string;
}
