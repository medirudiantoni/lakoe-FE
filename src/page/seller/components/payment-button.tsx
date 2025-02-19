import LoadingButtonLottie from "@/components/icons/loading-button";
import { Button } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        snap: any;
    }
}

interface PaymentButtonProps {
    snapToken: string;
    onPopup: boolean;
    status: (status: string) => void;
    onPopupChange: (isOpen: boolean) => void;
}

const PaymentButtonMidtrans: React.FC<PaymentButtonProps> = ({
    snapToken,
    onPopup = false,
    status,
    onPopupChange
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const hasOpened = useRef(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const existingScript = document.querySelector("#midtrans-script");
        if (existingScript) {
            setScriptLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "SB-Mid-client-PmlOUvnjXy23KtWr");
        script.id = "midtrans-script";
        script.async = true;
        
        script.onload = () => {
            console.log("Midtrans script loaded successfully");
            setScriptLoaded(true);
        };
        
        script.onerror = () => {
            console.error("Failed to load Midtrans script");
        };
        
        document.body.appendChild(script);
        
        return () => {
            // Clean up logic if needed
        };
    }, []);

    useEffect(() => {
        if (onPopup && snapToken && scriptLoaded && !hasOpened.current) {
            console.log("Preparing to open Midtrans popup");
            // Small delay to ensure everything's ready
            const timer = setTimeout(() => {
                console.log("Triggering payment popup");
                if (window.snap) {
                    initPayment();
                    hasOpened.current = true;
                } else {
                    console.warn("Snap object not available yet, retrying...");
                    // If window.snap is still not available, try a direct click as fallback
                    buttonRef.current?.click();
                }
            }, 800);
            
            return () => clearTimeout(timer);
        }
    }, [onPopup, snapToken, scriptLoaded]);

    const initPayment = useCallback(() => {
        if (!snapToken || !window.snap) {
            console.error("Cannot initialize payment - missing token or snap not loaded");
            return false;
        }
        
        try {
            window.snap.pay(snapToken, {
                onSuccess: (result: any) => {
                    console.log("Pembayaran sukses:", result);
                    status("success");
                    onPopupChange(false);
                    hasOpened.current = false;
                },
                onPending: (result: any) => {
                    console.log("Pembayaran tertunda:", result);
                    status("pending");
                    onPopupChange(false);
                    hasOpened.current = false;
                },
                onError: (error: any) => {
                    console.error("Pembayaran gagal:", error);
                    status("error");
                    onPopupChange(false);
                    hasOpened.current = false;
                },
                onClose: () => {
                    console.log("Popup ditutup tanpa menyelesaikan pembayaran");
                    status("close");
                    onPopupChange(false);
                    hasOpened.current = false;
                },
            });
            return true;
        } catch (error) {
            console.error("Error initializing Midtrans payment:", error);
            return false;
        }
    }, [snapToken, status, onPopupChange]);

    
    const handlePayment = () => {
        console.log("Payment button clicked manually");
        if (scriptLoaded) {
            const result = initPayment();
            if (!result) {
                console.error("Failed to initialize payment");
                // Provide user feedback here if needed
            }
        } else {
            console.error("Midtrans script not yet loaded");
            // Consider showing a loading indicator or message to the user
        }
    };

    return <Button 
    flex={1} 
    onClick={handlePayment} 
    ref={buttonRef}
    disabled={!scriptLoaded || !snapToken}
    >
        {scriptLoaded ? 'Bayar Sekarang' : <LoadingButtonLottie />}
    </Button>;
};

export default PaymentButtonMidtrans;