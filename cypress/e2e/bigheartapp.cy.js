/// <reference types="cypress" />

describe('BigHeartApp Automation Test', () => {
    const communityName = "BigHeart Philanthropy";
    const postText = "Test Post";

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/login');
    });

    it('Logs in, creates a post, verifies it, and deletes it', () => {
        // **Step 1: Log in**
        cy.login();

        // **Step 2: Create a post**
        cy.createPost(communityName, postText);

        // **Step 3: Verify the post appears in the feed**
        cy.contains(postText, { timeout: 10000 }).should('be.visible');

        // **Step 4: Delete the post**
        cy.deletePost(postText);
    });
});
