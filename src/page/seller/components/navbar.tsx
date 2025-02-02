import useCart from "@/hooks/cart-store"
import { Box, Center, HStack, Text } from "@chakra-ui/react"
import { Search, ShoppingBag, UserRound } from "lucide-react"
import { Link, useNavigate } from "react-router"

interface SellerNavbarProps {
    onSearch?: () => void;
}

const SellerNavbar: React.FC<SellerNavbarProps> = ({ onSearch }) => {
    const { totalQuantity } = useCart();
    const navigate = useNavigate();
    const handleOnSearch = () => {
        navigate('/seller/search');
        onSearch && onSearch();
    }
    return (
        <HStack px={{ base: "5", lg: "10" }} position={"fixed"} zIndex="10" w="full" className="backdrop-blur-md bg-white/60">
            <HStack justifyContent="space-between" w="full" maxW="7xl" mx="auto" py="5">
                <HStack onClick={() => navigate('/seller')} gap={2} cursor="pointer">
                    {/* <Image src="/logo.png" h="8"></Image> */}
                    <Text fontSize="2xl" fontWeight="bold" className="font-poppins">Store Brand</Text>
                </HStack>
                <HStack>
                    <Box role="button" cursor="pointer" onClick={handleOnSearch}>
                        <Center position="relative" py={2} px={2} borderRadius="lg" _hover={{ bg: "gray.200" }} _active={{ bg: "blue", transform: "scale(0.95)" }}>
                            <Search strokeWidth="2px" />
                        </Center>
                    </Box>
                    <Link to="/seller/cart">
                        <Center position="relative" py={2} px={2} borderRadius="lg" _hover={{ bg: "gray.200" }} _active={{ bg: "blue", transform: "scale(0.95)" }}>
                            <ShoppingBag strokeWidth="2px" />
                            {totalQuantity >= 1 && (
                                <Center position="absolute" left="50%" bottom="50%" w="6" h="6" borderRadius="full" bg="orange.600">{totalQuantity}</Center>
                            )}
                        </Center>
                    </Link>
                    <Link to="/seller/buyer">
                        <Center position="relative" py={2} px={2} borderRadius="lg" _hover={{ bg: "gray.200" }} _active={{ bg: "blue", transform: "scale(0.95)" }}>
                            <UserRound strokeWidth="2px" />
                        </Center>
                    </Link>
                </HStack>
            </HStack>
        </HStack>
        <HStack>
          <Link to="/seller">
            <Center
              py={2}
              px={2}
              borderRadius="lg"
              _hover={{ bg: 'gray.200' }}
              _active={{ bg: 'blue', transform: 'scale(0.95)' }}
            >
              <Search strokeWidth="2px" />
            </Center>
          </Link>
          <Link to="/cart">
            <Center
              py={2}
              px={2}
              borderRadius="lg"
              _hover={{ bg: 'gray.200' }}
              _active={{ bg: 'blue', transform: 'scale(0.95)' }}
            >
              <ShoppingBag strokeWidth="2px" />
            </Center>
          </Link>
          <Link to="/seller">
            <Center
              py={2}
              px={2}
              borderRadius="lg"
              _hover={{ bg: 'gray.200' }}
              _active={{ bg: 'blue', transform: 'scale(0.95)' }}
            >
              <UserRound strokeWidth="2px" />
            </Center>
          </Link>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default SellerNavbar;
