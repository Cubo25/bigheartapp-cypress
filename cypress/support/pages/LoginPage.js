class LoginPage {
    /**
     * Navigates to the login page.
     */
    visit() {
        cy.visit('/login');
    }

    /**
     * Inputs the email into the login form.
     * @param {string} email - The email address to enter.
     */
    enterEmail(email) {
        cy.get('#email').should('be.visible').type(email);
    }

    /**
     * Inputs the password into the login form.
     * @param {string} password - The password to enter.
     */
    enterPassword(password) {
        cy.get('#password').should('be.visible').type(password);
    }

    /**
     * Clicks the "Use password" button to switch to password login.
     */
    clickUsePassword() {
        cy.contains('button', 'Use password').should('be.visible').click(); // Targeting only buttons
    }

    /**
     * Submits the login form.
     */
    submit() {
        cy.get('button[type="submit"]').contains('Log in').should('be.visible').click();
    }

    /**
     * Verifies that login was successful by checking for the feed page.
     */
    verifyLoginSuccess() {
        cy.intercept('GET', '**/content_objects/feed*').as('feedRequest');
        cy.wait('@feedRequest', { timeout: 10000 });
        cy.url().should('include', '/feed');

        // Additional check to confirm the user is logged in
        cy.get('.app-layout__header__content__logo').should('be.visible');
    }
}

export default new LoginPage();
