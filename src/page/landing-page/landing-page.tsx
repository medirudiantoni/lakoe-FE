import RippleButton from '@/components/Button/Ripple.button';
import CurveSection from '@/components/curveSection/curveSection';
import LogoIcon from '@/components/icons/logo';
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router';
import kendaliPenuh from '@/assets/kendali-penuh.png';
import loyalitas from '@/assets/loyalitas.png';
import Independensi from '@/assets/independensi.png';
import { Copyright } from 'lucide-react';

export function LandingPage() {
  return (
    <Box>
      {/* Navbar Start */}
      <HStack
        justifyContent={'space-between'}
        position="fixed"
        zIndex={10}
        top={0}
        left={0}
        w="full"
        bg="#fff"
      >
        <HStack justifyContent="space-between" w="full" h="fit" px="20" py="5">
          <LogoIcon />
          <HStack
            gap="10"
            fontSize="xl"
            fontWeight="medium"
            display={{ base: 'none', lg: 'flex' }}
          >
            <Link to={'/'}>
              <Text color="gray.600" _hover={{ color: 'blue.600' }}>
                Beranda
              </Text>
            </Link>
            <Link to={'/tentang'}>
              <Text color="gray.600" _hover={{ color: 'blue.600' }}>
                Tentang
              </Text>
            </Link>
            <Link to={'/pricing'}>
              <Text color="gray.600" _hover={{ color: 'blue.600' }}>
                Pricing
              </Text>
            </Link>
          </HStack>
          <Button bg="blue.600" borderRadius="xl" fontSize="md" py="5" px="8">
            Mulai Sekarang
          </Button>
        </HStack>
      </HStack>
      {/* Navbar End */}

      {/* Hero Section Start */}
      <section className="w-full h-fit">
        <VStack w="full" h="100vh" justifyContent="center">
          <VStack w="fit" maxW="4xl" h="fit" textAlign="center">
            <Heading size="7xl" className="font-bricolage-grosteque">
              Toko Online Resmi
              <br /> dibuat khusus untuk anda
            </Heading>
            <Text
              fontSize="3xl"
              maxW="3xl"
              mb="8"
              className="font-darker-grotesque font-medium"
            >
              Bayangkan punya toko online resmi yang bikin tetangga penasaran,
              mantan jadi kagum, dan pelanggan ketagihan! Gak perlu jago coding,
              cukup jago bermimpi. Yuk, bangun toko impianmu sekarang
            </Text>
            <RippleButton className="py-5 px-10 bg-neutral-900 text-white rounded-2xl">
              Cari Tahu dulu, ah!
            </RippleButton>
          </VStack>
        </VStack>
      </section>
      {/* Hero Section End */}

      <CurveSection />

      {/* Second section start */}
      <section className="w-full h-fit pb-40 rounded-b-[100px] bg-neutral-200">
        <VStack w="full" h="100vh" justifyContent="center">
          <VStack maxW="3xl" h="fit">
            <Text className="font-bricolage-grosteque font-semibold text-3xl text-center">
              Jual apa aja yang kamu mau*,
              <br />
              ciptakan peluang kesuksesan seluas-luasnya,
              <br />
              🚀gapai impian,
              <br />
              raih prestasi membagongkan, 🤣
              <br />
              dan gaet crush dengan aman, tanpa saingan, karena kamu sudah di
              atas awan 🌥️.
            </Text>
          </VStack>
        </VStack>
      </section>
      {/* Second section end */}

      {/* Third section start */}
      <section className="w-full h-fit rounded-b-xl">
        <HStack
          w="full"
          maxW="6xl"
          mx="auto"
          h="fit"
          py="100px"
          alignItems="center"
          gap="20"
        >
          <VStack flex={1} alignItems="start">
            <Heading
              size="4xl"
              fontWeight="semibold"
              className="font-bricolage-grosteque"
            >
              Kendali Penuh
            </Heading>
            <Text fontSize="xl" mb="5">
              Dengan website official store, Anda menguasai panggung penuh
              kreativitas, memahat setiap promosi sesuai visi tanpa batas.
              Setiap kata, gambar, dan tawaran adalah pilihan Anda, bebas dari
              aturan orang lain, menciptakan pengalaman unik bagi pelanggan.
            </Text>
            <Button bg="blue.600" borderRadius="xl" fontSize="md" py="5" px="8">
              Mulai Sekarang
            </Button>
          </VStack>
          <Box flex={1}>
            <Image
              w="full"
              h="fit"
              borderRadius={20}
              src={kendaliPenuh}
            ></Image>
          </Box>
        </HStack>
      </section>
      {/* Third section end */}

      {/* Fourth section start */}
      <section className="w-full h-fit">
        <HStack
          w="full"
          maxW="6xl"
          mx="auto"
          h="fit"
          py="100px"
          alignItems="center"
          gap="20"
        >
          <Box w="3/5">
            <Image w="full" h="fit" borderRadius={20} src={loyalitas}></Image>
          </Box>
          <VStack flex={1} alignItems="start">
            <Heading
              size="4xl"
              fontWeight="semibold"
              className="font-bricolage-grosteque"
            >
              Loyalitas
            </Heading>
            <Text fontSize="xl" mb="5">
              Dengan website Anda, loyalitas pelanggan tumbuh bagai taman yang
              dipupuk dengan perhatian. Setiap pembelian, setiap interaksi,
              adalah benih yang Anda tanam, berkembang menjadi hubungan yang
              kuat dan tak tergoyahkan. Pelanggan setia bukan sekadar transaksi,
              melainkan bagian dari perjalanan yang Anda jalani bersama mereka.
            </Text>
            <Button bg="blue.600" borderRadius="xl" fontSize="md" py="5" px="8">
              Mulai Sekarang
            </Button>
          </VStack>
        </HStack>
      </section>
      {/* Fourth section end */}

      {/* Fifth section start */}
      <section className="w-full h-fit">
        <HStack
          w="full"
          maxW="6xl"
          mx="auto"
          h="fit"
          py="100px"
          alignItems="center"
          gap="20"
        >
          <VStack flex={1} alignItems="start">
            <Heading
              size="4xl"
              fontWeight="semibold"
              className="font-bricolage-grosteque"
            >
              Independensi
            </Heading>
            <Text fontSize="xl" mb="5">
              Punya toko online tanpa potongan komisi—cuma bayar langganan
              bulanan! disini, Kamu bisa punya website jualan sendiri yang bisa
              dikustomisasi sesuka hati, tanpa drama marketplace. Semua
              keuntungan 100% milik Anda, dan kontrol sepenuhnya ada di tangan
              Anda. Simple, kan?, cuan coyyy cuan!!!!
            </Text>
            <Button bg="blue.600" borderRadius="xl" fontSize="md" py="5" px="8">
              Mulai Sekarang
            </Button>
          </VStack>
          <Box flex={1}>
            <Image
              w="full"
              h="fit"
              borderRadius={20}
              src={Independensi}
            ></Image>
          </Box>
        </HStack>
      </section>
      {/* Fifth section end */}

      {/* Sixth section start */}
      <section className="w-full h-fit">
        <HStack w="full" h="100vh" alignItems="center">
          <VStack w="full" alignItems="center" gap="1">
            <Text fontSize="lg" fontWeight="medium" className="font-poppins">
              Cukup dengan biaya mulai dari
            </Text>
            <HStack className="font-poppins font-bold text-blue-700">
              <Text fontSize="4xl">Rp</Text>
              <Text fontSize="6xl">300.000</Text>
            </HStack>
            <Text fontSize="lg" fontWeight="medium" className="font-poppins">
              Per-Bulan
            </Text>
          </VStack>
        </HStack>
      </section>
      {/* Sixth section end */}

      {/* Seventh section start */}
      <section className="w-full h-fit">
        <Heading
          size="4xl"
          textAlign="center"
          className="font-bricolage-grosteque font-semibold"
        >
          Bandingkan
        </Heading>
        <HStack
          flexWrap={{ base: 'wrap', lg: 'nowrap' }}
          alignItems="stretch"
          w="full"
          h="fit"
          py="40px"
          gap="10px"
        >
          <VStack
            flex={1}
            alignItems="start"
            borderRadius={30}
            bg="green.100"
            p="12"
            className="font-poppins"
          >
            <Text fontSize="2xl" fontWeight="semibold" mb="4">
              Tokopedia
            </Text>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Elektronik: 1-10%
            </Badge>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Fashion: 4-10%
            </Badge>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Lifestyle: 2.5-10%
            </Badge>
          </VStack>
          <VStack
            flex={1}
            alignItems="start"
            borderRadius={30}
            bg="orange.100"
            p="12"
            className="font-poppins"
          >
            <Text fontSize="2xl" fontWeight="semibold" mb="4">
              Shopee
            </Text>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Shopee Mall: 2.5-8.5%
            </Badge>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Star & Star+: 4.25-8%
            </Badge>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Non-Star: 4.25-8%
            </Badge>
          </VStack>
          <VStack
            flex={1}
            alignItems="start"
            borderRadius={30}
            bg="blue.100"
            p="12"
            className="font-poppins"
          >
            <Text fontSize="2xl" fontWeight="semibold" mb="4">
              Lazada
            </Text>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Kategori A: 8%
            </Badge>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Kategori B: 7.5%
            </Badge>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Kategori C: 5.75%
            </Badge>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Kategori D: 4.25%
            </Badge>
          </VStack>
          <VStack
            flex={1}
            alignItems="start"
            borderRadius={30}
            bg="red.100"
            p="12"
            className="font-poppins"
          >
            <Text fontSize="2xl" fontWeight="semibold" mb="4">
              Bukalapak
            </Text>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Super Seller: 1.5-6%
            </Badge>
            <Badge py="10px" px="16px" borderRadius={20} fontSize="lg">
              Non Super Seller: 1-6%
            </Badge>
          </VStack>
        </HStack>
      </section>
      {/* Seventh section end */}

      {/* 8th section start */}
      <section className="w-full h-fit mb-20">
        <HStack
          alignItems="start"
          gap="20"
          w="full"
          maxW="6xl"
          py="100px"
          mx="auto"
          h="fit"
        >
          <VStack alignItems="start">
            <Text
              fontSize="3xl"
              className="font-bricolage-grosteque font-semibold"
            >
              Di Lakoe cukup berlangganan perbulan, anda sudah bisa menikmati
              hasil penjualan dengan potongan yang Fix dan Keuntungan Maksimal
            </Text>
            <Button bg="blue.600" borderRadius="xl" fontSize="md" py="5" px="8">
              Mulai Sekarang
            </Button>
          </VStack>
          <Text textAlign="end" maxW="md">
            Di Lakoe, kami percaya bahwa setiap keuntungan dari hasil kerja
            keras Anda adalah milik Anda sepenuhnya. Dengan berlangganan
            bulanan, Anda bisa menikmati hasil penjualan tanpa ada potongan
            komisi, memberikan kendali penuh atas pendapatan Anda.
          </Text>
        </HStack>
      </section>
      {/* 8th section end */}

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
          <Button bg="blue.600" borderRadius="xl" fontSize="md" py="5" px="8">
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
    </Box>
  );
}
