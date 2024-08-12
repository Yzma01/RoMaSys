import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <SignIn
        appearance={{
          elements: {
            rootBox: "bg-background",
            cardBox: "bg-red-900",
            card: "flex flex-col gap-2 pl-8 pr-8 pb-4 bg-bgGray rounded-2xl transition-transform duration-400 ease-in-out hover:scale-105 hover:border-black hover:border", // Estilos principales de la tarjeta


            // Ocultar elementos específicos
            headerSubtitle: "hidden",
            footer: "hidden",
            poweredBy: "hidden",
            buttonArrowIcon: "hidden",

            form: "flex gap-0",

            formHeaderTitle: "text-white text-center text-lg my-8", // Título del encabezado

            formFieldWrapper: "flex items-center justify-center gap-2 rounded-2xl p-2.5 bg-gray-900 shadow-inner", // Contenedor de campos del formulario

            formFieldInput: "bg-transparent border-none outline-none w-full text-gray-300", // Campo de entrada

            formFieldLabel: "hidden", // Etiquetas ocultas, ya que no están en el CSS original

            formButtonPrimary:
              "flex justify-center mt-7 bg-gray-800 text-white p-2 rounded-lg transition duration-400 ease-in-out hover:bg-black hover:text-white", // Botón primario

            formButtonSecondary:
              "flex justify-center mt-4 bg-gray-800 text-white p-2 rounded-lg transition duration-400 ease-in-out hover:bg-black hover:text-white", // Botón secundario

            formButtonLink:
              "flex justify-center mb-12 bg-gray-800 text-white p-2 rounded-lg transition duration-400 ease-in-out hover:bg-red-500 hover:text-white", // Botón adicional con estilo similar
          },
        }}
        signInOptions={{
          title: "Inicio de Sesion", // Título personalizado
        }}
      />
    </div>
  );
}
