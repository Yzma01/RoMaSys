import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Puedes agregar eventos aquí si es necesario
    },
    baseUrl: "http://localhost:3000", // Cambia esto según tu proyecto
    supportFile: false
  }
});
