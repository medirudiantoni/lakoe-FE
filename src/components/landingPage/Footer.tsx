import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import LogoIcon from '../icons/logo'
import { Link, useNavigate } from 'react-router'
import { Copyright } from 'lucide-react'

const Footer = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* 9th section start */}
            <section className="w-full h-fit rounded-t-[200px] bg-blue-100">
                <VStack
                    gap={5}
                    py="200px"
                    w="full"
                    maxW="2xl"
                    mx="auto"
                    textAlign="center"
                >
                    <Heading
                        size="7xl"
                        fontWeight="semibold"
                        className="font-bricolage-grosteque"
                    >
                        Cuan, cuan, cuan
                    </Heading>
                    <Button onClick={() => navigate('/register')} bg="blue.600" borderRadius="xl" fontSize="md" py="5" px="8">
                        Mulai Sekarang
                    </Button>
                    <Text
                        className="font-darker-grotesque"
                        fontSize="4xl"
                        fontWeight="medium"
                        lineHeight="1"
                    >
                        Kalo gak sekarang kapan lagi, kalo bukan kamu, masa orang lain mulu,
                        masa kamu kesalip mulu sama kesuksesan orang, kuy buruan... cuan
                        coy... cuannn!!!
                    </Text>
                </VStack>
            </section>
            {/* 9th section end */}

            {/* footer start */}
            <footer className="w-full h-fit bg-blue-100">
                <Box
                    w="full"
                    h="fit"
                    bg="blue.500"
                    color="white"
                    py="100px"
                    px="5"
                    className="rounded-t-[120px]"
                >
                    <HStack
                        mx="auto"
                        justifyContent="space-between"
                        py="10"
                        alignItems="start"
                        w="full"
                        maxW="5xl"
                        h="fit"
                        className="border-b-2"
                    >
                        <LogoIcon color="white" />
                        <HStack
                            w="full"
                            maxW="sm"
                            justifyContent="end"
                            alignItems="start"
                            gap="10"
                            h="fit"
                        >
                            <VStack alignItems="start">
                                <Heading size="2xl" mb="2" fontWeight="semibold">
                                    Ikuti Kami
                                </Heading>
                                <Link to="/">Instagram</Link>
                                <Link to="/">Twitter/x</Link>
                                <Link to="/">Facebook</Link>
                                <Link to="/">Youtube</Link>
                            </VStack>
                            <VStack alignItems="start">
                                <Heading size="2xl" mb="2" fontWeight="semibold">
                                    Menu
                                </Heading>
                                <Link to="/about">About</Link>
                                <Link to="/pricing">Pricing</Link>
                            </VStack>
                        </HStack>
                    </HStack>
                    <HStack justifyContent="center" gap="1" py="2">
                        <Copyright size="20px" />
                        <Text>Lakoe Team 2, 2025</Text>
                    </HStack>
                </Box>
            </footer>
            {/* footer end */}
        </>
    )
}

export default Footer