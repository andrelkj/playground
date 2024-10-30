describe('Tags', () => {
  beforeEach(() => {
    cy.goHome()
    cy.doLogin()
    cy.goTo('/tags', 'Tags')
  })

  it('Should add some tags', () => {
    const tags = ['Cypress', 'Javascript', 'NodeJS']

    tags.forEach((tag) => {
      cy.get('.new-tag').type(`${tag}{Enter}`).should('have.value', '')
      cy.wait(500) // thinking time
    })

    tags.forEach((tag) => {
      cy.get('.tag-input').should('contain', tag)
    })
  })
})
