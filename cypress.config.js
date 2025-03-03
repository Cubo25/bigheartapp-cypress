const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qa.bigheartapp.org",
    env: {
      email: "kandidat@example.com",
      password: "RandomPassword123*!"
    }
  }
});
