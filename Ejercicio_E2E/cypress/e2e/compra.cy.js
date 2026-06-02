// ============================================================
// cypress/e2e/compra.cy.js
// Prueba E2E: Flujo completo de compra en Demoblaze
// Autor: Ronald Berrones
// Fecha: Junio 2026
// ============================================================

describe('Flujo de compra completo en Demoblaze', () => {

  // ----------------------------------------------------------
  // Variables de datos de prueba centralizadas
  // ----------------------------------------------------------
  const PRODUCTO_1 = 'Samsung galaxy s6';
  const PRODUCTO_2 = 'Nokia lumia 1520';

  const DATOS_COMPRA = {
    nombre: 'Ronald Berrones',
    pais: 'Ecuador',
    ciudad: 'Riobamba',
    tarjeta: '1234567890123456',
    mes: '06',
    anio: '2026',
  };

  // ----------------------------------------------------------
  // Caso de prueba principal
  // ----------------------------------------------------------
  it('Debe completar la compra de dos teléfonos exitosamente', () => {

    // Variable para almacenar los textos de las alertas capturadas
    const alertTexts = [];

    // Interceptar las alertas nativas del navegador
    // Cypress las acepta automáticamente; aquí las registramos para validación
    cy.on('window:alert', (text) => {
      alertTexts.push(text);
    });

    // ========================================================
    // PASO 1: Abrir la página principal de Demoblaze
    // ========================================================
    cy.visit('/');
    cy.url().should('include', 'demoblaze.com');
    cy.get('#tbodyid .card').should('have.length.greaterThan', 0);

    // ========================================================
    // PASO 2: Agregar "Samsung galaxy s6" al carrito
    // ========================================================
    cy.contains('.card-title a', PRODUCTO_1).click();

    // Verificar que estamos en la página del producto correcto
    cy.get('.name').should('contain', PRODUCTO_1);

    // Hacer clic en "Add to cart"
    cy.contains('a', 'Add to cart').click();

    // Esperar a que la alerta se dispare y sea registrada
    cy.wait(2000);

    // Validar que la alerta de producto agregado fue capturada
    cy.wrap(alertTexts).should('include', 'Product added');

    // ========================================================
    // PASO 3: Volver al catálogo principal
    // ========================================================
    cy.get('.navbar-brand').click();
    cy.get('#tbodyid .card').should('have.length.greaterThan', 0);

    // ========================================================
    // PASO 4: Agregar "Nokia lumia 1520" al carrito
    // ========================================================
    cy.contains('.card-title a', PRODUCTO_2).click();

    // Verificar que estamos en la página del producto correcto
    cy.get('.name').should('contain', PRODUCTO_2);

    // Hacer clic en "Add to cart"
    cy.contains('a', 'Add to cart').click();

    // Esperar a que la alerta se dispare y sea registrada
    cy.wait(2000);

    // Validar que se recibió una segunda alerta de producto agregado
    cy.wrap(alertTexts).should('have.length', 2);

    // ========================================================
    // PASO 5: Ir al carrito de compras
    // ========================================================
    cy.get('#cartur').click();

    // ========================================================
    // PASO 6: Verificar que ambos productos están en el carrito
    // ========================================================
    cy.get('tr.success').should('have.length', 2);
    cy.get('tr.success').should('contain', PRODUCTO_1);
    cy.get('tr.success').should('contain', PRODUCTO_2);

    // ========================================================
    // PASO 7: Hacer clic en "Place Order"
    // ========================================================
    cy.contains('button', 'Place Order').click();

    // Verificar que el modal de orden se muestra
    cy.get('#orderModal').should('be.visible');

    // ========================================================
    // PASO 8: Completar el formulario de compra
    // ========================================================
    cy.get('#name').type(DATOS_COMPRA.nombre);
    cy.get('#country').type(DATOS_COMPRA.pais);
    cy.get('#city').type(DATOS_COMPRA.ciudad);
    cy.get('#card').type(DATOS_COMPRA.tarjeta);
    cy.get('#month').type(DATOS_COMPRA.mes);
    cy.get('#year').type(DATOS_COMPRA.anio);

    // ========================================================
    // PASO 9: Finalizar la compra
    // ========================================================
    cy.contains('button', 'Purchase').click();

    // ========================================================
    // PASO 10: Validar mensaje de éxito
    // ========================================================
    cy.get('.sweet-alert').should('be.visible');
    cy.get('.sweet-alert h2').should('contain', 'Thank you for your purchase!');

    // Verificar que el modal de confirmación muestra información de la compra
    cy.get('.sweet-alert .lead').should('be.visible');

    // Cerrar el modal de confirmación
    cy.contains('button', 'OK').click();

    // Verificar que se regresó a la página principal
    cy.url().should('include', 'demoblaze.com');
  });
});
