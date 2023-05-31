describe('Authenticate', () => {
  it('logs into login.microsoftonline through a user web app', () => {
    cy.visit('https://ewa-qad2f13c7892891sssss884devaos.axcloud.dynamics.com/');
    cy.get('button#sign-in-dropdown').click();
    cy.get('button#sign-in-redirect').click();

    cy.origin('login.microsoftonline.com', () => {
      cy.get('input[type="email"]').type(Cypress.env('aad_username'));
      cy.get('input[type="submit"]').click();
    });

    // depending on the user and how they are registered with microsoft, the origin might go to live.com
    cy.origin('login.live.com', () => {
      cy.get('input[type="password"]').type(Cypress.env('aad_password'), {
        log: false
      });
      cy.get('input[type="submit"]').click();
      cy.get('#idBtn_Back').click();
    });

    cy.get('#welcome-banner').should(
      'contain',
      `Welcome ${Cypress.env('aad_name')}`
    );
  });
})