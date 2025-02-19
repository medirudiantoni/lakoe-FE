import { DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react";
import { PropsWithChildren, useEffect, useRef } from "react";

interface Props extends PropsWithChildren {
    onPopup: boolean;
}

export default function SnapPaymentComponent({ children, onPopup }: Props) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (onPopup && buttonRef.current) {
            buttonRef.current.click();
        }
    }, [onPopup]);
    return (
        <DialogRoot size="sm" scrollBehavior="outside">
            <DialogTrigger asChild>
                <Button ref={buttonRef} variant="outline">Outside Scroll</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>With Outside Scroll</DialogTitle>
                </DialogHeader>
                <DialogCloseTrigger />
                <DialogBody>
                    {children}
                    {/* <div id="snap-container"></div> */}
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}