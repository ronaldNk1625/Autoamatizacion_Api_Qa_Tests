// Comandos personalizados para interactuar con la API de Demoblaze

/**
 * Realiza una petición POST al endpoint /signup para registrar un usuario.
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña del usuario
 */
Cypress.Commands.add('signUp', (username, password) => {
  return cy.request({
    method: 'POST',
    url: '/signup',
    body: {
      username: username,
      password: password
    },
    failOnStatusCode: false // Evita que Cypress falle automáticamente ante estados que no sean 2xx/3xx
  });
});

/**
 * Realiza una petición POST al endpoint /login para iniciar sesión.
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña del usuario
 */
Cypress.Commands.add('login', (username, password) => {
  return cy.request({
    method: 'POST',
    url: '/login',
    body: {
      username: username,
      password: password
    },
    failOnStatusCode: false // Evita que Cypress falle automáticamente ante estados que no sean 2xx/3xx
  });
});
