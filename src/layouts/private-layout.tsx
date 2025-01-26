import Layout from '@/components/layout/Layout';
import React from 'react';
import { Navigate } from 'react-router';


type UserTypes = {
  id:number
  name: string;
  email: string;
} | null;

interface PrivateRouteProps {
  user: UserTypes;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ user }) => {
  if (!user || !user.name || !user.email) {
    return <Navigate to="/login" />;
  }
  return <Layout />;
};

export default PrivateRoute;