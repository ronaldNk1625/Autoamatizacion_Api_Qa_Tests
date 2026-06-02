========================================================================
DEMOBLAZE API REST TEST AUTOMATION FRAMEWORK
========================================================================

Este proyecto es un framework de automatización para probar los servicios
REST de Demoblaze (POST /signup y POST /login) desarrollado en Cypress con 
generación de datos dinámicos mediante Faker.js y reportería automatizada
con Mochawesome.

------------------------------------------------------------------------
ESTRUCTURA DEL PROYECTO
------------------------------------------------------------------------
demoblaze-api-tests/ (raíz del proyecto)
│
├── cypress/
│   ├── e2e/
│   │   └── api/
│   │       ├── signup.cy.js    # Suite de pruebas para el registro
│   │       └── login.cy.js     # Suite de pruebas para el login
│   │
│   ├── fixtures/
│   │   └── testData.json       # Datos estáticos de prueba (negativas)
│   │
│   └── support/
│       ├── commands.js         # Comandos personalizados (API Requests)
│       └── e2e.js              # Inicialización global de soporte
│
├── reports/                    # Reportes HTML generados dinámicamente
│
├── cypress.config.js           # Configuración general de Cypress
├── package.json                # Definición de dependencias y scripts
├── README.txt                  # Instrucciones de uso del framework
├── conclusiones.txt            # Hallazgos y reporte técnico de QA
└── .gitignore                  # Exclusiones para control de versiones

------------------------------------------------------------------------
REQUISITOS PREVIOS
------------------------------------------------------------------------
Asegúrate de tener instalado Node.js (versión 18 o superior recomendada).

------------------------------------------------------------------------
INSTRUCCIONES DE EJECUCIÓN (PASO A PASO)
------------------------------------------------------------------------

1. INSTALACIÓN DE DEPENDENCIAS:
   Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando:
   npm install

2. EJECUCIÓN DE PRUEBAS EN MODO INTERACTIVO (CYPRESS RUNNER):
   Abre la interfaz gráfica de Cypress para ejecutar los specs visualmente:
   npx cypress open

   * Una vez abierto Cypress:
     a) Selecciona "E2E Testing"
     b) Elige tu navegador preferido (ej. Chrome o Electron)
     c) Haz clic en el spec que deseas ejecutar (signup.cy.js o login.cy.js)

3. EJECUCIÓN DE PRUEBAS EN MODO HEADLESS (TERMINAL):
   Para correr todas las pruebas en segundo plano y generar los resultados JSON:
   npm run test

4. GENERACIÓN DE REPORTES AUTOMÁTICOS:
   Una vez terminada la ejecución con "npm run test", genera el reporte
   HTML consolidado interactivo ejecutando:
   npm run report

   * Esto creará un reporte unificado en la siguiente ruta:
     reports/html/report.html
   * Abre ese archivo en cualquier navegador para ver el resultado detallado de las pruebas.

------------------------------------------------------------------------
DISEÑO Y BUENAS PRÁCTICAS IMPLEMENTADAS
------------------------------------------------------------------------
* Custom Commands: Se modularizó el acceso a los endpoints (/signup y /login)
  en comandos reutilizables de Cypress.
* Control del Status HTTP: La API retorna 200 OK para errores lógicos de negocio.
  Se configuró failOnStatusCode: false en las peticiones y se diseñaron aserciones
  para validar el contenido del objeto body.errorMessage.
* Datos Dinámicos: Se integró Faker.js para crear usuarios aleatorios en tiempo
  real, evitando colisiones de datos y falsos positivos.
