import Navbar from "@/components/navbar/Navbar"
import { Box, Grid, GridItem } from "@chakra-ui/react"
import SideBar from "../sidebar/SideLeftBar"
import ComponentProduct from "../productpage/ComponentProduct"


const Dashboard = () => {
    return(
        <Box>
        <Navbar/>
        <Grid templateColumns="2fr 7fr" gap={3} width={'100%'}  pt={'60px'}>
          <GridItem width={'100%'}>
            <Box h="100vh" width={'23%'} borderRight={'1.5px solid'} borderColor={'gray.200'} position={'fixed'}>
                <SideBar/>
            </Box>
          </GridItem>
          <GridItem backgroundColor={'#F8F8F8'}>
            <Box h="100vh">
              <ComponentProduct/>
            </Box>
          </GridItem>
        </Grid>
                
    </Box>
    )
}

export default Dashboard