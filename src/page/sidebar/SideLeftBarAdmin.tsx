import { Button } from '@/components/ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Box, Flex, Text } from '@chakra-ui/react';
import { CircleUser, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import LogoutButton from '../auth/logout';
import LogoutAdminButton from '../admin/pages/logout';
import ProfileLottie from '@/components/icons/lottie-profile';

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isActiveButton, setIsActiveButton] = useState(false);

  const isActive = (paths: string[]) => {
    return paths.some(
      (path) =>
        currentPath === path || (path !== '/' && currentPath.startsWith(path))
    );
  };

  return (
    <Box
      h="100vh"
      textAlign="left"
      paddingX="20px"
      paddingY="20px"
      position="relative"
    >
      <Box marginTop="4" h="100vh">
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          h={'80%'}
        >
          <ul className="list-none">
            {/* <li>
              <Link
                to="/dashboard"
                className={`flex items-center my-2 px-5 py-2 ${
                  isActive(['/dashboard'])
                    ? 'text-[#0086B4] bg-[#F8F8F8]'
                    : 'hover:text-[#0086B4] hover:bg-[#F8F8F8]'
                }`}
              >
                <Flex gap={2}>
                  <CircleUser />
                  Profile
                </Flex>
              </Link>
            </li> */}
            <ProfileLottie />
          </ul>

          <DialogRoot>
            <DialogTrigger asChild>
              <Box
                display={'flex'}
                alignItems={'center'}
                py={3}
                px={3}
                gap={3}
                cursor={'pointer'}
                color="fg.error"
                _hover={{ bg: 'bg.error', color: 'fg.error' }}
              >
                <LogOut />
                LogOut
              </Box>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Konfirmasi Logout</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Text>Apakah Anda yakin ingin keluar dari akun Anda?"</Text>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button outline={'none'} variant="outline">
                    Cancel
                  </Button>
                </DialogActionTrigger>
                <LogoutAdminButton />
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
