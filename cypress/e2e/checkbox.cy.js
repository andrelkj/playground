describe('Checkbox', () => {
  beforeEach(() => {
    cy.goHome()
    cy.doLogin()
    cy.goTo('/checkbox', 'Checkbox')
  })

  it('Should check mark languages that use Node.js', () => {
    cy.get('label[for="javascript"]').click()
    cy.get('label[for="typescript"]').click()
  })

  it('Should check mark all options', () => {
    const langs = ['javascript', 'python', 'rust', 'go', 'typescript']

    langs.forEach((lang) => {
      cy.get(`label[for=${lang}]`).click()
    })
  })
})
