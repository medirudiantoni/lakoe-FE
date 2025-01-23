
import { Checkbox } from "@/components/ui/checkbox"
import { Box, Text } from "@chakra-ui/react"
import { useState } from "react"

interface Display  {
  display: string
}
const CheckBox: React.FC<Display> = ({ display })=> {
  const [checked, setChecked] = useState(false)
  return (
    <div>
      <Box display={'flex'}>

 
    <Text fontWeight={"normal"} mr={2} display={display} >Pilih Semua</Text>
    <Checkbox
      checked={checked}
      onCheckedChange={(e) => setChecked(!!e.checked)}
      cursor={'pointer'}
      fontWeight={'normal'}
      variant={"solid"} colorPalette={'blue'}
    >
    </Checkbox>
    </Box>
    </div>
  )
}

export default CheckBox