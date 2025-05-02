import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Puedes agregar eventos aquí si es necesario
    },
    baseUrl: "https://ro-ma-sys.vercel.app/", // Cambia esto según tu proyecto
    supportFile: false,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
