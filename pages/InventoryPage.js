export class InventoryPage {
  constructor(page) {
    this.page = page
    this.pageTitle          = page.locator('.title')
    this.productItems       = page.locator('.inventory_item')
    this.sortDropdown       = page.locator('[data-test="product-sort-container"]')
    this.shoppingCartBadge  = page.locator('.shopping_cart_badge')
    this.shoppingCartLink   = page.locator('.shopping_cart_link')
  }

  getAddToCartButton(productName) {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .locator('button')
  }

  getProductPrice(productName) {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .locator('.inventory_item_price')
  }

  async addProductToCart(productName) {
    await this.getAddToCartButton(productName).click()
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option)
  }

  async goToCart() {
    await this.shoppingCartLink.click()
  }
}
