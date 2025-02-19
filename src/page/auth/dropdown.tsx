import { useEffect, useState } from "react";
import { Box, Button, List, ListItem, Text } from "@chakra-ui/react";
import axios from "axios";
import { apiURL } from "@/utils/baseurl";

type Bank = {
  id: string;
  name: string;
};
const BankDropdown = ({ onSelect }: { onSelect: (bank: Bank) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [banks, setBanks] = useState<Bank[]>([]);
  
    useEffect(() => {
      const fetchBanks = async () => {
        try {
          const response = await axios.get(`${apiURL}bank`);
          console.log("API Response:", response.data);
  
          // Cek apakah response data adalah array
          if (Array.isArray(response.data)) {
            setBanks(response.data);
          } else if (Array.isArray(response.data.data)) {
            setBanks(response.data.data); // Jika data ada di dalam property "data"
          } else {
            console.error("Expected an array but got:", response.data);
            setBanks([]); // Set default array kosong
          }
        } catch (error) {
          console.error("Error fetching banks:", error);
          setBanks([]); // Set default array kosong saat error
        }
      };
  
      fetchBanks();
    }, []);
  
    const handleSelect = (bank: Bank) => {
      setSelectedBank(bank);
      onSelect(bank);
      setIsOpen(false);
    };
  
    return (
      <Box position="relative" w="full">
     <Box 
        outline={'none'} 
        border={'1px solid'}
        borderColor={'gray.200'}
        py={3}
        px={4}
        borderRadius={'7px'}
        w="full" 
        cursor={"pointer"}
        textAlign="left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedBank ? selectedBank.name : "Pilih Bank"}
      </Box>
        {isOpen && (
          <Box
            position="absolute"
            w="full"
            bg="white"
            boxShadow="md"
            borderRadius="md"
            zIndex={10}
            mt={2}
          >
            <Box p={2}>
              {banks?.length > 0 ? (
                banks.map((bank) => (
                  <Box
                    key={bank.id}
                    p={2}
                    borderRadius="md"
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                    onClick={() => handleSelect(bank)}
                  >
                    <Text>{bank.name}</Text>
                  </Box>
                ))
              ) : (
                <Text px={2} py={3} textAlign="center">
                  Tidak ada data bank
                </Text>
              )}
            </Box>
          </Box>
        )}
      </Box>
    );
  };
  

export default BankDropdown;
