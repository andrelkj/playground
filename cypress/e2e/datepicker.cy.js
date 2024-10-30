describe('Date Picker', () => {
  beforeEach(() => {
    cy.goHome()
    cy.doLogin()
    cy.goTo('/date-picker', 'Date Picker')
  })

  it('Should add my birth date', () => {
    cy.get('input[placeholder="Escolha uma data"][readonly]').click()

    cy.get('select[aria-label="Month"]').select('Junho')
    cy.get('input[aria-label="Year"]').type('1997')

    cy.get('span[aria-label="Junho 30, 1997"]').click()
  })
})
