describe('Select', () => {
  beforeEach(() => {
    cy.goHome()
    cy.doLogin()
    cy.goTo('/select', 'Select')
  })

  it('Should select Cypress as the framework option', () => {
    cy.contains('label', 'Selecione um Framework de Testes')
      .parent()
      .find('select')
      .select('Cypress')
  })

  it('Should select all language options that uses Node.js', () => {
    const langs = ['JavaScript', 'TypeScript']

    cy.get('input[placeholder^="Linguagens de programação"]').click()

    langs.forEach((lang) => {
      cy.contains('.option-item', new RegExp('^' + lang + '$')).click()
    })

    cy.get('.language-item').should('have.length', langs.length)
  })
})
