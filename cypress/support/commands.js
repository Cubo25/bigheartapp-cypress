import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import FeedPage from './pages/FeedPage';

/**
 * Custom Cypress command to log in to the application.
 */
Cypress.Commands.add('login', () => {
    LoginPage.visit();
    LoginPage.clickUsePassword();
    LoginPage.enterEmail(Cypress.env('email'));
    LoginPage.enterPassword(Cypress.env('password'));
    LoginPage.submit();
    LoginPage.verifyLoginSuccess();
});

/**
 * Custom Cypress command to create a new post.
 * @param {string} communityName - The name of the community to post in.
 * @param {string} postText - The text content of the post.
 */
Cypress.Commands.add('createPost', (communityName, postText) => {
    PostPage.startNewPost();
    PostPage.selectCommunity(communityName);
    PostPage.enterPostContent(postText);
    PostPage.submitPost();
    PostPage.verifyPostVisible(postText);
});

/**
 * Custom Cypress command to delete a post.
 * @param {string} postText - The text content of the post to be deleted.
 */
Cypress.Commands.add('deletePost', (postText) => {
    FeedPage.openPostMenu(postText);
    FeedPage.deletePost(postText);
});
