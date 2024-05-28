const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on);
    },
    baseUrl: 'https://front.serverest.dev/',
    video: true,
    projectId: "9isk8o",
    env: {
      local: 'http://localhost:3000/',
      prod: 'https://serverest.dev/'
    }
  },
});
