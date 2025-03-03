class FeedPage {
    /**
     * Opens the dropdown menu for a given post.
     * @param {string} postText - The text of the post for which the menu should be opened.
     */
    openPostMenu(postText) {
        cy.contains(postText, { timeout: 10000 })
            .closest('.ant-card')
            .find('.ant-dropdown-trigger').eq(0)
            .should('exist') // Ensure the dropdown exists before interaction
            .should('be.visible')
            .click({ force: true });
    }

    /**
     * Deletes a post by selecting "Delete" from the dropdown menu.
     * @param {string} postText - The text of the post to be deleted.
     */
    deletePost(postText) {
        cy.intercept('DELETE', '**/v3/posts/*').as('deletePost');

        // Wait for the dropdown menu to be available before clicking "Delete"
        cy.get('.ant-dropdown-menu', { timeout: 5000 })
            .should('exist') // Ensures Cypress waits for it
            .should('be.visible')
            .contains('Delete')
            .click();

        // Confirm successful deletion by verifying the API response
        cy.wait('@deletePost').its('response.statusCode').should('eq', 204);

        // Ensure the post no longer exists in the feed
        cy.contains(postText, { timeout: 10000 }).should('not.exist');
    }
}

export default new FeedPage();
