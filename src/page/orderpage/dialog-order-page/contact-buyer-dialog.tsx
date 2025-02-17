import React from 'react';
import {
  
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTrigger,
  } from '@/components/ui/dialog';
  import { Textarea, Button, } from '@chakra-ui/react';


  interface ContactBuyerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ContactBuyerDialog: React.FC<ContactBuyerDialogProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message); 
    alert('Pesan disalin ke clipboard!');
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>Hubungi Pembeli</DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <Textarea value={message} readOnly />
        </DialogBody>
        <DialogFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCopy}>
            Salin Pesan
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ContactBuyerDialog;
