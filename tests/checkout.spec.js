import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import { InventoryPage } from '../pages/InventoryPage.js'
import { CartPage } from '../pages/CartPage.js'
import { CheckoutPage } from '../pages/CheckoutPage.js'
import users from '../fixtures/users.json' assert { type: 'json' }

test.describe('Checkout', () => {
  let checkoutPage

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.visit()
    await loginPage.login(users.validUser.username, users.validUser.password)

    const inventoryPage = new InventoryPage(page)
    await inventoryPage.addProductToCart('Sauce Labs Backpack')
    await inventoryPage.goToCart()

    const cartPage = new CartPage(page)
    await cartPage.proceedToCheckout()

    checkoutPage = new CheckoutPage(page)
  })

  test('deve completar o checkout com sucesso', async () => {
    await checkoutPage.fillPersonalInfo(
      users.checkoutInfo.firstName,
      users.checkoutInfo.lastName,
      users.checkoutInfo.postalCode
    )
    await checkoutPage.continue()
    await expect(checkoutPage.summaryTotal).toBeVisible()
    await checkoutPage.finish()
    await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!')
  })

  test('deve exibir erro ao continuar sem preencher os campos', async () => {
    await checkoutPage.continue()
    await expect(checkoutPage.errorMessage).toBeVisible()
    await expect(checkoutPage.errorMessage).toContainText('First Name is required')
  })

  test('deve exibir o valor total do pedido na página de revisão', async () => {
    await checkoutPage.fillPersonalInfo(
      users.checkoutInfo.firstName,
      users.checkoutInfo.lastName,
      users.checkoutInfo.postalCode
    )
    await checkoutPage.continue()
    const totalText = await checkoutPage.summaryTotal.innerText()
    expect(totalText).toContain('$')
  })
})
