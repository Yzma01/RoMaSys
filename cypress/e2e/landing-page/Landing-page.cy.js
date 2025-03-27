describe('Prueba de carga de la página', () => {
    it('Verifica que la página cargue correctamente', () => {
      cy.visit('https://ro-ma-sys.vercel.app/');
  
      cy.contains('Niger Fitness');
  
    });
  });
  