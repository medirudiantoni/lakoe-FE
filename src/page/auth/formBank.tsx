// import { useState } from "react";
// import { Box, Button, Input, Text } from "@chakra-ui/react";
// import axios from "axios";
// import { apiURL } from "@/utils/baseurl";
// import BankDropdown from "./dropdown";

// type Bank = {
//   id: string;
//   name: string;
// };

// const BankForm = () => {
//   const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
//   const [accountNumber, setAccountNumber] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     if (!selectedBank || !accountNumber) {
//       setError("Harap pilih bank dan isi nomor rekening.");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(`${apiURL}bank-acco`, {
//         bankId: selectedBank.id,
//         accNumber: accountNumber,
//       });

//       console.log("Response:", response.data);
//       alert("Rekening berhasil ditambahkan!");

//       // Hanya reset nomor rekening, bank tetap terpilih
//       setAccountNumber("");
//     } catch (error) {
//       console.error("Error submitting bank account:", error);
//       setError("Gagal menyimpan rekening, coba lagi.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Box maxW="400px" mx="auto" p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
//       <Text fontSize="lg" fontWeight="bold" mb={2}>
//         Tambah Rekening Bank
//       </Text>

//       <BankDropdown onSelect={(bank) => setSelectedBank(bank)} />
//       {selectedBank && <p>Bank yang dipilih: {selectedBank?.name}</p>}

//       <Input
//         mt={3}
//         placeholder="Masukkan Nomor Rekening"
//         value={accountNumber}
//         onChange={(e) => setAccountNumber(e.target.value)}
//       />

//       {error && (
//         <Text color="red.500" fontSize="sm" mt={2}>
//           {error}
//         </Text>
//       )}

//       <Button mt={4} colorScheme="blue" w="full" onClick={handleSubmit} >
//         Simpan Rekening
//       </Button>
//     </Box>
//   );
// };

// export default BankForm;
