import { Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

interface LogoutButtonProps {
  onClick?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');

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
    navigate('/login');
  };

  return (
    <Button outline={'none'} colorPalette={'red'} onClick={handleLogout}>
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
