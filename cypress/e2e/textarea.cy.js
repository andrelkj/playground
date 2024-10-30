describe('Textarea', () => {
  beforeEach(() => {
    cy.goHome()
    cy.doLogin()
    cy.goTo('/textarea', 'Textarea')
  })

  it('Should fill text area field', () => {
    cy.get('textarea[name="message"]').type(
      'Welcome to Cypress Skills. A complete course build for you to learn test automation with Cypress.'
    )
  })
})
