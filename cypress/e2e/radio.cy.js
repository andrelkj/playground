describe("Radio Buttons", () => {
  beforeEach(() => {
    cy.goHome();

    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoggedIn();

    cy.goTo("/radio", "Radio Buttons");
  });

  it("Should check the framework used on the Cypress Skills course", () => {
    cy.contains("label", "Cypress").click();
  });
});
