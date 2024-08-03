describe('MatchList Component Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should show a loading indicator initially', () => {
    cy.contains('Loading...').should('be.visible');
  });

  it('should render the list of matches', () => {
    // Wait for the loading indicator to disappear
    cy.contains('Loading...').should('not.exist');

    // Verify that the list of matches is visible
    cy.get('div.bg-gray-800', { timeout: 10000 }) // Adjust the class name if needed
      .should('have.length.greaterThan', 0);
  });
});
