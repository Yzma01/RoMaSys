import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../ui/alert-dialog";
  import { Button } from "../ui/button";
  import { useState, useEffect } from "react";
  
  export default function PopupQr() {
    const [qrSrc, setQrSrc] = useState("");
  
    useEffect(() => {
      const timestamp = new Date().getTime();
      setQrSrc(`/qrIMG/qr.png?t=${timestamp}`);
  
      const interval = setInterval(() => {
        const newTimestamp = new Date().getTime();
        setQrSrc(`/qrIMG/qr.png?t=${newTimestamp}`);
      }, 5000); 
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Show Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                <img src={qrSrc} alt="logo" />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
  