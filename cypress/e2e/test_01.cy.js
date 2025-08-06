import { LoginPage } from '..//pages/login-page.js';
import { ProductsPage } from '../pages/products-page.js';
import { CartPage } from '../pages/cart-page.js';
import { CheckoutPage } from '../pages/checkout01-page.js';

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

describe('logs in to the page', () => {
  beforeEach(() => {
    cy.pause();
    cy.viewport(1280, 720);
    loginPage.visit();
  });
  it('can log in', () => {
    loginPage.login(
      Cypress.env("LOGIN_USERNAME"),
      Cypress.env("LOGIN_PASSWORD")
    );

    loginPage.verifyLogin();
  })

  it('can not log in with invalid username', () => {
    loginPage.login(
      Cypress.env("INVALID_LOGIN_USERNAME"),
      Cypress.env("INVALID_LOGIN_PASSWORD")
    );
    loginPage.verifyInvalidLogin();
  })

  it('can not log in with invalid password', () => {
    loginPage.login(
      Cypress.env("LOGIN_USERNAME"),
      Cypress.env("INVALID_LOGIN_PASSWORD")
    );
    loginPage.verifyInvalidLogin();
  })
})

describe('loggining in and checking out 2 items', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    loginPage.visit();
    loginPage.login(
      Cypress.env("LOGIN_USERNAME"),
      Cypress.env("LOGIN_PASSWORD")
    );
    loginPage.verifyLogin();
  });

  it('can add two items to the cart and check out', () => {
    productsPage.sortItemsBy('Price (low to high)');
    productsPage.addFirstItemOnTheListToCart();
    productsPage.sortItemsBy('Price (high to low)');
    productsPage.addFirstItemOnTheListToCart();
    productsPage.verifyCartItemCount(2);
    productsPage.verifyCartIconItemcount(2);
    productsPage.verifyCartItems(productsPage.selectedItems);

    cartPage.getItemsPrice();
    cartPage.selectCheckout();
    checkoutPage.enterDetails(
      Cypress.env("NAME"),
      Cypress.env("EMAIL"),
      Cypress.env("ZIP")
    );
    checkoutPage.submitOrder();
    checkoutPage.validateSuccess();


  });
})