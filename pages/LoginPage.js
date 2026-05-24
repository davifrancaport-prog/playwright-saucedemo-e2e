export class LoginPage {
  constructor(page) {
    this.page = page
    this.usernameInput = page.locator('#user-name')
    this.passwordInput = page.locator('#password')
    this.loginButton   = page.locator('#login-button')
    this.errorMessage  = page.locator('[data-test="error"]')
  }

  async visit() {
    await this.page.goto('/')
  }

  async fillUsername(username) {
    await this.usernameInput.fill(username)
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password)
  }

  async submit() {
    await this.loginButton.click()
  }

  async login(username, password) {
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.submit()
  }
}
