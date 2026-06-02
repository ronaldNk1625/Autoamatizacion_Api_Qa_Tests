describe('Flujo de compra completo en Demoblaze', () => {
  it('Debe completar la compra de dos teléfonos exitosamente', () => {
    // Escuchar las alertas del navegador y aceptarlas
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Product added');
    });

    // Abrir https://www.demoblaze.com/
    cy.visit('/');

    // Agregar el producto "Samsung galaxy s6" al carrito
    cy.contains('a', 'Samsung galaxy s6').click();
    cy.contains('a', 'Add to cart').click();
    
    // Esperar un momento para asegurar que se registre la acción del alert (Cypress las acepta auto)
    cy.wait(1000);

    // Volver al catálogo
    cy.contains('a', 'Home').click();

    // Agregar el producto "Nokia lumia 1520"
    cy.contains('a', 'Nokia lumia 1520').click();
    cy.contains('a', 'Add to cart').click();

    cy.wait(1000);

    // Ir al carrito
    cy.get('#cartur').click();

    // Verificar que ambos productos estén presentes
    cy.get('.success').should('contain', 'Samsung galaxy s6');
    cy.get('.success').should('contain', 'Nokia lumia 1520');

    // Hacer clic en "Place Order"
    cy.contains('button', 'Place Order').click();

    // Completar formulario con los datos requeridos
    cy.get('#name').type('Ronald Berrones');
    cy.get('#country').type('Ecuador');
    cy.get('#city').type('Riobamba');
    cy.get('#card').type('1234567890123456');
    cy.get('#month').type('06');
    cy.get('#year').type('2026');

    // Finalizar compra
    cy.contains('button', 'Purchase').click();

    // Validar mensaje "Thank you for your purchase!"
    cy.get('.sweet-alert').should('be.visible');
    cy.get('.sweet-alert h2').should('contain', 'Thank you for your purchase!');
    
    // Finalizar dando click en OK
    cy.contains('button', 'OK').click();
  });
});
