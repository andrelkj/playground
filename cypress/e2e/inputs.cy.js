describe('Input Fields', () => {
  beforeEach(() => {
    cy.goHome()
    cy.doLogin()
    cy.goTo('/input-fields', 'Input Fields')
  })

  it('Should fill the text input field', () => {
    cy.get('input[placeholder="John Doe"]').type('André Kreutzer')
    cy.get('input[name="email"]').type('customer@test.com')
    cy.get('[data-cy="number"]').type('123456')
    cy.get('input[name="date"]').type('2024-10-27')
  })
})
