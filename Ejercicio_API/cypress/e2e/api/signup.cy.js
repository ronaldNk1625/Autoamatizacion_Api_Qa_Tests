import { faker } from '@faker-js/faker';

describe('Demoblaze API - Signup (/signup) Tests', () => {
  let username;
  let password;

  beforeEach(() => {
    // Generar credenciales aleatorias utilizando Faker.js
    // Se añade un número al final para garantizar aún más la unicidad
    username = `qa_${faker.internet.userName().replace(/[^a-zA-Z0-9]/g, '')}_${faker.number.int({ min: 10000, max: 99999 })}`;
    password = faker.internet.password({ length: 12 });
  });

  it('Caso 1: Crear un nuevo usuario exitosamente', () => {
    cy.signUp(username, password).then((response) => {
      // Validar código de estado HTTP exitoso
      expect(response.status).to.eq(200);
      
      // La API de Demoblaze para registro exitoso responde con un string JSON vacío: ""
      expect(response.body).to.eq("");
      
      // Logs detallados para auditoría
      cy.log(`Usuario creado exitosamente: ${username}`);
    });
  });

  it('Caso 2: Intentar crear un usuario ya existente', () => {
    // Registrar el usuario por primera vez
    cy.signUp(username, password).then((firstResponse) => {
      expect(firstResponse.status).to.eq(200);
      expect(firstResponse.body).to.eq("");

      // Intentar registrar el mismo usuario nuevamente
      cy.signUp(username, password).then((secondResponse) => {
        // La API sigue devolviendo 200 OK para el error lógico
        expect(secondResponse.status).to.eq(200);

        // Validar que el cuerpo contenga la estructura del mensaje de error
        expect(secondResponse.body).to.have.property('errorMessage');
        
        // Validar el mensaje de error esperado (ojo: contiene el typo de la API 'already exist.')
        expect(secondResponse.body.errorMessage).to.eq('This user already exist.');
        
        cy.log(`Intento de duplicación capturado correctamente. Mensaje: ${secondResponse.body.errorMessage}`);
      });
    });
  });
});
