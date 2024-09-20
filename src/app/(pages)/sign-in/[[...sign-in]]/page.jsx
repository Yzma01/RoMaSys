import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-[#222831] flex flex-col items-center h-screen">
      <div className="flex flex-grow items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            // Hide Specific elements
            headerSubtitle: "hidden",
            footer: "hidden",
            poweredBy: "hidden",
            buttonArrowIcon: "hidden",
            dividerLine: "hidden",
            //!Sign out of all other devices
            formFieldRadioLabel: "hidden",
            checkbox: "hidden",

            //!This element is for sign-in with another method
            footerActionLink: "hidden",
            dividerText: "hidden",

            rootBox: "bg-adminBackground",
            cardBox: "bg-red-900",
            card: "flex flex-col gap-2 pl-8 pr-8 pb-4 bg-gray-1 rounded-2xl transition-transform duration-400 ease-in-out hover:scale-105 hover:border-black hover:border",

            form: "flex gap-0",
            headerTitle: "text-white text-center text-lg",

            formFieldInput:
              "bg-transparent border-none outline-none w-full text-gray-300 mb-3",
            formFieldInputShowPasswordButton: "mb-3",
            formFieldLabel: "text-white",
            formFieldAction: "text-red-900 hover:text-red-900", //buton forgot password

            formFieldInputShowPasswordIcon: "text-white",

            formButtonPrimary:
              "flex justify-center mt-3 bg-[#252525] text-white p-2 rounded-lg transition duration-400 ease-in-out hover:bg-red-900 hover:text-white w-auto",

            alternativeMethodsBlockButton:
              "flex justify-center mt-2 bg-[#252525] text-white p-2 rounded-lg transition duration-400 ease-in-out hover:bg-red-900 hover:text-white w-auto",

            alternativeMethodsBlockButtonText: "text-gray-400",

            otpCodeFieldInput: "text-white",

            formResendCodeLink: "mt-5",

            main: "gap-3",
          },
        }}
      />
      </div>
      <footer className="flex items-center justify-center w-full pb-4">
        <a aria-label="Clerk logo" className=" hover:underline" href="https://clerk.com/?utm_source=clerk&utm_medium=components/" target="_blank" rel="noopener">Secured by Clerk</a>
      </footer>
    </div>
  );
}
