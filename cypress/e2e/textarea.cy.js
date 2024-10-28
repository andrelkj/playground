describe("Textarea", () => {
  beforeEach(() => {
    cy.goHome();
  });

  it("Should fill text area field", () => {
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoggedIn();

    cy.goTo("/textarea", "Textarea");

    cy.get('textarea[name="message"]').type(
      "Welcome to Cypress Skills. A complete course build for you to learn test automation with Cypress."
    );
  });
});
