describe('Iframe', () => {
  beforeEach(() => {
    cy.goHome()
    cy.doLogin()
    cy.goTo('/iframe', 'IFrame')
  })

  it('Should fill the name in a page with IFrame', () => {
    cy.get('[data-cy="iframe-inputs"]').then(($iframe) => {
      const $body = $iframe.contents().find('body')

      cy.wrap($body).find('#fullname').type('André Kreutzer')
    })
  })
})
