/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        login(): Chainable<void>;
        createPost(communityName: string, postText: string): Chainable<void>;
        deletePost(postText: string): Chainable<void>;
    }
}
