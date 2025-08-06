export class CartPage {
    constructor() {
        this.cartItems = () => cy.get('.cart_item');
        this.checkoutButton = () => cy.get('.checkout_button');
        this.totalPrice = '';
    }

    verifyCartItemCount(count) {
        this.cartItems().should('have.length', count);
    }

    selectCheckout() {
        this.checkoutButton().click();
    }

    getItemsPrice() {
        this.cartItems().each(($item) => {
            const price = $item.find('.item_price').text();
            cy.log(`Item price: ${price}`);
            this.totalPrice += parseFloat(price.replace('$', ''));
        });
    }
}