import { useSellerStore } from '@/hooks/store';
import { Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

interface LogoutButtonProps {
  onClick?: () => void;
}

const LogoutButtonBuyer: React.FC<LogoutButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const { store } = useSellerStore();

  const handleLogout = () => {
    Cookies.remove(`token-buyer-${store?.name}`);

    toast.success('Anda telah Logout', {
      style: {
        background: '#FFFF',
        color: '#1d1d1d',
        fontWeight: 'normal',
      },
    });

    if (onClick) {
      onClick();
    }
    navigate(`/${store?.name}/login-buyer`);
  };

  return (
    <Button
      outline={'none'}
      colorPalette={'red'}
      onClick={handleLogout}
      mb={'24'}
    >
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButtonBuyer;
