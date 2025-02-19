import { Box, Button, Heading, HStack, Table, Text } from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { createOrder } from '@/features/auth/services/order.service';
import PaymentButtonMidtrans from '../components/payment-button';
import { formatRupiah } from '@/lib/rupiah';
import SellerFooter from '../components/footer';
import { useSellerStore } from '@/hooks/store';
import LoadingButtonLottie from '@/components/icons/loading-button';
import Cookies from 'js-cookie';

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface ShippingDetails {
  courier_name: string;
  courier_service_name: string;
  price: number;
  duration: string;
}

interface PendingOrder {
  orderData: any; // Consider defining a more specific type
  totalAmount: number;
  products: OrderItem[];
  shippingDetails: ShippingDetails;
  subtotal: number;
}

const STORAGE_KEYS = {
  getSnapKey: (orderId: string) => `snap-${orderId}`,
  getOrderTimeKey: (orderId: string) => `orderTime-${orderId}`,
  getPendingOrderKey: (orderId: string) => `pendingOrder-${orderId}`,
} as const;

const PAYMENT_DEADLINE_HOURS = 24;

const SellerBillingPage = () => {
  const { store } = useSellerStore();
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [onSnap, setOnSnap] = useState(false);
  const [snapToken, setSnapToken] = useState("");
  const [orderDetails, setOrderDetails] = useState<PendingOrder | null>(null);
  const [statusPayment, setStatusPayment] = useState("");
  const [countdown, setCountdown] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    console.log("statusPayment:", statusPayment);
    if (statusPayment === 'success') {
      localStorage.removeItem(`snap-${orderId}`);
      setIsSuccess(true);
    };
  }, [statusPayment]);

  const startCountdown = useCallback((orderTime: Date) => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLeft = PAYMENT_DEADLINE_HOURS * 60 * 60 * 1000 - (now.getTime() - orderTime.getTime());

      if (timeLeft <= 0) {
        clearInterval(interval);
        setCountdown("Waktu pembayaran habis!");
        if (orderId) {
          localStorage.removeItem(STORAGE_KEYS.getSnapKey(orderId));
          setSnapToken("");
        }
      } else {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setCountdown(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [orderId]);

  useEffect(() => {
    if (statusPayment === "close") {
      setLoading(false);
      setStatusPayment("");
    }
  }, [statusPayment]);

  useEffect(() => {
    if (!orderId) return;

    const snapTokenData = localStorage.getItem(STORAGE_KEYS.getSnapKey(orderId));
    if (snapTokenData) {
      setSnapToken(snapTokenData);
    }

    const orderTime = localStorage.getItem(STORAGE_KEYS.getOrderTimeKey(orderId));
    if (orderTime) {
      startCountdown(new Date(orderTime));
    }
  }, [orderId, startCountdown]);

  useEffect(() => {
    if (!orderId || !store?.name) return;

    const pendingOrder = localStorage.getItem(STORAGE_KEYS.getPendingOrderKey(orderId));
    if (pendingOrder) {
      setOrderDetails(JSON.parse(pendingOrder));
    } else {
      navigate(`/${store.name}`);
    }
  }, [orderId, store?.name, navigate]);

  const handlePayment = async () => {
    const tokenBuyer = Cookies.get(`token-buyer-${store?.name}`);
    if (tokenBuyer) {
      localStorage.setItem(`token-buyer-${store?.name}`, tokenBuyer);
    }

    if (!orderDetails || !orderId) return;

    setLoading(true);
    try {
      const res = await createOrder(orderDetails.orderData);

      if (res.status === 201) {
        const newSnapToken = res.data.data.snap_token;
        localStorage.setItem(STORAGE_KEYS.getSnapKey(orderId), newSnapToken);

        // Pastikan token disimpan sebelum mengaktifkan popup
        setSnapToken(newSnapToken);

        // Simpan waktu order untuk countdown jika belum ada
        if (!localStorage.getItem(STORAGE_KEYS.getOrderTimeKey(orderId))) {
          localStorage.setItem(STORAGE_KEYS.getOrderTimeKey(orderId), new Date().toISOString());
        }

        // Delay aktivasi popup untuk memastikan state terupdate
        setTimeout(() => {
          setOnSnap(true);
        }, 300);

        localStorage.removeItem('pendingOrder');
      }
    } catch (error) {
      console.error('Payment creation failed:', error);
      // Tambahkan feedback error ke user di sini
    } finally {
      setLoading(false);
    }
  };

  const handleSnapPopupChange = useCallback((isOpen: boolean) => {
    setOnSnap(isOpen);
  }, []);

  if (!orderDetails) {
    return null;
  }

  return (
    <Box w="full" minH="100vh" className="font-poppins">
      <Button
        onClick={() => navigate(-1)}
        position="absolute"
        top="10"
        left="10"
        bg="none"
        border="none"
        color="#1D1D1D"
      >
        <ArrowLeft />
      </Button>

      <HStack justifyContent="center" w="full" maxW="6xl" mx="auto" py="32">
        <Box w="full" maxW="xl">
          <Heading size="2xl" fontWeight="bold" mb="5" className="font-poppins">
            Pembayaran
          </Heading>

          <Table.Root size="lg" mb="5">
            <Table.Body>
              <Table.Row>
                <Table.Cell px="0" colSpan={2}>
                  <Text fontWeight="semibold" mb="2">Detail Produk</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell px="0">Subtotal Produk</Table.Cell>
                <Table.Cell px="0" textAlign="end">
                  {formatRupiah(orderDetails.subtotal)}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell px="0" colSpan={2}>
                  <Text fontWeight="semibold" mt="4" mb="2">Detail Pengiriman</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell px="0">
                  <Text>
                    {orderDetails.shippingDetails.courier_name} - {orderDetails.shippingDetails.courier_service_name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Estimasi: {orderDetails.shippingDetails.duration.replace('days', 'hari')}
                  </Text>
                </Table.Cell>
                <Table.Cell px="0" textAlign="end">
                  {formatRupiah(orderDetails.shippingDetails.price)}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell px="0" pt="6">
                  <Text fontWeight="semibold">Total Pembayaran</Text>
                </Table.Cell>
                <Table.Cell px="0" pt="6" textAlign="end">
                  <Text fontWeight="semibold">{formatRupiah(orderDetails.totalAmount)}</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell px="0">Bayar Sebelum</Table.Cell>
                <Table.Cell px="0" textAlign="end">
                  {countdown}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>

          <HStack>
            <Button
              flex={1}
              onClick={() => navigate(`/${store?.name}`)}
              variant="outline"
              borderWidth={1}
              borderColor="gray.600"
            >
              Lanjut Belanja
            </Button>

            {isSuccess ? (
              <Button flex={1}>Halaman Pesanan</Button>
            ) : snapToken ? (
              <Box flex={1} display="flex">
                {loading ? (
                  <Button flex={1}>
                    <LoadingButtonLottie />
                  </Button>
                ) : (
                  <PaymentButtonMidtrans
                    onPopup={onSnap}
                    snapToken={snapToken}
                    status={setStatusPayment}
                    onPopupChange={handleSnapPopupChange}
                  />
                )}
              </Box>
            ) : (
              <Button
                flex={1}
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? <LoadingButtonLottie /> : 'Bayar Sekarang'}
              </Button>
            )}
            {/* {snapToken ? (
              <Box flex={1} display="flex">
                {loading ? (
                  <Button flex={1}>
                    <LoadingButtonLottie />
                  </Button>
                ) : (
                  <PaymentButtonMidtrans
                    onPopup={onSnap}
                    snapToken={snapToken}
                    status={setStatusPayment}
                    onPopupChange={handleSnapPopupChange}
                  />
                )}
              </Box>
            ) : (
              <Button
                flex={1}
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? <LoadingButtonLottie /> : 'Bayar Sekarang'}
              </Button>
            )} */}

          </HStack>
        </Box>
      </HStack>
      <SellerFooter />
    </Box>
  );
};

export default SellerBillingPage;