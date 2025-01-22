import { Box, Text } from "@chakra-ui/react"
import { PiggyBank } from "lucide-react"

const Navbar = () => {
    return(
        <Box h={'10vh'} border={'1px solid'} borderColor={'#E6E6E6'} position={'fixed'} width={'100%'} backgroundColor={'white'} zIndex={99} paddingX={9} py={3} display={"flex"} alignItems={"center"}>
              <PiggyBank size={'34px'}/> 
              <Text fontWeight={"bold"} ml={3}>
                L4k0e
              </Text>
        </Box>
    )
}

export default Navbar