Feature: Caso de uso Login
  como usuario del sistema
  Quiero poder iniciar sesión con credenciales válidas
  Para que pueda acceder a la página de productos

  Background:
    Given Me encuentro en la pagina de Sauce Demo

  Scenario: Login Ok con credenciales válidas
    When Ingreso con usuario "standard_user" y contraseña "secret_sauce"
    Then Debo ser redirigido a la página de productos
    And Debo ver el título de los productos   

  Scenario: Login Fallido con mensaje Epic sadface: Sorry, this user has been locked out.
    When Ingreso con usuario "locked_out_user" y contraseña "secret_sauce"
    Then Debo ver un mensaje de error "Epic sadface: Sorry, this user has been locked out."
    And Debo permanecer en la página de inicio de sesión

  Scenario: Login Fallido con credenciales inválidas
    When Ingreso con usuario "invalid_user" y contraseña "wrong_password"
    Then Debo ver un mensaje de error que contenga "Username and password do not match"
    And Debo permanecer en la página de inicio de sesión