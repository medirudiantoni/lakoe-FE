import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router"

const SellerPage = () => {
  return (
    <Box w="100vw" minH="100vh">
        <Outlet />
    </Box>
  )
}

export default SellerPage