import { Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import SellerLogo from "./logo";
import { CopyrightIcon } from "lucide-react";

export default function SellerFooter(){
    return (
        <footer className="w-full bg-neutral-300 font-poppins">
                <Box maxW="7xl" mx="auto" py="10">

                    <Flex justifyContent="space-between" pb="4" borderBottomWidth={2} borderBottomColor="gray.800">
                        <Box w="fit">
                            <Box mb="10">
                                <SellerLogo brandName="Nama Toko" fontSize="2xl" />
                            </Box>
                            <Box mb="4">
                                <Heading fontWeight="semibold">Alamat</Heading>
                                <Text>Tempat lokasi kantor atau outlet</Text>
                            </Box>
                            <Box mb="4">
                                <Heading fontWeight="semibold">Kontak</Heading>
                                <Text>+62 888 8888 8888</Text>
                                <Text>tokoini@email.com</Text>
                            </Box>
                        </Box>
                        <Box w="fit">
                            <Box mb="4">
                                <Heading fontWeight="semibold" mb="4">Ikuti Kami</Heading>
                                <Stack>
                                    <Text>Instagram</Text>
                                    <Text>Facebook</Text>
                                    <Text>Twitter</Text>
                                    <Text>Youtube</Text>
                                    <Text>Thread</Text>
                                </Stack>
                            </Box>
                        </Box>
                    </Flex>
                    <HStack justifyContent="center" gap={0.5} my="2">
                        <CopyrightIcon size="16px" />
                        <Text>2025 nama toko powered by Lakoe</Text>
                    </HStack>
                </Box>
            </footer>
    )
}