const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api.demoblaze.com",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      // Implementar listeners de nodos aquí si es necesario
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "reports/mocha",
    overwrite: false,
    html: false,
    json: true
  }
});
