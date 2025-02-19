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
import {
  Box,
  Button,
  Flex,
  MenuContent,
  MenuRoot,
  MenuTrigger,
  Text,
} from '@chakra-ui/react';
import {
  BoxIcon,
  CircleUser,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import LogoutButton from '../auth/logout';

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
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center my-2 px-5 py-2 ${
                  isActive(['/dashboard'])
                    ? 'text-[#0086B4] bg-[#F8F8F8]'
                    : 'hover:text-[#0086B4] hover:bg-[#F8F8F8]'
                }`}
              >
                <Flex gap={2}>
                  <LayoutDashboard />
                  <span>Dashboard </span>
                </Flex>
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className={`flex items-center my-2 px-5 py-2 ${
                  isActive(['/product', '/add-product'])
                    ? 'text-[#0086B4] bg-[#F8F8F8]'
                    : 'hover:text-[#0086B4] hover:bg-[#F8F8F8]'
                }`}
              >
                <Flex gap={2}>
                  <BoxIcon />
                  <span>Produk</span>
                </Flex>
              </Link>
            </li>
            <li>
              <Link
                to="/order-list"
                className={`flex items-center  my-2 px-5 py-2 ${
                  isActive(['/order-list', '/order-detail/'])
                    ? 'text-[#0086B4] bg-[#F8F8F8]'
                    : 'hover:text-[#0086B4] hover:bg-[#F8F8F8]'
                }`}
              >
                <Flex gap={2}>
                  <ShoppingBag />
                  <span>Pesanan</span>
                </Flex>
              </Link>
            </li>
            <li>
              <Link
                to="/setting"
                className={`flex items-center  my-2 px-5 py-2 ${
                  isActive(['/setting'])
                    ? 'text-[#0086B4] bg-[#F8F8F8]'
                    : 'hover:text-[#0086B4] hover:bg-[#F8F8F8]'
                }`}
              >
                <Flex gap={2}>
                  <Settings />
                  <span>Pengaturan</span>
                </Flex>
              </Link>
            </li>
          </ul>

          <Box position={'relative'}>
            <MenuRoot positioning={{ placement: 'top-start' }}>
              <MenuTrigger asChild outline={'none'}>
                <Box
                  onClick={() => setIsActiveButton((prev) => !prev)}
                  className={`flex items-center my-2 px-5 py-2 z-20 cursor-pointer ${
                    isActiveButton
                      ? 'text-[#0086B4] bg-[#F8F8F8]'
                      : 'hover:text-[#0086B4] hover:bg-[#F8F8F8]'
                  }`}
                >
                  <Flex gap={2}>
                    <CircleUser />
                    <span>Profile</span>
                  </Flex>
                </Box>
              </MenuTrigger>
              <MenuContent position={'absolute'} top={'-32'} w={'full'}>
                <Box cursor={'pointer'} border={'none'} outline={'none'}>
                  <Link to={'/profile'}>
                    <Box
                      px={3}
                      py={3}
                      gap={3}
                      display={'flex'}
                      alignItems={'center'}
                      _hover={{ bg: 'gray.200' }}
                    >
                      <User />
                      Profile
                    </Box>
                  </Link>
                </Box>

                {/* <MenuItem value='logout'  cursor={'pointer'} > */}
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
                      <Text>
                        Apakah Anda yakin ingin keluar dari akun Anda?"
                      </Text>
                    </DialogBody>
                    <DialogFooter>
                      <DialogActionTrigger asChild>
                        <Button outline={'none'} variant="outline">
                          Cancel
                        </Button>
                      </DialogActionTrigger>
                      <LogoutButton />
                    </DialogFooter>
                    <DialogCloseTrigger />
                  </DialogContent>
                </DialogRoot>
                {/* </MenuItem> */}
              </MenuContent>
            </MenuRoot>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
