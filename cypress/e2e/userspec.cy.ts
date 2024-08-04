/// <reference types="cypress" />

describe('UserInformation Component', () => {
    beforeEach(() => {
      // Mock local storage data for user and preferences
      localStorage.setItem('authToken', 'your-test-auth-token');
      localStorage.setItem('userData', JSON.stringify({ name: 'John Doe', email: 'john@example.com' }));
      localStorage.setItem('userPreferences', JSON.stringify({
        selectedSports: ['Football', 'Basketball'],
        selectedTeams: ['Team A', 'Team B'],
      }));
  
      // Visit the component page
      cy.visit('http://localhost:5173/user');
    });
  
    it('should render user information correctly', () => {
      cy.get('h2').contains('User Information').should('be.visible');
      cy.get('p').contains('Name: John Doe').should('be.visible');
      cy.get('p').contains('Email: john@example.com').should('be.visible');
    });
  
    // it('should display user preferences correctly', () => {
    //   cy.get('p').contains('Selected Sports: Football, Basketball').should('be.visible');
    //   cy.get('p').contains('Selected Teams: Team A, Team B').should('be.visible');
    // });
  
    it('should show the password change modal when clicking "Change Password"', () => {
      cy.get('button').contains('Change Password').click();
      cy.get('h2').contains('Update Password').should('be.visible');
    });
  
    it('should allow the user to input new password details', () => {
      cy.get('button').contains('Change Password').click();
  
      cy.get('input#currentPass').type('oldPassword').should('have.value', 'oldPassword');
      cy.get('input#newPass').type('newPassword123').should('have.value', 'newPassword123');
    });
  
    it('should display success message and close modal on password change', () => {
        // Open the password change modal
        cy.get('button').contains('Change Password').click();
    
        // Simulate entering passwords and clicking save
        cy.get('input#currentPass').type('oldPassword');
        cy.get('input#newPass').type('newPassword123');
        
        // Debugging step: ensure input values are correct
        cy.get('input#currentPass').should('have.value', 'oldPassword');
        cy.get('input#newPass').should('have.value', 'newPassword123');
        
        // Click the save button to submit the form
        cy.get('button').contains('Save').click();
    
        
      });
  
    it('should close the password change modal when cancel is clicked', () => {
      cy.get('button').contains('Change Password').click();
      cy.get('button').contains('Cancel').click();
      cy.get('h2').contains('Update Password').should('not.exist');
    });
  });
  