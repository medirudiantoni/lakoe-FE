import Footer from "@/components/landingPage/Footer"
import Navbar_Landing_page from "@/components/landingPage/Navbar_Landing_page"
import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"

const AboutPage = () => {
    return (
        <Box w="full" minH="100vh">
            <Navbar_Landing_page />

            <section className="w-full min-h-screen flex items-end pt-60">
                <VStack alignItems="start" w="full" maxW="7xl" mx="auto">
                    <Heading size="2xl" color="blue.600" className="font-poppins font-semibold">Tentang</Heading>
                    <HStack w="full" alignItems="start" mb="16" justifyContent="space-between">
                        <Text maxW="xl" fontSize="4xl" fontWeight="bold" className="font-bricolage-grosteque">Kami hadir untuk membantu anda menaklukkan dunia</Text>
                        <Text maxW="xl" fontSize="2xl" fontWeight="medium" className="font-darker-grotesque" textAlign="end">Kami hadir untuk membantu Anda menaklukkan dunia bisnis online. Dengan platform kami, Anda bisa menciptakan website jualan sendiri yang profesional, tanpa komisi yang memotong keuntungan. Kendali penuh, keuntungan maksimal, semuanya dirancang untuk membuat bisnis Anda bersinar.</Text>
                    </HStack>
                    <HStack w="full" overflowX="hidden">
                        <Box flex={1}>
                            <Image w="full" aspectRatio="4/3" borderRadius="3xl" objectFit="cover" src="/clothes.jpg"></Image>
                        </Box>
                        <Box flex={1}>
                            <Image w="full" aspectRatio="4/3" borderRadius="3xl" objectFit="cover" src="/seller1.jpg"></Image>
                        </Box>
                        <Box flex={1}>
                            <Image w="full" aspectRatio="4/3" borderRadius="3xl" objectFit="cover" src="/seller2.jpg"></Image>
                        </Box>
                    </HStack>
                </VStack>
            </section>

            <section className="w-full h-screen flex items-end py-20">
                <HStack w="full" maxW="7xl" mx="auto">
                    <VStack alignItems="start" w="4/6" pr="20">
                        <Heading size="5xl" fontWeight="semibold" className="font-bricolage-grosteque">Tentang Lakoe</Heading>
                        <Text fontSize="2xl">Lakoe adalah website aplikasi yang diperuntukkan bagi siapa saja yang hendak membuka bisnis jualan produk barang dan jasa secara profesional.
                        Fokus utamanya adalah untuk menjadikan seller sebagai pebisnis yang bebas dari persaingan baik komoditas maupun harga dengan seller lain seperti pada platform e-commerce konvensional. <br />
                        Selain itu juga dengan tujuan untuk memaksimalkan margin dan pendapatan pengguna disetiap transaksi yang terjadi tanpa ada potongan sedikitpun sehingga setiap keuntungan adalah milik pengguna. Dengan hanya membayar langganan saja, pengguna sudah menjadi seller yang bisa memaksimalkan keuntungan tanpa potongan meskipun transaksinya miliaran. </Text>
                    </VStack>
                    <HStack justifyContent="center" flex="1">
                        <Image w="full" h="auto" src="/groceries.svg"></Image>
                    </HStack>
                </HStack>
            </section>

            <Footer />

        </Box>
    )
}

export default AboutPage