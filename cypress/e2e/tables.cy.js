describe('Tables', () => {
  beforeEach(() => {
    cy.goHome()

    cy.login('papito@cyskills.com.br', 'showtime')
    cy.userLoggedIn()

    cy.goTo('/tables', 'Tables')
  })

  it('Should validate the Github line', () => {
    cy.contains('table tbody tr', '1004')
      .should('be.visible')
      .and('contain', 'Github')
      .and('contain', 'papitodev')
      .and('contain', 'Ativo')
  })
})
