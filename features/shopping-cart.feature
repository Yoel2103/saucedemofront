Feature: Caso de uso de carrito de compras
  Como usuario autenticado
  Quiero agregar productos a mi carrito
  Para poder comprar artículos

  Background:
    Given Me encuentro en la pagina de Sauce Demo
    And Ingreso con usuario "standard_user" y contraseña "secret_sauce"
    And Me encuentro en la página de productos

  Scenario: Agregar un solo producto al carrito
    When Agrego "sauce-labs-backpack" al carrito
    Then el carrito debe mostrar "1"
    When Voy al carrito de compras
    Then Debo estar en la página del carrito
    And Debo ver "Sauce Labs Backpack" en el carrito

  Scenario: Agregar múltiples productos al carrito
    When Agrego "sauce-labs-backpack" al carrito
    And Agrego "sauce-labs-bike-light" al carrito
    Then el carrito debe mostrar "2"
    When Voy al carrito de compras
    Then Debo estar en la página del carrito
    And Debo ver "Sauce Labs Backpack" en el carrito
    And Debo ver "Sauce Labs Bike Light" en el carrito

  Scenario: Remover producto desde la página de productos
    When Agrego "sauce-labs-backpack" al carrito
    Then el carrito debe mostrar "1"
    When Remuevo "sauce-labs-backpack" del carrito en la página de productos
    Then El carrito debe estar vacío desde productos