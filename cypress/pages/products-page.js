export class ProductsPage {
    constructor() {
        this.sortItems = () => cy.get('.product_sort_container');
        this.productList = () => cy.get('.inventory_list');
        this.productItem = (itemName) => cy.get('.inventory_item').contains(itemName);
        this.cartIcon = () => cy.get('.shopping_cart_link');
        this.cartItemCount = () => cy.get('.shopping_cart_badge');
        this.selectedItems = []
        this.selectedItemsCount = () => this.selectedItems.length;
    }



    sortItemsBy(option) {
        this.sortItems().select(option);
    }

    addFirstItemOnTheListToCart() {
        this.productList()
            .find('[data-test="inventory-item-name"]')
            .first()
            .invoke('text')
            .then((itemName) => {
                this.selectedItems.push(itemName.trim());
                cy.log(`Adding item to cart: ${itemName.trim()}`);
            });
        this.productList().find('[data-test="inventory-item"]').first().find('button.btn').click();
    }

    verifyCartItemCount(expectedCount) {
        this.cartItemCount().should('have.text', expectedCount.toString());
        cy.log(`Cart item count verified: ${expectedCount}`);
    }

    verifyCartIconItemcount(expectedCount) {
        this.cartIcon().should('have.text', expectedCount.toString());
        cy.log(`Cart icon item count verified: ${expectedCount}`);
    }

    verifyCartItems(expectedItems) {
        this.cartIcon().click();
        cy.get('[data-test="inventory-item"]').each(($product, index)=>{
            const productName = $product.find('[data-test="inventory-item-name"]').text().trim();
            cy.wrap(productName).should('equal', expectedItems[index]);
        })
    }
}