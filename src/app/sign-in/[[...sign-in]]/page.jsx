import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <SignIn
        appearance={{
          elements: {
            // Hide Specific elements
            headerSubtitle: "hidden",
            footer: "hidden",
            poweredBy: "hidden",
            buttonArrowIcon: "hidden",

            //!This element is for sign-in with another method
            footerActionLink: "hidden",

            rootBox: "bg-background",
            cardBox: "bg-red-900",
            card: "flex flex-col gap-2 pl-8 pr-8 pb-4 bg-bgGray rounded-2xl transition-transform duration-400 ease-in-out hover:scale-105 hover:border-black hover:border", // Estilos principales de la tarjeta

            form: "flex gap-0",
            headerTitle: "text-white text-center text-lg", // Título del encabezado

            formFieldInput:
              "bg-transparent border-none outline-none w-full text-gray-300", 

            formFieldLabel: "text-gray-700", 
            formFieldAction: "text-red-900",

            formButtonPrimary:
              "flex justify-center mt-7 bg-[#252525] text-white p-2 rounded-lg transition duration-400 ease-in-out hover:bg-red-900 hover:text-white w-auto",


          },
        }}
        signInOptions={{
          title: "Inicio de Sesion", // Título personalizado
        }}
      />
    </div>
  );
}
