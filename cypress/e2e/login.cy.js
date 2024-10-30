describe('Login', () => {
  beforeEach(() => {
    cy.goHome()
  })

  it('Should login successfully', () => {
    cy.login('papito@cyskills.com.br', 'showtime')
    cy.userLoggedIn()
  })

  it('Should not login with invalid password', () => {
    cy.login('papito@cyskills.com.br', 'abc123456')
    cy.noticeHave('E-mail ou senha incorretos. Por favor, tente novamente!')
  })

  it('Should not login with unresgistered email', () => {
    cy.login('404@cyskills.com.br', 'abc123456')
    cy.noticeHave('E-mail ou senha incorretos. Por favor, tente novamente!')
  })

  it('Should not login with invalid email', () => {
    cy.login('www.cyskills.com.br', 'abc123456')
    cy.noticeHave(
      'O formato do e-mail está incorreto. Por favor, verifique e tente novamente!'
    )
  })

  it('Should not login without email', () => {
    cy.login(null, 'abc123456')
    cy.noticeHave('Parece que você esqueceu de informar seu e-mail.')
  })

  it('Should not login without password', () => {
    cy.login('papito@cyskills.com.br', null)
    cy.noticeHave('Por favor, digite sua senha para continuar.')
  })
})
