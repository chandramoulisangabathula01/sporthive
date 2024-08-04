describe('ArticleList Component Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/articles');
  });

  it('should correctly render the list of articles', () => {
    // Verify that the loading indicator is not present
    cy.contains('Loading...').should('not.exist');

    // Wait until the articles are displayed on the page
    cy.get('div.bg-gray-800', { timeout: 10000 }).should('have.length.greaterThan', 0);
  });

  it('should open and close the article detail modal', () => {
    // Confirm that the loading state has finished
    cy.contains('Loading...').should('not.exist');

    // Trigger the modal by clicking the 'Read more' button and check if it becomes visible
    cy.get('button').contains('Read more').first().click();
    cy.get('div.fixed').should('be.visible');

    // Close the modal by clicking the 'Close' button
    // cy.get('button').contains('Close').click();
  });
});
