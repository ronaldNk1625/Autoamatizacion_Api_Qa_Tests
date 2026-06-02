// ============================================================
// cypress.config.js
// Configuración central del proyecto Cypress E2E - Demoblaze
// ============================================================

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // URL base del sitio bajo prueba
    baseUrl: "https://www.demoblaze.com",

    // Resolución del viewport (pantalla simulada)
    viewportWidth: 1280,
    viewportHeight: 720,

    // Tiempo máximo de espera para que un comando de Cypress resuelva (en ms)
    defaultCommandTimeout: 12000,

    // Tiempo máximo para la carga de la página
    pageLoadTimeout: 30000,

    // Tiempo máximo para peticiones HTTP
    requestTimeout: 10000,

    // Grabar video de la ejecución en modo headless
    video: true,

    // Captura de pantalla solo en caso de falla
    screenshotOnRunFailure: true,

    // Carpeta donde se guardarán las capturas
    screenshotsFolder: "cypress/screenshots",

    // Carpeta donde se guardarán los videos
    videosFolder: "cypress/videos",

    // No reutilizar navegador entre pruebas para evitar estado sucio
    testIsolation: true,

    setupNodeEvents(on, config) {
      // Aquí se pueden agregar listeners de eventos de Node.js
      // Por ejemplo: plugins, reportes, tareas personalizadas
    },
  },
});
