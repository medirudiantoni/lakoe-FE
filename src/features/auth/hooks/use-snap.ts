import { midtransApiUrl, midtransClientKey } from "@/utils/midtrans";
import { useEffect, useState } from "react";

declare global {
    interface Window {
      snap: any;
    }
}
  

export default function useSnap(){
    const [snap, setSnap] = useState<any>(null)
    useEffect(() => {
        const myMidtransClientKey = midtransClientKey;
        let script = document.createElement('script');
        // script.src = `${midtransApiUrl}/snap/snap.js`;
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        // script.setAttribute('data-client-key', myMidtransClientKey);
        script.setAttribute('data-client-key', "SB-Mid-client-PmlOUvnjXy23KtWr");
        // script.onload = () => {
        //     setSnap(window.snap)
        // }
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);

    const snapEmbed = (snap_token: any, embedId: any, action: any) => {
        if(snap){
            snap.embed(snap_token, {
                embedId,
                onSuccess: function (result: any) {
                    console.log("--- success ---", result);
                    action.onSuccess(result)
                },
                onPending: function (result: any) {
                    console.log("--- pending ---", result);
                    action.onPending(result)
                },
                onClose: function (result: any) {
                    console.log("--- close ---", result);
                    action.onClose()
                },
            })
        }
    }

    return {snapEmbed}
}