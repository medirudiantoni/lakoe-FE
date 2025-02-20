import { UserType } from '../store/auth-store';

export type StoreFormProps = {
  id: string;
  name: string;
  slogan: string;
  description: string;
  logoAttachment: File | null;
  bannerAttachment: File | null;
  bankAccounts: {
    bankId: string;
    accName: string;
    accNumber: string;
  }[];
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
