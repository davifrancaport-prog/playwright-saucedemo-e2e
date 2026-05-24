export class CartPage {
  constructor(page) {
    this.page = page
    this.cartItems              = page.locator('.cart_item')
    this.checkoutButton         = page.locator('[data-test="checkout"]')
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]')
  }

  getRemoveButton(productName) {
    return this.page
      .locator('.cart_item')
      .filter({ hasText: productName })
      .locator('button')
  }

  async removeProduct(productName) {
    await this.getRemoveButton(productName).click()
  }

  async proceedToCheckout() {
    await this.checkoutButton.click()
  }
}
