import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import { InventoryPage } from '../pages/InventoryPage.js'
import users from '../fixtures/users.json' assert { type: 'json' }

test.describe('Inventário de Produtos', () => {
  let inventoryPage

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.visit()
    await loginPage.login(users.validUser.username, users.validUser.password)
    inventoryPage = new InventoryPage(page)
  })

  test('deve exibir o título da página de inventário', async () => {
    await expect(inventoryPage.pageTitle).toHaveText('Products')
  })

  test('deve listar 6 produtos', async () => {
    await expect(inventoryPage.productItems).toHaveCount(6)
  })

  test('deve ordenar produtos de A a Z', async () => {
    await inventoryPage.sortBy('az')
    const firstName = inventoryPage.productItems.first().locator('.inventory_item_name')
    await expect(firstName).toHaveText('Sauce Labs Backpack')
  })

  test('deve ordenar produtos por menor preço', async () => {
    await inventoryPage.sortBy('lohi')
    const firstPrice = await inventoryPage.productItems
      .first()
      .locator('.inventory_item_price')
      .innerText()
    expect(parseFloat(firstPrice.replace('$', ''))).toBeLessThan(10)
  })

  test('deve atualizar badge do carrinho ao adicionar produto', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack')
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1')
  })
})
