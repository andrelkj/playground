describe("Upload", () => {
  beforeEach(() => {
    cy.goHome();

    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoggedIn();

    cy.goTo("/upload", "Upload");
  });

  it("Should attach a document", () => {
    cy.get('input[name="doc"]')
      .selectFile("cypress/fixtures/doc.pdf")
      .then((element) => {
        expect(element[0].files[0].name).to.equal("doc.pdf");
      });
  });

  it.only("Should attach an image", () => {
    cy.get('input[name="photo"]')
      .selectFile("cypress/fixtures/liga.jpg")
      .then((element) => {
        expect(element[0].files[0].name).to.equal("liga.jpg");
      });

    cy.get("#image-upload")
      .find("img")
      .should("be.visible")
      .should("have.attr", "src")
      .and("include", "blob");
  });
});
