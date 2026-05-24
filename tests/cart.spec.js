import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import { InventoryPage } from '../pages/InventoryPage.js'
import { CartPage } from '../pages/CartPage.js'
import users from '../fixtures/users.json' assert { type: 'json' }

test.describe('Carrinho de Compras', () => {
  let inventoryPage
  let cartPage

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.visit()
    await loginPage.login(users.validUser.username, users.validUser.password)
    inventoryPage = new InventoryPage(page)
    cartPage = new CartPage(page)
  })

  test('deve adicionar um produto ao carrinho', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack')
    await inventoryPage.goToCart()
    await expect(cartPage.cartItems).toHaveCount(1)
    await expect(cartPage.cartItems.first()).toContainText('Sauce Labs Backpack')
  })

  test('deve adicionar múltiplos produtos ao carrinho', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack')
    await inventoryPage.addProductToCart('Sauce Labs Bike Light')
    await inventoryPage.goToCart()
    await expect(cartPage.cartItems).toHaveCount(2)
  })

  test('deve remover produto do carrinho', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack')
    await inventoryPage.goToCart()
    await cartPage.removeProduct('Sauce Labs Backpack')
    await expect(cartPage.cartItems).toHaveCount(0)
  })
})
