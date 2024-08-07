import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        appearance={{
          elements: {
            // Card customization
            card: "bg-gray-900 p-6 rounded-lg shadow-lg",

            // Hide specific elements
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            footer: "hidden",
            poweredBy: "hidden",

            // Form field customization
            formFieldInput: "rounded-lg bg-gray-800 text-white p-2",
            formFieldLabel: "text-white mb-1",
            formFieldErrorText: "text-red-500 mt-1",

            // Button customization
            formButtonPrimary: "bg-gray-700 text-white p-2 rounded-lg mt-4",
            formButtonSecondary: "bg-gray-700 text-white p-2 rounded-lg mt-2",

            // Header title customization
            formHeaderTitle: "text-white text-2xl mb-4",
          },
        }}
      />
    </div>
  );
}
