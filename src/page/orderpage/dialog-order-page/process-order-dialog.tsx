import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';

type ProcessOrderDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
};

export function ProcessOrderDialog({ isOpen, onClose, onConfirm, isProcessing }: ProcessOrderDialogProps) {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      p={5}
      zIndex="modal"
    >
      <Text mb={4}>Apakah Anda yakin ingin memproses pesanan ini?</Text>
      <Flex justifyContent="flex-end">
        <Button onClick={onClose} mr={3}>
          Batal
        </Button>
        <Button colorPalette="blue" onClick={onConfirm} disabled={isProcessing}>
          {isProcessing ? <Spinner size="sm" /> : "Proses"}
        </Button>
      </Flex>
    </Box>
  );
}
