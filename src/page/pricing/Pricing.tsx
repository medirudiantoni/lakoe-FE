import LogoIcon from "@/components/icons/logo"
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { ArrowLeft, Bird, BriefcaseBusiness, Handshake } from "lucide-react"
import { useNavigate } from "react-router"

const pricings = [
    {
        lucide_icon: <Bird />,
        price: "free",
        price_color: "gray.600",
        name: "Beginner",
        limit: "4 Produk",
        limit_color: "blue.200"
    },
    {
        lucide_icon: <Handshake />,
        price: "Rp 300.000,-",
        price_color: "teal.600",
        name: "Profesional",
        limit: "100 Produk",
        limit_color: "orange.200"
    },
    {
        lucide_icon: <BriefcaseBusiness />,
        price: "Rp 1.500.000,-",
        price_color: "blue.600",
        name: "Business",
        limit: "Unlimited Produk",
        limit_color: "green.200"
    },
]

const PricingPage = () => {
    const navigate = useNavigate();
    return (
        <Box w="full" minH="100vh">
            <VStack py="10" position="relative">
                <Button onClick={() => navigate(-1)} alignSelf="self-start" position="absolute" left="10">
                    <ArrowLeft />
                    <Text>Back</Text>
                </Button>
                <LogoIcon />
            </VStack>
            <VStack>
                <Heading size="4xl" fontWeight="semibold" className="font-bricolage-grosteque">Pricing</Heading>
                <Text fontSize="xl" maxW="lg" textAlign="center" mb="4">Mulai bangun bisnis dan tentukan paket yang tepat untuk kebutuhan anda</Text>
                <HStack flexWrap={{ base: "wrap", lg: "nowrap" }}>
                    {pricings.map(item => (
                        <Box w="xs" borderRadius="20px" p="2" borderWidth="2px" borderColor="black">
                            <Box w="full" p="4">
                                <HStack justifyContent="center" w="12" h="12" mb="32" borderRadius={100} bg="blue.200">
                                    {item.lucide_icon}
                                </HStack>
                                <Box w="full" mb="4">
                                    <Text className="font-bricolage-grosteque" color={item.price_color} fontSize="xl" fontWeight="semibold">{item.price}</Text>
                                    <Text className="font-bricolage-grosteque" color="gray.900" fontSize="4xl" fontWeight="bold">{item.name}</Text>
                                    <Text className="font-poppins" color="gray.900" fontSize="sm" fontWeight="medium" py="1" px="2" bg={item.limit_color} borderRadius="lg" w="fit">{item.limit}</Text>
                                </Box>
                            </Box>
                            <Button w="full" bg="blue.500" color="white" borderRadius="xl">
                                Pilih {item.name}
                            </Button>
                        </Box>
                    ))}

                </HStack>
            </VStack>
        </Box>
    )
}

export default PricingPage