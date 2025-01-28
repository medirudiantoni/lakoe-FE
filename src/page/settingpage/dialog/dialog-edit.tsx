import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react";
import { Edit } from "lucide-react";
import { useState } from "react";

export function DialogEdit(){
    const [open, setOpen] = useState(false);
    return(
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
        <Edit color="#75757C" size={'16px'}/>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Edit Lokasi</DialogTitle>
            </DialogHeader>
            <DialogBody>
   
            </DialogBody>
            <DialogFooter>
            <DialogActionTrigger asChild>
                <Button variant="outline">Batalkan</Button>
            </DialogActionTrigger>
            <Button>Perbarui</Button>
            </DialogFooter>
            <DialogCloseTrigger />
        </DialogContent>
        </DialogRoot>
    )
}