# BigHeartApp Cypress Automation

This repository contains **automated tests for the BigHeartApp** using **Cypress**. The test suite follows the **Page Object Model (POM)** for improved maintainability and ensures key functionalities, such as login, post creation, and post deletion, are properly validated.

---

## 📌 **Project Overview**
This Cypress automation project covers the following scenarios:
1. **User Login** – Authenticates a user using valid credentials.
2. **Post Creation** – Creates a new post in a specific community.
3. **Post Verification** – Ensures the created post appears in the feed.
4. **Post Deletion** – Deletes the post and verifies its removal.

The test suite is designed for **maintainability, scalability, and efficiency** by utilizing **custom Cypress commands and POM architecture**.

---

## 📂 **Project Structure**
```
cypress/
│── e2e/                      # Test files
│   ├── bigheartapp.cy.js      # Main Cypress test suite
│── support/
│   ├── commands.js            # Custom Cypress commands
│   ├── pages/                 # Page Object Model (POM)
│   │   ├── FeedPage.js        # Handles post deletion interactions
│   │   ├── LoginPage.js       # Handles login actions
│   │   ├── PostPage.js        # Handles post creation interactions
│── fixtures/                  # Test data (if needed)
│── screenshots/               # Stores screenshots on test failure
│── downloads/                 # Stores downloaded test files
│── videos/                    # Stores Cypress test recordings
│── cypress.config.js          # Cypress configuration file
│── package.json               # Node.js dependencies
│── README.md                  # Project documentation
```

---

## 🚀 **Installation & Setup**
### **Prerequisites**
Before running the tests, ensure you have:
- **Node.js** (v14 or later recommended)
- **npm** (comes with Node.js)
- **Cypress** (installed via `package.json`)

### **1️⃣ Clone the Repository**
```sh
git clone <your-repo-url>
cd bigheartapp-cypress
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Cypress reads environment variables from `cypress.config.js`:
```json
{
  "env": {
    "email": "kandidat@example.com",
    "password": "RandomPassword123*!"
  }
}
```

---

## 🏃 **Running Tests**
### **Run Cypress in GUI Mode**
```sh
npx cypress open
```
- Opens the Cypress Test Runner.
- Click on `bigheartapp.cy.js` to execute tests interactively.

### **Run Cypress in Headless Mode**
```sh
npx cypress run
```
- Runs all tests in the terminal.
- Generates **screenshots and videos** on failure.

### **Run a Specific Test File**
```sh
npx cypress run --spec "cypress/e2e/bigheartapp.cy.js"
```

---

## 📌 **Test Cases**
### **Test: Login, Create Post, Verify Post, Delete Post**
Located in `cypress/e2e/bigheartapp.cy.js`, this test follows these steps:

1️⃣ **Logs into the application**
```javascript
cy.login();
```

2️⃣ **Creates a new post**
```javascript
cy.createPost("BigHeart Philanthropy", "Test Post");
```

3️⃣ **Verifies post appears in the feed**
```javascript
cy.contains("Test Post", { timeout: 10000 }).should("be.visible");
```

4️⃣ **Deletes the post**
```javascript
cy.deletePost("Test Post");
```

---

## 🏗 **Project Design - Page Object Model (POM)**
The project follows the **Page Object Model (POM)** to organize test actions in separate files.

### **LoginPage.js** (Handles login interactions)
```javascript
class LoginPage {
    visit() { cy.visit('/login'); }
    enterEmail(email) { cy.get('#email').type(email); }
    enterPassword(password) { cy.get('#password').type(password); }
    submit() { cy.get('button[type="submit"]').contains('Log in').click(); }
}
export default new LoginPage();
```

### **PostPage.js** (Handles post creation)
```javascript
class PostPage {
    startNewPost() { cy.get('#item_start-conversation').contains('Create post...').click(); }
    enterPostContent(postText) { cy.get('#post-editor_content .ck-editor__editable').invoke('html', `<p>${postText}</p>`).trigger('input'); }
}
export default new PostPage();
```

### **FeedPage.js** (Handles post deletion)
```javascript
class FeedPage {
    openPostMenu(postText) { cy.contains(postText).closest('.ant-card').find('.ant-dropdown-trigger').click(); }
}
export default new FeedPage();
```

These POM classes are utilized in `commands.js`:
```javascript
Cypress.Commands.add('login', () => { LoginPage.visit(); LoginPage.submit(); });
Cypress.Commands.add('createPost', (communityName, postText) => { PostPage.startNewPost(); PostPage.enterPostContent(postText); });
Cypress.Commands.add('deletePost', (postText) => { FeedPage.openPostMenu(postText); });
```

---

## 🎯 **Best Practices Implemented**
- **Page Object Model (POM)** for code organization.
- **API request interception (`cy.intercept()`)** to wait for responses.
- **Explicit assertions (`should('be.visible')`)** for stability.
- **Use of custom Cypress commands (`commands.js`)** to reuse logic.

---

## ❌ **Troubleshooting**
| Issue | Solution |
|--------|-----------------|
| Cypress is not running | Ensure Node.js and dependencies are installed (`npm install`) |
| Test fails due to missing element | Add `{ timeout: 10000 }` to `cy.contains()` or `cy.get()` |
| CKEditor content is not updated | Ensure `.trigger('input')` is fired after setting content |

---

## 🏗 **Further Improvements**
- Expand test coverage for **invalid login scenarios**.
- Add **comment and post-editing functionality** tests.
- Integrate with **CI/CD pipelines (GitHub Actions, Jenkins)**.
- Implement **visual regression testing**.

---

## 📞 **Contact**
For inquiries or clarifications, feel free to reach out.

---
