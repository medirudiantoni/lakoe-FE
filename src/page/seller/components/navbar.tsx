import { Center, HStack, Text } from "@chakra-ui/react"
import { Search, ShoppingBag, UserRound } from "lucide-react"
import { Link } from "react-router"

const SellerNavbar = () => {
    return (
        <HStack position={"fixed"} zIndex="10" w="full" className="backdrop-blur-md bg-white/60">
            <HStack justifyContent="space-between" w="full" maxW="7xl" mx="auto" py="5">
                <HStack gap={2}>
                    {/* <Image src="/logo.png" h="8"></Image> */}
                    <Text fontSize="2xl" fontWeight="bold" className="font-poppins">Store Brand</Text>
                </HStack>
                <HStack>
                    <Link to="/seller">
                        <Center py={2} px={2} borderRadius="lg" _hover={{ bg: "gray.200" }} _active={{ bg: "blue", transform: "scale(0.95)" }}>
                            <Search strokeWidth="2px" />
                        </Center>
                    </Link>
                    <Link to="/seller/cart">
                        <Center py={2} px={2} borderRadius="lg" _hover={{ bg: "gray.200" }} _active={{ bg: "blue", transform: "scale(0.95)" }}>
                            <ShoppingBag strokeWidth="2px" />
                        </Center>
                    </Link>
                    <Link to="/seller">
                        <Center py={2} px={2} borderRadius="lg" _hover={{ bg: "gray.200" }} _active={{ bg: "blue", transform: "scale(0.95)" }}>
                            <UserRound strokeWidth="2px" />
                        </Center>
                    </Link>
                </HStack>
            </HStack>
        </HStack>
    )
}

export default SellerNavbar