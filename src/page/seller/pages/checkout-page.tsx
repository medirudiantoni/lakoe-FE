import { Box, Button, Flex, Heading, HStack, Image, RadioGroupRoot, Table, Text, VStack } from "@chakra-ui/react"
import SellerFooter from "../components/footer";
import { useNavigate } from "react-router";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { eWallets, virtualAccount } from "@/page/payment-page/PaymentPage";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import LoadingButtonLottie from "@/components/icons/loading-button";
import toast from "react-hot-toast";
import { useSellerStore } from "@/hooks/store";

const SellerCheckoutPage = () => {
    const navigate = useNavigate();
    const { store } = useSellerStore();
    const [isPaymentMethod, setIsPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = () => {
        setLoading(true)
        setTimeout(() => {
            navigate(`/${store?.name}/payment`);
            setLoading(false);
            toast.success('Pesanan anda telah dibuat');
        }, 2000);
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [])

    return (
        <Box w="full" minH="100vh" className="font-poppins">

            <Button onClick={() => navigate(-1)} position="absolute" top="10" left="10">
                <ArrowLeft />
                <Text>Back</Text>
            </Button>

            <Box w="full" maxW="6xl" mx="auto" py="20">

                <HStack alignItems="start" w="full" h="fit" gap="10" position="relative" flexWrap={{ base: "wrap", lg: "nowrap" }}>

                    <Box flex={1} h="fit">
                        <Heading size="2xl" fontWeight="bold" mb="5" fontFamily="inherit">Checkout</Heading>

                        {/* Alamat Pengiriman start */}
                        <Box mb="10">
                            <Heading size="xl" fontWeight="medium" pb="1" mb="2" borderBottomWidth={1} borderColor="black" fontFamily="inherit">Alamat Pengiriman</Heading>
                            <HStack alignItems="start" flexWrap={{ base: "wrap", lg: "nowrap" }}>
                                <VStack alignItems="start">
                                    <Text>Medi Rudiantoni</Text>
                                    <Text>medirudiant@gmail.com</Text>
                                    <Text>081238848493</Text>
                                    <Text>Jl. KH. Ahmad Dahlan No.73, Notoprajan, Ngampilan, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55262 (Masjid AT-Tahkim), KOTA YOGYAKARTA - NGAMPILAN, DI YOGYAKARTA, ID 55262</Text>
                                </VStack>
                                <Flex justifyContent="end">
                                    <Button>Ubah</Button>
                                </Flex>
                            </HStack>
                        </Box>
                        {/* Alamat Pengiriman end */}

                        {/* Metode Pengiriman start */}
                        <Box mb="10">
                            <Heading size="xl" fontWeight="medium" pb="1" mb="2" borderBottomWidth={1} borderColor="black" fontFamily="inherit">Metode Pengiriman</Heading>
                            <RadioGroupRoot>
                                <RadioGroup>
                                    <VStack alignItems="start">
                                        <Radio value="oke" textAlign="start">
                                            <Box px="4" py="2">
                                                <Text fontSize="lg" fontWeight="semibold">Reguler</Text>
                                                <Text>Tiba dalam: 3 - 4 hari</Text>
                                            </Box>
                                        </Radio>
                                        <Radio value="okeo" textAlign="start">
                                            <Box px="4" py="2">
                                                <Text fontSize="lg" fontWeight="semibold">Express</Text>
                                                <Text>Tiba dalam: 1 - 2 hari</Text>
                                            </Box>
                                        </Radio>
                                    </VStack>
                                </RadioGroup>
                            </RadioGroupRoot>
                        </Box>
                        {/* Metode Pengiriman end */}

                        {/* Metode pembayaran start */}
                        <Box mb="10">
                            <Heading size="xl" fontWeight="medium" pb="1" mb="5" borderBottomWidth={1} borderColor="black" fontFamily="inherit">Metode Pembayaran</Heading>
                            <Box w="full" mb="5">
                                <Text fontSize="lg" fontWeight="medium" mb="2">Dompet digital</Text>
                                <HStack>
                                    {eWallets.map((item, id) => (
                                        <HStack
                                            role="button"
                                            onClick={() => setIsPaymentMethod(item.name)}
                                            key={id}
                                            w="28"
                                            justifyContent="center"
                                            py="2"
                                            px="6"
                                            borderWidth={2}
                                            borderColor="gray.100"
                                            _hover={{ bg: 'blue.100' }}
                                            bg={isPaymentMethod === item.name ? 'blue.100' : 'gray.100'}
                                            borderRadius="xl"
                                            aspectRatio="4/2"
                                        >
                                            <Image
                                                w="full"
                                                h="full"
                                                objectFit="contain"
                                                src={item.image}
                                            ></Image>
                                        </HStack>
                                    ))}
                                </HStack>
                            </Box>
                            <Box w="full">
                                <Text fontSize="lg" fontWeight="medium" mb="2">Dompet digital</Text>
                                <HStack>
                                    {virtualAccount.map((item, id) => (
                                        <HStack
                                            role="button"
                                            onClick={() => setIsPaymentMethod(item.name)}
                                            key={id}
                                            w="28"
                                            justifyContent="center"
                                            py="2"
                                            px="6"
                                            borderWidth={2}
                                            borderColor="gray.100"
                                            _hover={{ bg: 'blue.100' }}
                                            bg={isPaymentMethod === item.name ? 'blue.100' : 'gray.100'}
                                            borderRadius="xl"
                                            aspectRatio="4/2"
                                        >
                                            <Image
                                                w="full"
                                                h="full"
                                                objectFit="contain"
                                                src={item.image}
                                            ></Image>
                                        </HStack>
                                    ))}
                                </HStack>
                            </Box>
                        </Box>
                        {/* Metode pembayaran end */}

                    </Box>

                    <Box w={{ base: "full", lg: "96" }} pl="5" h="50vh" position="sticky" top={10}>
                        <Heading size="2xl" fontWeight="bold" mb="5" fontFamily="inherit">Ringkasan Pesanan</Heading>
                        <Table.Root size="lg">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader px="0" fontWeight="semibold">Product</Table.ColumnHeader>
                                    <Table.ColumnHeader px="0" textAlign="end" fontWeight="semibold">Price</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell px="0">{"Subtotal"}</Table.Cell>
                                    <Table.Cell px="0" textAlign="end">{"Rp5.000.000,-"}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell px="0">{"Biaya Pengiriman"}</Table.Cell>
                                    <Table.Cell px="0" textAlign="end">{"Rp50.000,-"}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.ColumnHeader px="0" py="5" borderBottom={0} fontWeight="semibold">Total</Table.ColumnHeader>
                                    <Table.ColumnHeader px="0" py="5" borderBottom={0} textAlign="end" fontWeight="semibold">{"Rp 5.050.000,-"}</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Footer>
                        </Table.Root>
                        <HStack justifyContent="space-between" fontWeight="medium" borderTopWidth={1} py="4">
                            <Text>Metode Pembayaran</Text>
                            <Text>{isPaymentMethod}</Text>
                        </HStack>
                        <Button w="full" onClick={handlePlaceOrder}>
                            {loading ? (
                                <LoadingButtonLottie />
                            ) : "Buat Pesanan"}
                        </Button>

                    </Box>
                </HStack>

            </Box>

            <SellerFooter />
        </Box>
    )
}

export default SellerCheckoutPage;