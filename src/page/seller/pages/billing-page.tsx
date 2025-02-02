import { Box, Button, Heading, HStack, Text, Table, ClipboardRoot, Image } from "@chakra-ui/react"
import SellerFooter from "../components/footer";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { ClipboardIconButton } from "@/components/ui/clipboard";
import { useEffect } from "react";
// import Countdown from "../components/countDown";

const SellerBillingPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [])
    return (
        <Box w="full" minH="100vh" className="font-poppins">
            <Button onClick={() => navigate(-1)} position="absolute" top="10" left="10">
                <ArrowLeft />
                <Text>Back</Text>
            </Button>
            <HStack justifyContent="center" w="full" maxW="6xl" mx="auto" py="32">

                <Box w="full" maxW="xl">
                    <Heading size="2xl" fontWeight="bold" mb="5" className="font-poppins">Pembayaran</Heading>
                    <Table.Root size="lg" mb="5">
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell px="0">Total Pembayaran</Table.Cell>
                                <Table.Cell px="0" textAlign="end">{"Rp5.050.000,-"}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell px="0">Waktu Pembayaran berakhir dalam</Table.Cell>
                                <Table.Cell px="0" textAlign="end">
                                    <Text>23 jam 25 menit 12 detik</Text>
                                    {/* <Countdown targetTime="" isPaid="" /> */}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell px="0">Bayar Sebelum</Table.Cell>
                                <Table.Cell px="0" textAlign="end">
                                    <Text>02 Februari 2025, Pukul 15:52</Text>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell px="0">Metode Pembayaran</Table.Cell>
                                <Table.Cell px="0" textAlign="end">
                                    <Text>Gopay</Text>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell px="0">Kode Pembayaran / No Rekening</Table.Cell>
                                <Table.Cell px="0" textAlign="end">
                                    <HStack justifyContent="end">
                                        <ClipboardRoot value="81202912182171">
                                            <ClipboardIconButton />
                                        </ClipboardRoot>
                                        <Text>81202912182171</Text>
                                    </HStack>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell px="0">Atau Scan QR code ini untuk pembayaran</Table.Cell>
                                <Table.Cell px="0" textAlign="end">
                                    <HStack justifyContent="end">
                                        <Image w="full" h="fit" objectFit="contain" src="https://i.pinimg.com/736x/96/7e/f2/967ef2c1c4a690bb332fd91413d0393a.jpg" />
                                    </HStack>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                    <HStack>
                        <Button flex={1} onClick={() => navigate('/seller')} variant="outline" borderWidth={1} borderColor="gray.600">Lanjut Belanja</Button>
                        <Button flex={1} onClick={() => navigate('/seller/buyer')}>Lihat Pesanan</Button>
                    </HStack>
                </Box>

            </HStack>
            <SellerFooter />
        </Box>
    )
}

export default SellerBillingPage;