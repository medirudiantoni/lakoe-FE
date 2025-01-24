import LogoIcon from "@/components/icons/logo";
import { Field } from "@/components/ui/field";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export function Register(){
    return(
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} width={'100vw'} height={'100vh'} position={'relative'}>
            <LogoIcon />
            <Link to={'/login'}>
            <Text position={'absolute'} top={25} right={30} color={'blue.600'} fontWeight={'semibold'}>Masuk</Text>
            </Link>
   
            <Box width={'25%'} mt={5}>
                <Text py={'5'} textAlign={'center'} fontSize={'28px'} fontWeight={'semibold'}>
                    Register
                </Text>
                <Field label="Nama" required>
                <Input placeholder="Nama lengkap" />
                </Field>
                <Field label="Email" required mt={2}>
                <Input placeholder="Masukan email" />
                </Field>
                <Field label="Password" mt={2} required>
                <Input placeholder="Masukan password" />
                </Field>
                {/* <Field label="Konfirmasi Password" mt={2} required>
                <Input placeholder="Masukan password kembali" />
                </Field> */}
                <Text textAlign={'right'} mt={2} color={'blue.400'}>Lupa password?</Text>
                <Link to={"/login"}>
                <Button colorPalette={'blue'} width={'full'} borderRadius={'7px'} mt={3}>Daftar</Button>
                 </Link>
               
                <Text textAlign={'center'} mt={'2'}>Dengan menekan tombol Daftar maka kamu setuju dengan <span className="text-blue-400"> Syarat & Ketentuan </span> dan <span className="text-blue-400"> Kebijakan Privasi </span></Text>
            </Box>
        </Box>
    )
}