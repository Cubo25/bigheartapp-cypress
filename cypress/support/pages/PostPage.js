class PostPage {
    /**
     * Clicks the button to start creating a new post.
     */
    startNewPost() {
        cy.get('#item_start-conversation').contains('Create post...').click();
    }

    /**
     * Selects a community in which the post should be published.
     * @param {string} communityName - The name of the community to select.
     */
    selectCommunity(communityName) {
        cy.get('#rc_select_0').click();
        cy.get(`[title="${communityName}"]`).should('be.visible').click();
    }

    /**
     * Enters text content into the CKEditor post editor.
     * @param {string} postText - The text content to enter into the post.
     */
    enterPostContent(postText) {
        cy.get('#post-editor_content .ck-editor__editable').should('be.visible');

        cy.get('#post-editor_content .ck-editor__editable').then(($el) => {
            const editorInstance = $el[0].ckeditorInstance;
            if (editorInstance) {
                editorInstance.setData(`<p>${postText}</p>`); // Insert text into CKEditor
            }
        });
    }

    /**
     * Submits the post after entering content.
     */
    submitPost() {
        cy.intercept('POST', '**/v3/posts').as('newPost');
        cy.get('#btn_submit-post').click();

        // Wait for the API response to confirm successful post creation
        cy.wait('@newPost').its('response.statusCode').should('eq', 201);

        // Wait until the loading spinner disappears before proceeding
        cy.get('.icon-spin5', { timeout: 10000 }).should('not.exist');
    }

    /**
     * Verifies that the post appears in the feed.
     * @param {string} postText - The text content of the post to verify.
     */
    verifyPostVisible(postText) {
        cy.contains(postText, { timeout: 10000 }).should('be.visible');
    }
}

export default new PostPage();
