import { Box, HStack } from "@chakra-ui/react"
import LeftSide from "./leftSide"

const Layout = () => {
    return (
        <>
            <LeftSide />
            <HStack w="100vw" minH="100vh" gap={0}>
                <Box w="400px" h="100vh"></Box>
                <Box position="fixed"></Box> // tes aja
                <Box position="fixed"></Box> // tes aja
                <Box flex={1} w="100%" h="100vh" borderLeftWidth={1} borderColor="teal.400"></Box>
            </HStack>
            {/* <Box w="100vw" minH="100vh" display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={0}>
                <GridItem colSpan={1} h="100%" backgroundColor="teal.100" />
                <GridItem colSpan={3} h="100%" backgroundColor="teal.300" />
            </Box> */}
        </>
    )
}

export default Layout