describe('Tables', () => {
  beforeEach(() => {
    cy.goHome()
    cy.doLogin()
    cy.goTo('/tables', 'Tables')
  })

  it('Should validate the Github line', () => {
    cy.contains('table tbody tr', '1004')
      .should('be.visible')
      .and('contain', 'Github')
      .and('contain', 'papitodev')
      .and('contain', 'Ativo')
  })

  it('Should remove one social media', () => {
    const name = 'Facebook'

    cy.contains('table tbody tr', '1002').find('.remove-item').click()
    cy.contains('button', 'Excluir').click()

    cy.get('table tbody').should('not.contain', name)
  })

  it('Should social media should remain in the page after removal is canceled', () => {
    const name = 'Youtube'

    cy.contains('table tbody tr', '1005').find('.remove-item').click()
    cy.contains('button', 'Cancelar').click()

    cy.get('table tbody').should('contain', name)
  })
})
