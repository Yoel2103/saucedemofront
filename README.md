# 🎭 SauceDemo Playwright Automation

Proyecto de automatización de pruebas E2E para [SauceDemo](https://www.saucedemo.com/) utilizando *Playwright* con *TypeScript* y *Cucumber* (BDD).

## 📋 AUTOR
- Martin Yoel Carmen Carreño 
## 📋 Tabla de Contenidos

- [🛠️ Tecnologías](#️-tecnologías)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Instalación](#-instalación)
- [▶️ Ejecución de Pruebas](#️-ejecución-de-pruebas)
- [📊 Reportes](#-reportes)
- [🧪 Casos de Prueba](#-casos-de-prueba)
- [🏗️ Arquitectura](#️-arquitectura)
- [📝 Scripts Disponibles](#-scripts-disponibles)
- [🤝 Contribución](#-contribución)

## 🛠️ Tecnologías

- **[Playwright](https://playwright.dev/)** - Framework de automatización de navegadores
- **[TypeScript](https://www.typescriptlang.org/)** - Lenguaje de programación tipado
- **[Cucumber](https://cucumber.io/)** - Framework BDD (Behavior Driven Development)
- **[Node.js](https://nodejs.org/)** - Entorno de ejecución

## 📁 Estructura del Proyecto


saucedemo_playwright_front/
├── 📁 features/                 # Archivos .feature (Gherkin)
│   ├── login.feature
│   ├── shopping-cart.feature
│   └── checkout.feature
├── 📁 step-definitions/         # Definiciones de pasos
│   ├── loginSteps.ts
│   ├── shoppingCartSteps.ts
│   ├── checkoutSteps.ts
│   └── World.ts
├── 📁 hooks/                    # Hooks de Cucumber
│   └── hooks.ts
├── 📁 src/
│   ├── 📁 config/              # Configuraciones
│   │   └── playwright.config.ts
│   └── 📁 pages/               # Page Object Model
│       ├── BasePage.ts
│       ├── LoginPage.ts
│       ├── ProductsPage.ts
│       ├── CartPage.ts
│       └── CheckoutPage.ts
├── 📁 reports/                 # Reportes generados
├── 📄 cucumber.js              # Configuración de Cucumber
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 README.md


## 🚀 Instalación

### Prerrequisitos

- *Node.js* (versión 16 o superior)
- *npm* o *yarn*

### Pasos de instalación

1. *Clonar el repositorio:*
bash
git clone <url-del-repositorio>
cd saucedemo_playwright_front


2. *Instalar dependencias:*
bash
npm install


3. *Instalar navegadores de Playwright:*
bash
npx playwright install


## ▶️ Ejecución de Pruebas

### Ejecutar todas las pruebas (modo visual)
bash
npm test


### Ejecutar pruebas en modo headless
bash
npm run test:headless


### Ejecutar pruebas con reportes
bash
npm run test:report


### Ejecutar pruebas por tags
bash
npm run test:tag -- @login


### Ejecutar pruebas de un feature específico
bash
npx cucumber-js features/login.feature
npx cucumber-js features/checkout.feature


### Ejecutar en modo debug (con browser visible)
bash
npm test


## 📊 Reportes

Los reportes se generan automáticamente en la carpeta reports/:

- *📄 cucumber-report.html* - Reporte visual HTML
- *📄 cucumber-report.json* - Reporte en formato JSON

Para visualizar el reporte HTML, abre el archivo en tu navegador:
bash
open reports/cucumber-report.html


## 🧪 Casos de Prueba

### 🔐 Login
- ✅ Login exitoso con credenciales válidas
- ❌ Login fallido con usuario bloqueado
- ❌ Login fallido con credenciales inválidas

### 🛒 Carrito de Compras
- ✅ Agregar un producto al carrito
- ✅ Agregar múltiples productos al carrito
- ✅ Verificar contador del carrito
- ✅ Visualizar productos en el carrito
- ✅ Remover productos del carrito

### 🛍️ Proceso de Checkout
- ✅ Completar compra exitosamente
- ✅ Checkout con múltiples productos
- ✅ Validación de información requerida
- ❌ Checkout con información incompleta
- ✅ Cancelar checkout y continuar comprando
- ✅ Navegación entre páginas del checkout

## 🏗️ Arquitectura

### Page Object Model (POM)

El proyecto utiliza el patrón *Page Object Model* para mantener el código organizado y reutilizable:

- *BasePage* - Clase base con métodos comunes
- *LoginPage* - Métodos específicos de la página de login
- *ProductsPage* - Métodos específicos de la página de productos
- *CartPage* - Métodos específicos de la página del carrito
- *CheckoutPage* - Métodos específicos del proceso de checkout

### Behavior Driven Development (BDD)

Las pruebas están escritas en *Gherkin* (español) utilizando Cucumber:

gherkin
Feature: Caso de uso Login
  Scenario: Login Ok con credenciales válidas
    Given Me encuentro en la pagina de Sauce Demo
    When Ingreso con usuario "standard_user" y contraseña "secret_sauce"
    Then Debo ser redirigido a la página de productos
    And Debo ver el título de los productos


gherkin
Feature: Caso de uso de Checkout
  Scenario: Completar compra exitosamente
    Given Me encuentro en la pagina de Sauce Demo
    And Ingreso con usuario "standard_user" y contraseña "secret_sauce"
    When Agrego "sauce-labs-backpack" al carrito
    And Voy al carrito de compras
    And Procedo al checkout
    When Completo la información del checkout con nombre "Martin", apellido "Carmen" y código postal "12345"
    And Continúo al resumen del pedido
    And Finalizo el pedido
    Then Debo ver la confirmación del pedido


## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| npm test | Ejecuta todas las pruebas en modo visual |
| npm run test:headless | Ejecuta pruebas en modo headless |
| npm run test:report | Ejecuta pruebas y genera reportes |
| npm run test:tag | Ejecuta pruebas filtradas por tags |

### Comandos adicionales útiles

bash
# Ejecutar solo pruebas de login
npx cucumber-js features/login.feature

# Ejecutar solo pruebas de checkout
npx cucumber-js features/checkout.feature

# Ejecutar solo pruebas de carrito
npx cucumber-js features/shopping-cart.feature

# Compilar TypeScript sin ejecutar
npx tsc --noEmit

# Limpiar reportes anteriores
rm -rf reports/*


## 🔧 Configuración

### Variables de Entorno

- *HEADLESS* - Ejecutar navegador en modo headless (true/false)

### Configuración del Navegador

La configuración se encuentra en src/config/playwright.config.ts:

typescript
export const browserConfig: LaunchOptions = {
  headless: process.env.HEADLESS === 'true',
  slowMo: 50,
  timeout: 50000
};


## 🤝 Contribución

1. Fork del proyecto
2. Crear una rama para tu feature (git checkout -b feature/nueva-funcionalidad)
3. Commit de tus cambios (git commit -m 'Agregar nueva funcionalidad')
4. Push a la rama (git push origin feature/nueva-funcionalidad)
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia ISC.

## 🐛 Solución de Problemas

### Error de timeout en BeforeAll
Si experimentas timeouts al lanzar el navegador, prueba:
bash
npm run test:headless


### Problemas con step definitions
Verifica que los archivos .ts en step-definitions/ estén compilando correctamente:
bash
npx tsc --noEmit


### Error "step definition undefined"
Si ves errores de step definitions no definidos:
1. Verifica que el texto del step en el .feature coincida exactamente con el step definition
2. Revisa que no haya diferencias en acentos o espacios
3. Ejecuta npx tsc --noEmit para verificar errores de TypeScript

### Problemas de navegación en SauceDemo
- Asegúrate de usar las credenciales correctas: standard_user / secret_sauce
- Verifica que los selectores de elementos no hayan cambiado en la página
- Revisa los logs del navegador en caso de errores JavaScript

### Errores de compilación TypeScript
bash
# Limpiar y reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar configuración de TypeScript
npx tsc --showConfig


---

⭐ *¡Si este proyecto te fue útil, no olvides darle una estrella!* ⭐
