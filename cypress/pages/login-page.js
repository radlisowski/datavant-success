export class LoginPage {
    constructor() {
        this.loginUsernameFld = ()=> cy.get('#user-name');
        this.loginPasswordFld = ()=> cy.get('#password');
        this.loginButton = ()=> cy.get('#login-button');
        this.loginUrl = 'https://www.saucedemo.com/';
        this.errorMessage = () => cy.get('.error-message-container');
    }
    visit() {
        cy.visit(this.loginUrl);
    }

    login(username, password) {
        this.loginUsernameFld().type(username);
        this.loginPasswordFld().type(password);
        this.loginButton().click();
    }

    verifyLogin() {
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('contain', 'Products');
    }

    verifyInvalidLogin() {
        this.errorMessage().should('be.visible');
        this.errorMessage().should('contain', 'Epic sadface: Username and password do not match any user in this service');
    }
}