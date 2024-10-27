# Cypress

## Playground

This is a fictitial application for practice only, in here you'll find different fictitial functionalities such as login, input fields, checkbox, radio buttons, upload, date picker and others. this document is intended to clarify questions and provide best practices when using cypress for test automation.

### Best practices

Once we start to write automated testing we need to stick with some best practices so that we provide more confidence and create more assertive, clear and less flaky testing scenarios, you will find some best practices here:

#### Checkpoints

Checkpoints are verification points where you ensure the correct page is displayed or expected action took place prior to proceeding with any subsequent step:

```js
    ...
    cy.visit("https://playground.cyskills.com.br");

    cy.contains("h2", "Faça login").should("be.visible"); // checkpoint to ensure the redirection to the login page

    cy.get('[data-cy="email"]').type("papito@cyskills.com.br");
    cy.get('[data-cy="password"]').type("showtime");

    cy.get('[data-cy="login-button"]').click();
    ...
```

**Note:** we only proceed to the next steps if the checkpoint is confirmed.
