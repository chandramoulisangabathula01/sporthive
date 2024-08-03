/// <reference types="cypress" />

/// <reference types="cypress" />

describe('Signup Form Behavior', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/signup');
  });

  it('should display the signup form elements correctly', () => {
    cy.get('form').should('be.visible');
    cy.get('input[name="userName"]').should('be.visible');
    cy.get('input[name="userEmail"]').should('be.visible');
    cy.get('input[name="userPassword"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should allow user details to be entered', () => {
    cy.get('input[name="userName"]').type('John Doe').should('have.value', 'John Doe');
    cy.get('input[name="userEmail"]').type('john@example.com').should('have.value', 'john@example.com');
    cy.get('input[name="userPassword"]').type('password123').should('have.value', 'password123');
  });

  it('should show an error for invalid signup information', () => {
    cy.get('input[name="userName"]').type('John Doe');
    cy.get('input[name="userEmail"]').type('invalid-email');
    cy.get('input[name="userPassword"]').type('password123');
    cy.get('form').submit();

    cy.get('.text-red-500').should('be.visible').and('contain.text', 'Sign-up failed');
  });

  it('should include links to the sign-in and home pages', () => {
    cy.get('a[href="/landingpage"]').should('be.visible').and('contain.text', 'HOME');
    cy.get('a[href="/signin"]').should('be.visible').and('contain.text', 'LOGIN');
  });
});

