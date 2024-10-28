describe("Input Fields", () => {
  beforeEach(() => {
    cy.goHome();
  });

  it("should fill the text input field", () => {
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoggedIn();

    cy.get('nav a[href="/input-fields"]').click();
    cy.contains("h2", "Input Fields").should("be.visible");

    cy.get('input[placeholder="John Doe"]').type("André Kreutzer");
    cy.get('input[name="email"]').type("customer@test.com")
    cy.get('[data-cy="number"]').type("123456")
    cy.get('input[name="date"]').type("2024-10-27")
  });
});