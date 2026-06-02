=========================================================
PROYECTO DE AUTOMATIZACION E2E CON CYPRESS - DEMOBLAZE
=========================================================

Este proyecto contiene un flujo automatizado de pruebas de extremo a extremo (E2E)
para la plataforma web Demoblaze (https://www.demoblaze.com/), desarrollado usando Cypress.

---------------------------------------------------------
1. INSTALACION DE REQUISITOS
---------------------------------------------------------
Asegúrate de tener instalado Node.js (versión 18 o superior recomendada) en tu sistema.
Para verificar tu instalación, ejecuta en la terminal:
    node -v
    npm -v

Para instalar las dependencias del proyecto en un entorno local limpio:
1. Abre tu terminal en la carpeta raíz de este proyecto (Ejercicio_E2E).
2. Ejecuta el comando:
    npm install

Esto instalará automáticamente Cypress en su versión correcta.

---------------------------------------------------------
2. CONFIGURACION
---------------------------------------------------------
La configuración principal del proyecto reside en el archivo 'cypress.config.js'.
Ahí se definen configuraciones como:
- baseUrl: 'https://www.demoblaze.com' (URL base para simplificar cy.visit('/'))
- viewportWidth / viewportHeight: Resolución de pantalla ajustada a 1280x720.
- defaultCommandTimeout: Tiempo de espera de comandos ampliado a 10000ms para soportar redes lentas.
- video: Habilitado para grabar la ejecución en ejecuciones de CLI.

---------------------------------------------------------
3. EJECUCION PASO A PASO
---------------------------------------------------------

OPCION A: Modo Interactivo (Interfaz de Usuario)
Permite ver visualmente el paso a paso de las pruebas.
1. Ejecuta el siguiente comando en la terminal:
    npm run open
   O alternativamente:
    npx cypress open
2. Se abrirá la interfaz gráfica de Cypress Runner.
3. Elige la opción "E2E Testing".
4. Selecciona un navegador disponible (como Chrome, Electron o Edge) y haz clic en "Start E2E Testing...".
5. En la lista de specs que se despliega, haz clic en "compra.cy.js".
6. Observarás cómo Cypress realiza el flujo completo automáticamente.

OPCION B: Modo Headless (Línea de Comandos)
Ejecuta la prueba en segundo plano sin abrir una ventana de navegador. Ideal para pipelines CI/CD.
1. Ejecuta en la terminal:
    npm run test
   O alternativamente:
    npx cypress run
2. El reporte detallado de la prueba y su resultado final se mostrará directamente en la terminal.
3. Se generará un video de la ejecución dentro de 'cypress/videos/compra.cy.js.mp4'.

---------------------------------------------------------
4. COMANDOS NPM DISPONIBLES
---------------------------------------------------------
En este proyecto se han mapeado los siguientes comandos en 'package.json':

- 'npm run open' : Abre la interfaz gráfica de Cypress para ejecución visual interactiva.
- 'npm run test' : Ejecuta todas las pruebas en segundo plano (modo headless) y genera videos.

---------------------------------------------------------
5. ESTRUCTURA DEL PROYECTO
---------------------------------------------------------
- cypress.config.js       : Configuración central de Cypress.
- package.json            : Definición del proyecto, scripts y dependencias.
- .gitignore              : Carpetas y archivos omitidos del control de versiones.
- readme.txt              : Este manual de instalación y ejecución.
- conclusiones.txt        : Reporte técnico final y hallazgos.
- cypress/e2e/compra.cy.js: Script de prueba automatizada E2E.
- cypress/support/e2e.js  : Archivo de soporte para configuraciones y comandos personalizados.
=========================================================
