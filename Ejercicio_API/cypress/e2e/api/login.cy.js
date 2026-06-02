import { faker } from '@faker-js/faker';

describe('Demoblaze API - Login (/login) Tests', () => {
  let validUsername;
  let validPassword;
  let testData;

  before(() => {
    // Cargar datos estáticos desde el fixture
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    // Generar credenciales dinámicas para la prueba de login exitoso
    validUsername = `qa_${faker.internet.userName().replace(/[^a-zA-Z0-9]/g, '')}_${faker.number.int({ min: 10000, max: 99999 })}`;
    validPassword = faker.internet.password({ length: 12 });
  });

  it('Caso 3: Usuario y password correcto - Login Exitoso', () => {
    // Registrar el usuario primero para garantizar que existe
    cy.signUp(validUsername, validPassword).then((signupResponse) => {
      expect(signupResponse.status).to.eq(200);

      // Intentar login
      cy.login(validUsername, validPassword).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);

        // La API devuelve un string JSON con formato "Auth_token: <token>"
        expect(loginResponse.body).to.be.a('string');
        expect(loginResponse.body).to.include('Auth_token:');

        // Extraer y validar el token generado
        const token = loginResponse.body.split('Auth_token: ')[1];
        expect(token).to.not.be.empty;

        cy.log(`Login exitoso. Token generado: ${token}`);
      });
    });
  });

  it('Caso 4: Usuario y password incorrecto - Credenciales Inválidas (Usuario Inexistente)', () => {
    const invalidUsername = testData.invalidUser.username;
    const invalidPassword = testData.invalidUser.password;

    cy.login(invalidUsername, invalidPassword).then((response) => {
      // La API sigue respondiendo 200 OK
      expect(response.status).to.eq(200);
      
      // Validar mensaje de error de la respuesta
      expect(response.body).to.have.property('errorMessage');
      expect(response.body.errorMessage).to.eq('User does not exist.');
      
      cy.log(`Intento de login fallido controlado. Mensaje: ${response.body.errorMessage}`);
    });
  });

  it('QA Extra Case: Usuario existente con contraseña incorrecta', () => {
    // Registrar el usuario primero
    cy.signUp(validUsername, validPassword).then((signupResponse) => {
      expect(signupResponse.status).to.eq(200);

      // Intentar iniciar sesión con contraseña errónea
      cy.login(validUsername, 'ContrasenaIncorrecta123!').then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);
        
        // Validar mensaje de error de contraseña incorrecta
        expect(loginResponse.body).to.have.property('errorMessage');
        expect(loginResponse.body.errorMessage).to.eq('Wrong password.');

        cy.log(`Intento de login con password incorrecto controlado. Mensaje: ${loginResponse.body.errorMessage}`);
      });
    });
  });
});
