import React from 'react'
import { motion } from 'framer-motion'
import { Box, Center, VStack } from '@chakra-ui/react'
import { Check } from 'lucide-react'
import LottieSpread from '@/components/icons/lottie-spread'
import { Button } from '@/components/ui/button'

interface Props {
    onClick?: () => void;
}

const SuccessAnimation: React.FC<Props> = ({ onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0 }}
            className="fixed z-50 overflow-hidden top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 50 }}
                transition={{ duration: 0.5 }}
                className="w-10 relative aspect-square rounded-full flex items-center justify-center bg-white"
            >
            </motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 50 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="w-10 absolute z-10 aspect-square rounded-full flex items-center justify-center bg-blue-600"
            >
            </motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 50 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-10 absolute z-20 aspect-square rounded-full flex items-center justify-center bg-blue-400"
            >
            </motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 50 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="w-10 absolute z-30 aspect-square rounded-full flex items-center justify-center bg-blue-200"
            >
            </motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 50 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-10 absolute z-30 aspect-square rounded-full flex items-center justify-center bg-white"
            >
            </motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "backOut" }}
                className="w-20 absolute z-30 aspect-square rounded-full flex items-center justify-center bg-white"
            >
                <VStack position="relative">
                    <motion.div
                        initial={{ translateY: 0 }}
                        animate={{ translateY: -10 }}
                        transition={{ duration: 0.25, delay: 2, ease: "easeOut" }}
                        className="relative flex items-center justify-center">
                        <Center w="80px" h="80px" borderRadius="1000px" bg="#2563eb" position="relative" className="z-40">
                            <Check color="#fff" size={"50px"} strokeWidth="4px" className="translate-y-0.5" />
                        </Center>
                        <Box position="absolute" className="z-30">
                            <LottieSpread />
                        </Box>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, translateY: 50 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.25, delay: 2, ease: "easeOut" }}
                        className="text-center flex flex-col items-center"
                    >
                        <p>Pembayaran Sukses</p>
                        <Button onClick={onClick} my={2}>Lanjutkan</Button>
                    </motion.div>
                </VStack>
            </motion.div>
        </motion.div>
    )
}

export default SuccessAnimation