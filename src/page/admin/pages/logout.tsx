import React from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

interface LogoutButtonProps {
  onClick?: () => void;
}

const LogoutAdminButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token-admin');
  
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
    navigate('/login-admin');
  };

  return (
    <Button outline={'none'} colorPalette={'red'} onClick={handleLogout}>
      <span>Logout</span>
    </Button>
  );
};

export default LogoutAdminButton;
