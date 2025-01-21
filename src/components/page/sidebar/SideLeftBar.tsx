import { Box, Flex } from "@chakra-ui/react"
import { Link, useLocation } from "react-router"
import { BoxIcon, LayoutDashboard, Settings, ShoppingBag } from 'lucide-react';

const SideBar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path: string) => currentPath === path;
    return (
      <Box h="100vh" textAlign="left" paddingX="20px" paddingY="20px" position="relative"  >
        <Box marginTop="4" h="80%" >
        <ul className="list-none">
          <li>
            <Link
              to="/"
              className={`flex items-center my-2 px-5 py-2 ${
                isActive('/') ? 'text-[#0086B4] bg-[#F8F8F8]'  : 'hover:text-[#0086B4] hover:bg-[#F8F8F8]'
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
                isActive('/product') ? 'text-[#0086B4] bg-[#F8F8F8]' : 'hover:text-[#0086B4] hover:bg-[#F8F8F8]'
              }`}
            >
            <Flex gap={2}>
                <BoxIcon/>
                <span>Produk</span>
            </Flex>
         
            </Link>
          </li>
          <li>
            <Link
              to="/order-list"
              className={`flex items-center  my-2 px-5 py-2 ${
                isActive('/order-list') ? 'text-[#0086B4] bg-[#F8F8F8]' : 'hover:text-[#0086B4] hover:bg-[#F8F8F8]'
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
                isActive('/setting') ? 'text-[#0086B4] bg-[#F8F8F8]' : 'hover:text-[#0086B4] hover:bg-[#F8F8F8]'
              }`}
            >
            <Flex gap={2}>
            <Settings />
                <span>Pengaturan</span>
            </Flex>
            </Link>
          </li>
        </ul>
      </Box>
      </Box>
      
    )
}

export default SideBar