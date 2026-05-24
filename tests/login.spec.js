import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import users from '../fixtures/users.json' assert { type: 'json' }

test.describe('Login', () => {
  let loginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.visit()
  })

  test('deve fazer login com usuário válido', async ({ page }) => {
    await loginPage.login(users.validUser.username, users.validUser.password)
    await expect(page).toHaveURL(/inventory/)
  })

  test('deve exibir erro com credenciais inválidas', async () => {
    await loginPage.login(users.invalidUser.username, users.invalidUser.password)
    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toContainText('Username and password do not match')
  })

  test('deve exibir erro para usuário bloqueado', async () => {
    await loginPage.login(users.lockedUser.username, users.lockedUser.password)
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out')
  })

  test('deve exibir erro ao enviar formulário vazio', async () => {
    await loginPage.submit()
    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toContainText('Username is required')
  })
})
