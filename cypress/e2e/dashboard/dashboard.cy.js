describe('Dashboard Page', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/clients', {
            statusCode: 200,
            body: [
              {
                cli_id: "12345",
                cli_name: "John",
                cli_last_name1: "Doe",
                cli_phone: "88888888",
                cli_last_name2: "Smith",
                cli_frozen: false,
                cli_next_pay_date: "2025-01-01"
              },
              {
                cli_id: "67890",
                cli_name: "Jane",
                cli_phone: "88888888",
                cli_last_name1: "Doe",
                cli_last_name2: "Brown",
                cli_frozen: true,
                cli_next_pay_date: "2024-12-01"
              }
            ]
          }).as('getClients');
      cy.visit('https://ro-ma-sys.vercel.app/admin/dashboard');
    });
  
    it('should display the dashboard title', () => {
      cy.contains('h1', 'DASHBOARD').should('be.visible');
    });
  
    it('should fetch and display clients', () => {
      cy.wait('@getClients');
      cy.get('table').should('exist');
      cy.get('tbody tr').should('have.length.greaterThan', 0);
    });
  
    it('should filter clients by name or ID', () => {
      cy.get('input[type="text"]').type('John');
      cy.get('tbody tr').each(($row) => {
        cy.wrap($row).contains(/John/i).should('exist');
      });
    });
  });
  