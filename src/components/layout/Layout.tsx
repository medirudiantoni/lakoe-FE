import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router"


const Layout = () => {
    return(
        <Box>
            <Outlet/>
        </Box>
    )
}

export default Layout