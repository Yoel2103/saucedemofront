Feature: Caso de uso de Checkout
  Como usuario autenticado con productos en el carrito
  Quiero completar el proceso de compra
  Para finalizar mi pedido exitosamente

  Background:
    Given Me encuentro en la pagina de Sauce Demo
    And Ingreso con usuario "standard_user" y contraseña "secret_sauce"
    And Me encuentro en la página de productos
    And Agrego "sauce-labs-backpack" al carrito

  Scenario: Completar compra exitosamente
    When Voy al carrito de compras
    Then Debo estar en la página del carrito
    And Debo ver 1 producto en el carrito
    When Procedo al checkout
    Then Debo estar en la página de información del checkout
    When Completo la información del checkout con nombre "Martin", apellido "Carmem" y código postal "12345"
    And Continúo al resumen del pedido
    Then Debo estar en la página de resumen del checkout
    And Debo ver el resumen del pedido
    When Finalizo el pedido
    Then Debo ver la confirmación del pedido
    When Vuelvo a la página principal
    Then Debo ser redirigido a la página de productos

  Scenario: Checkout con múltiples productos
    Given Agrego "sauce-labs-bike-light" al carrito
    When Voy al carrito de compras
    Then Debo estar en la página del carrito
    And Debo ver 2 productos en el carrito
    When Procedo al checkout
    And Completo la información del checkout con nombre "María", apellido "García" y código postal "54321"
    And Continúo al resumen del pedido
    And Finalizo el pedido
    Then Debo ver la confirmación del pedido

  Scenario: Checkout con información incompleta
    When Voy al carrito de compras
    And Procedo al checkout
    When Continúo al resumen del pedido
    Then Debo ver un mensaje de error "Error: First Name is required" en el checkout

  Scenario: Remover producto del carrito
    When Voy al carrito de compras
    And Remuevo "sauce-labs-backpack" del carrito
    Then El carrito debe estar vacío

  Scenario: Cancelar checkout y continuar comprando
    When Voy al carrito de compras
    And Procedo al checkout
    When Cancelo el checkout
    Then Debo estar en la página del carrito
    When Continúo comprando
    Then Debo ser redirigido a la página de productos

  Scenario: Checkout solo con información parcial
    When Voy al carrito de compras
    And Procedo al checkout
    When Completo la información del checkout con nombre "Ana", apellido "" y código postal "67890"
    And Continúo al resumen del pedido
    Then Debo ver un mensaje de error "Error: Last Name is required" en el checkout
