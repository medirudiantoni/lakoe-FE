import { Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuccessAnimation from "../components/success-animation";
import { useNavigate } from "react-router";
import { useSellerStore } from "@/hooks/store";
import LoadingCheckingPayment from "@/components/icons/loading-checking-payment";

export default function PaymentCheckingPage(){
    const { store } = useSellerStore();
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if(searchParams){
            const status = searchParams.get('status');
            if(status === 'success'){
                setTimeout(() => {
                    setIsSuccess(true)
                }, 4000);
            }
        }
    });
    return (
        <Center w="full" h="100vh">
            {isSuccess === null ? (
                <Box>
                    <LoadingCheckingPayment />
                </Box>
            ) : (
                <SuccessAnimation onClick={() => navigate(`/${store?.name}`)}  />
            )}
        </Center>
    )
}