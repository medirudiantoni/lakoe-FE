import LogoIcon from "@/components/icons/logo";
import { Field } from "@/components/ui/field";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export function Login(){
    return(
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} width={'100vw'} height={'100vh'} >
            <LogoIcon />
            <Box width={'25%'} mt={5}>
                <Text py={'5'} textAlign={'center'} fontSize={'28px'} fontWeight={'semibold'}>
                    Login
                </Text>
                <Field label="Email" required>
                <Input placeholder="Masukan email" />
                </Field>
                <Field label="Password" mt={5} required>
                <Input placeholder="Masukan password" />
                </Field>
                <Text textAlign={'right'} mt={2} color={'blue.400'}>Lupa password?</Text>
                <Link to={"/"}>
                <Button colorPalette={'blue'} width={'full'} borderRadius={'7px'} mt={3}>Masuk</Button>
                 </Link>
               
                <Text textAlign={'center'}>Belum punya akun? silakan <Link to={'/register'} className="text-blue-400">daftar di sini</Link></Text>
            </Box>
        </Box>
    )
}