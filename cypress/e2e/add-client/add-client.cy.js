describe('Add Client Form', () => {
    beforeEach(() => {
      cy.visit('https://ro-ma-sys.vercel.app/admin/addClient'); // Asegúrate de que la ruta es correcta
    });
      
        it('should render all input fields correctly', () => {
          // Verificar que todos los campos de entrada estén presentes
          cy.contains('Datos del Cliente').should('be.visible');
          cy.get('input[placeholder="Cédula"]').should('exist');
          cy.get('input[placeholder="Nombre"]').should('exist');
          cy.get('input[placeholder="Primer Apellido"]').should('exist');
          cy.get('input[placeholder="Segundo Apellido"]').should('exist');
          cy.get('input[placeholder="Teléfono"]').should('exist');
          cy.get('input[placeholder="Correo Electrónico"]').should('exist');
        });
      
        it('should allow entering values in all input fields', () => {
          // Verificar que se puedan ingresar valores en los campos de texto
          cy.get('input[placeholder="Cédula"]').type('1234567890');
          cy.get('input[placeholder="Nombre"]').type('Juan');
          cy.get('input[placeholder="Primer Apellido"]').type('Pérez');
          cy.get('input[placeholder="Segundo Apellido"]').type('González');
          cy.get('input[placeholder="Teléfono"]').type('123456789');
          cy.get('input[placeholder="Correo Electrónico"]').type('juan.perez@example.com');
          
          // Asegurarse de que los valores se hayan ingresado correctamente
          cy.get('input[placeholder="Cédula"]').should('have.value', '1234567890');
          cy.get('input[placeholder="Nombre"]').should('have.value', 'Juan');
          cy.get('input[placeholder="Primer Apellido"]').should('have.value', 'Pérez');
          cy.get('input[placeholder="Segundo Apellido"]').should('have.value', 'González');
          cy.get('input[placeholder="Teléfono"]').should('have.value', '123456789');
          cy.get('input[placeholder="Correo Electrónico"]').should('have.value', 'juan.perez@example.com');
        });
      
        it('should validate email format', () => {
          // Ingresar un correo electrónico inválido
          cy.get('input[placeholder="Correo Electrónico"]').type('correo-invalido');
          cy.get('form').submit();
          
          // Verificar que se muestra el mensaje de error
          cy.contains('Correo electrónico no es válido').should('be.visible');
        });
      
        it('should only allow valid phone numbers', () => {
          // Ingresar un número de teléfono inválido
          cy.get('input[placeholder="Teléfono"]').type('123abc');
          cy.get('form').submit();
          
          // Verificar que se muestra el mensaje de error
          cy.contains('Número de teléfono no válido').should('be.visible');
        });
      
        it('should display the monthly amount field when not in modify mode', () => {
          // Verificar que el campo de monto está presente cuando no se está en modo de modificación
          cy.get('input[placeholder="Monto"]').should('exist');
        });
      
        it('should toggle the routine checkbox correctly', () => {
          // Verificar el estado de la casilla de rutina
          cy.get('input[type="checkbox"]').should('not.be.checked');
          cy.get('input[type="checkbox"]').check();
          cy.get('input[type="checkbox"]').should('be.checked');
        });
      
        it('should submit the form when all fields are correctly filled', () => {
          // Completar el formulario con datos válidos
          cy.get('input[placeholder="Cédula"]').type('1234567890');
          cy.get('input[placeholder="Nombre"]').type('Juan');
          cy.get('input[placeholder="Primer Apellido"]').type('Pérez');
          cy.get('input[placeholder="Segundo Apellido"]').type('González');
          cy.get('input[placeholder="Teléfono"]').type('123456789');
          cy.get('input[placeholder="Correo Electrónico"]').type('juan.perez@example.com');
          
          // Hacer submit al formulario
          cy.get('form').submit();
          
          // Verificar si el formulario se envió correctamente (puedes modificar esto dependiendo de tu flujo)
          cy.contains('Formulario enviado').should('be.visible');
        });
      });
      