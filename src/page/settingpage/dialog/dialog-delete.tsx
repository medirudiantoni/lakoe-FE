import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react";
import { Trash } from "lucide-react";
import { useState } from "react";

export function DialogDelete(){
      const [open, setOpen] = useState(false);
    return(
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
        <Trash color="#75757C" size={'16px'}/>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Delete Lokasi</DialogTitle>
            </DialogHeader>
            <DialogBody>
   
            </DialogBody>
            <DialogFooter>
            <DialogActionTrigger asChild>
                <Button variant="outline">Batalkan</Button>
            </DialogActionTrigger>
            <Button>Hapus</Button>
            </DialogFooter>
            <DialogCloseTrigger />
        </DialogContent>
        </DialogRoot>
    )
}