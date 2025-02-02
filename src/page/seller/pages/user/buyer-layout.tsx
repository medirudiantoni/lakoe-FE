import { Box, Button, Flex, Input, Stack, Text, Textarea, VStack } from "@chakra-ui/react"
// import { useNavigate } from "react-router";
import SellerNavbar from "../../components/navbar";
import SellerFooter from "../../components/footer";
import BuyerOrderPage from "./order-page";
import { useEffect } from "react";
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";

const BuyerLayout = () => {
    // const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [])
    return (
        <Box w="full" minH="100vh" className="font-poppins" overflowX="hidden">
            <SellerNavbar />
            <Flex w="full" flexDirection={{ base: "column", lg: "row" }} pt={{ base: "28", lg: "20" }} px={{ base: 5, lg: 0 }} gap={5} className="bg-slate-200">
                <VStack w={{ base: "full", lg: "340px" }} p={{ base: 0, lg: "5" }} pr={0} h={{ base: "fit", lg: "100vh" }} position={{ base: "relative", lg: "sticky" }} top={{ base: 0, lg: "20" }}>
                    <Box w="full" p="5" bg="white" borderRadius="xl">
                        <Text fontSize="xl" fontWeight="semibold" mb="5">Tentang Akun</Text>
                        <VStack alignItems="stretch" mb="5">
                            <VStack alignItems="start" mb="5">
                                <Text fontSize="lg" fontWeight="medium">Akun</Text>
                                <Text w="full" pb="2" borderBottomWidth={1} borderColor="gray.200">Medi Rudiantoni</Text>
                                <Text w="full" pb="2" borderBottomWidth={1} borderColor="gray.200">+62 822 2090 1125</Text>
                                <Text w="full" pb="2" borderBottomWidth={1} borderColor="gray.200">medirudiant@gmail.com</Text>
                                <DialogRoot closeOnInteractOutside={false}>
                                    <DialogTrigger asChild>
                                        <Button>Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Informasi Akun</DialogTitle>
                                        </DialogHeader>
                                        <DialogBody pb="4">
                                            <Stack gap="4" mb="2">
                                                <Field label="Nama">
                                                    <Input placeholder="Nama"></Input>
                                                </Field>
                                            </Stack>
                                            <Stack gap="4" mb="2">
                                                <Field label="Email">
                                                    <Input placeholder="Email"></Input>
                                                </Field>
                                            </Stack>
                                            <Stack gap="4" mb="2">
                                                <Field label="No. Telp">
                                                    <Input placeholder="No. Telp"></Input>
                                                </Field>
                                            </Stack>
                                            <Stack gap="4" mb="2">
                                                <Field label="Alamat">
                                                    <Textarea placeholder="Alamat"></Textarea>
                                                </Field>
                                            </Stack>
                                        </DialogBody>
                                        <DialogFooter>
                                            <DialogActionTrigger>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogActionTrigger>
                                            <Button>Simpan</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </DialogRoot>
                            </VStack>
                            <VStack alignItems="start">
                                <Text fontSize="lg" fontWeight="medium">Alamat</Text>
                                <Text w="full" pb="2" borderBottomWidth={1} borderColor="gray.200">Jl. Kota Agung-Bengkunat, Pekon Lakaran, Kec. Wonosobo, Kab. Tanggamus, Lampung</Text>
                                <DialogRoot closeOnInteractOutside={false}>
                                    <DialogTrigger asChild>
                                        <Button>Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Alamat</DialogTitle>
                                        </DialogHeader>
                                        <DialogBody pb="4">
                                            <Stack gap="4" mb="2">
                                                <Field label="Alamat">
                                                    <Input placeholder="Alamat"></Input>
                                                </Field>
                                            </Stack>
                                        </DialogBody>
                                        <DialogFooter>
                                            <DialogActionTrigger>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogActionTrigger>
                                            <Button>Simpan</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </DialogRoot>
                            </VStack>
                        </VStack>
                        {/* <Button>Edit</Button> */}

                    </Box>
                </VStack>
                <Box flex="1" p="5" pl={0} h="fit" overflowX="hidden">
                    <BuyerOrderPage />
                </Box>
            </Flex>
            <SellerFooter />
        </Box>
    )
}

export default BuyerLayout