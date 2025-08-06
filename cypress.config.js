const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "6q9e42",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
