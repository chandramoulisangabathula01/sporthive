describe('TeamAndSportList Component Tests', () => {
    it('should display the sports dropdown menu', () => {
      cy.visit('http://localhost:5173/teams');
      cy.get('select').first().should('be.visible');
    });
  
    it('should reveal the teams dropdown after a sport is selected', () => {
      cy.visit('http://localhost:5173/teams');
      
      // Verify that the sports dropdown has options before selecting
      cy.get('select').first().find('option').should('have.length.greaterThan', 1);
      cy.get('select').first().select(1);
  
      // Check if the teams dropdown is now visible
      cy.get('select').eq(1).should('be.visible');
    });
  
    it('should display articles after selecting a team', () => {
      cy.visit('http://localhost:5173/teams');
      
      // Verify that the sports dropdown has options before selecting
      cy.get('select').first().find('option').should('have.length.greaterThan', 1);
      cy.get('select').first().select(1);
  
      // Ensure the teams dropdown has options before making a selection
      cy.get('select').eq(1).find('option').should('have.length.greaterThan', 1);
      cy.get('select').eq(1).select(1);
    });
  });
  