import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "./components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Niger Gym",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          {/* <PreventZoom />  */}
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
