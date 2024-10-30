describe('CEP', () => {
  beforeEach(() => {
    cy.goHome()
    cy.doLogin()
    cy.goTo('/cep', 'CEP (API dos Correios)')
  })

  it('Should register an address using post offices API', () => {
    cy.get('input[name="cep"').type('04534011')
    cy.contains('button', 'Cadastrar').click()

    cy.get('input[name="logradouro"]', { timeout: 7000 }).should(
      'have.value',
      'Rua Joaquim Floriano'
    )

    cy.get('input[name="cidade"]').should('have.value', 'São Paulo')

    cy.get('input[name="estado"]').should('have.value', 'SP')
  })
})
