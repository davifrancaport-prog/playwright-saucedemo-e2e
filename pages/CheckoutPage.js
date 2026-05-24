export class CheckoutPage {
  constructor(page) {
    this.page = page
    this.firstNameInput      = page.locator('[data-test="firstName"]')
    this.lastNameInput       = page.locator('[data-test="lastName"]')
    this.postalCodeInput     = page.locator('[data-test="postalCode"]')
    this.continueButton      = page.locator('[data-test="continue"]')
    this.finishButton        = page.locator('[data-test="finish"]')
    this.confirmationHeader  = page.locator('.complete-header')
    this.errorMessage        = page.locator('[data-test="error"]')
    this.summaryTotal        = page.locator('.summary_total_label')
  }

  async fillPersonalInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.postalCodeInput.fill(postalCode)
  }

  async continue() {
    await this.continueButton.click()
  }

  async finish() {
    await this.finishButton.click()
  }
}
