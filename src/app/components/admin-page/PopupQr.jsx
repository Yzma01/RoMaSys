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
import ButtonContinue from "../utils/Button";
import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";

export default function PopupQr({ sidebarOpen }) {
  const [qrSrc, setQrSrc] = useState("");
  const [isAuthenticate, setisAuthenticate] = useState(false);

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
          <Button
            variant="outline"
            className="w-full bg-transparent text-white border-none hover:bg-adminBackground hover:text-white">
            <div className="px-[8px] py-[16px]">
              <QrCodeScannerRoundedIcon className={`${isAuthenticate?"":"text-red-0"}`}/>
            </div>
            {sidebarOpen && <span className={`${isAuthenticate?"":"text-red-0"}`}> Mostrar QR</span>}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-blueDark">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Escanea este codigo QR para vincular tu WhatsApp
            </AlertDialogTitle>
            <AlertDialogDescription>
              <img
                src={qrSrc}
                alt="logo"
                className="w-full h-auto object-contain mt-4 rounded-md shadow"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={""}>
            <AlertDialogAction className>
              <ButtonContinue color={"green"} text={"Continuar"} />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
