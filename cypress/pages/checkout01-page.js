export class CheckoutPage {
    constructor() {
        this.nameFld = () => cy.get('[data-test="firstName"]');
        this.emailFld = () => cy.get('[data-test="lastName"]');
        this.zipFld = () => cy.get('[data-test="postalCode"]');
        this.continueBtn = () => cy.get('[data-test="continue"]');
    }

    enterDetails(name, email, zip) {
        this.nameFld().type(name);
        this.emailFld().type(email);
        this.zipFld().type(zip);
    }

    submitOrder() {
        this.continueBtn().click();
    }

    validateSuccess() {
        cy.url().should('include', "/checkout-step-two.html")
    }
};
