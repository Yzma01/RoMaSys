"use client"
import { useState, useEffect } from "react";
import { SignIn } from "@clerk/nextjs";
import Loader from "@/src/app/components/utils/Loader";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-adminBackground flex flex-col items-center h-screen justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-grow items-center justify-center">
          <SignIn
            appearance={{
              elements: {
                headerSubtitle: "hidden",
                footer: "hidden",
                poweredBy: "hidden",
                buttonArrowIcon: "hidden",
                dividerLine: "hidden",
                formFieldRadioLabel: "hidden",
                checkbox: "hidden",
                footerActionLink: "hidden",
                dividerText: "hidden",
                rootBox: "bg-[#161A23]",
                cardBox: "bg-gray-600",
                card: "flex flex-col gap-2 pl-8 pr-8 pb-4 bg-gray-1 rounded-2xl transition-transform duration-400 ease-in-out hover:scale-105 hover:border-black hover:border",
                form: "flex gap-0",
                headerTitle: "text-white text-center text-lg",
                formFieldInput: "bg-transparent border-none outline-none w-full text-gray-300 mb-3",
                formFieldInputShowPasswordButton: "mb-3",
                formFieldLabel: "text-white",
                formFieldAction: "text-red-500 hover:text-red-600",
                formFieldInputShowPasswordIcon: "text-white",
                formButtonPrimary:
                  "flex justify-center mt-3 bg-[#161A23] text-white p-2 rounded-lg transition duration-400 ease-in-out hover:bg-red-900 hover:text-white w-auto",
                alternativeMethodsBlockButton:
                  "flex justify-center mt-2 bg-[#161A23] text-white p-2 rounded-lg transition duration-400 ease-in-out hover:bg-red-900 hover:text-white w-auto",
                alternativeMethodsBlockButtonText: "text-gray-400",
                otpCodeFieldInput: "text-white",
                formResendCodeLink: "mt-5",
                main: "gap-3",
              },
            }}
          />
        </div>
      )}
      <footer className="text-white flex items-center justify-center w-full pb-4">
        <a
          aria-label="Clerk logo"
          className="hover:underline"
          href="https://clerk.com/?utm_source=clerk&utm_medium=components/"
          target="_blank"
          rel="noopener"
        >
          Secured by Clerk
        </a>
      </footer>
    </div>
  );
}
