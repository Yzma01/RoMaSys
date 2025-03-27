describe('Add Client Form', () => {
    beforeEach(() => {
      cy.visit('https://ro-ma-sys.vercel.app/admin/addClient'); // Asegúrate de que la ruta es correcta
    });
      
      
        it("should not allow invalid email format", () => {
          // Esperar que el formulario se renderice correctamente
          cy.get("form").should("exist");
      
          // Buscar el label "Correo Electrónico" y encontrar el input dentro de su contenedor
          cy.contains("Correo Electrónico")
            .parent()
            .find("input")
            .should("exist")
            .type("correo-invalido");
      
          // Enviar el formulario
          cy.get("form").submit();
      
          // Verificar mensaje de error
          cy.contains("Correo electrónico no es válido").should("be.visible");
        });
      });
      