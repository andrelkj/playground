# Cypress

## Playground

This is a fictitial application for practice only, in here you'll find different fictitial functionalities such as login, input fields, checkbox, radio buttons, upload, date picker and others. this document is intended to clarify questions and provide best practices when using cypress for test automation.

### Best practices

Once we start to write automated testing we need to stick with some best practices so that we provide more confidence and create more assertive, clear and less flaky testing scenarios, you will find some best practices here:

#### Checkpoints

Checkpoints are verification points where you ensure the correct page is displayed or expected action took place prior to proceeding with any subsequent step:

```js
cy.visit('https://playground.cyskills.com.br')

cy.contains('h2', 'Faça login').should('be.visible') // checkpoint to ensure the redirection to the login page

cy.get('[data-cy="email"]').type('papito@cyskills.com.br')
cy.get('[data-cy="password"]').type('showtime')

cy.get('[data-cy="login-button"]').click()
```

**Note:** we only proceed to the next steps if the checkpoint is confirmed.

#### Hooks

Hooks are a way to avoid repeating code, in the examples below we are defining the viewport for each test cases individually:

```js
  it("Should login successfully", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://playground.cyskills.com.br");

    cy.contains("h2", "Faça login").should("be.visible");
    ...
    })

  it("Should not login with invalid password", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://playground.cyskills.com.br");

    cy.contains("h2", "Faça login").should("be.visible");
    ...
    })

  it("Should not login with unresgistered email", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://playground.cyskills.com.br");

    cy.contains("h2", "Faça login").should("be.visible");
    ...
    })

  it("Should not login with invalid email", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://playground.cyskills.com.br");

    cy.contains("h2", "Faça login").should("be.visible");
    ...
    })
```

A better approach is to use hook (e.g. `beforeEach` and `afterEach`) that will apply the action/behavior you want before or after each test cases, while also improving the code maintanance:

```js
describe("Login", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit("https://playground.cyskills.com.br");

        cy.contains("h2", "Faça login").should("be.visible");
    });

    it("Should login successfully", () => {
        cy.get('[data-cy="email"]').type("papito@cyskills.com.br");
        cy.get('[data-cy="password"]').type("showtime");
        ...
    })
})
```

**Note:** in addition to `beforeEach` and `afterEach` you can also use the `before` and the `after` hooks to apply specific bahaviors one time only before or after all the test cases are executed.

#### Custom commands

Custom commands are really useful when working with repetitive scenarios where the data is the only difference. One example is the login suite, where the form submission repeats itself for each test case:

```js
  it("Should login successfully", () => {
    cy.get('[data-cy="email"]').type("papito@cyskills.com.br");
    cy.get('[data-cy="password"]').type("showtime");

    cy.get('[data-cy="login-button"]').click();
    ...
  });
```

The approach using custom commands require the following steps:

1. Create a cypress command function:

   ```js
   Cypress.Commands.add('login', (email, password) => {
     cy.get('[data-cy="email"]').type(email)
     cy.get('[data-cy="password"]').type(password)

     cy.get('[data-cy="login-button"]').click()
   })
   ```

2. Replace test case steps with the custom command and it's required arguments:

   ```js
   it("Should login successfully" => {
       cy.login("papito@cyskills.com.br", "showtime")
       ...
   });
   ```

3. Provide maintenance to the custom command whenever changes are made to the locators.

Following these steps you should be able to successfully implement custom command that you can reuse throughout your tests.

#### Regular expressions

It is quite common to have similar values, names or expressions in HTML which can cause flaky locators when using the contains method (e.g. Java and Javascript where both contain the sentence Java). Regex is really helpful in this scenario by specifying the start and end of the sentence and giving more assertivity to your expression:

```js
it.only('Should select all language options that uses Node.js', () => {
  const langs = ['JavaScript', 'TypeScript']

  cy.get('input[placeholder^="Linguagens de programação"]').click()

  langs.forEach((lang) => {
    cy.contains('.option-item', new RegExp('^' + lang + '$')).click() // RegExp specifying the start and the end of the sentence
  })
})
```

**Note:** by specifying the start (^) and the end ($) of the sentence you now can differentiate Java from Javascript even when using the contains method.

#### Intercept

Cypress can intercept API requests made during the test execution, which is very useful to validate the requests status and responses during the execution, and also send mock information as well:

```js
const address = {
  cep: '04534011',
  logradouro: 'Rua Joaquim Floriano',
  localidade: 'São Paulo',
  uf: 'SP',
}

cy.intercept('GET', `https://viacep.com.br/ws/${address.cep}/json/`, {
  statusCode: 200,
  body: address,
}).as('getCep')
```

**Note:** intercept method comes up handy when an external api break and you need to validate the response for specific sets of data that you could mock.

### Tips and tricks

#### Covered elements

It is common to use styling elements instead of the generic html component itself, although it can cause some elements (e.g. checkboxes) to be covered or became unclicable when using Cypress:

```
Timed out retrying after 4050ms: cy.click() failed because this element:

<input type="checkbox" id="javascript" name="javascript" class="sr-only" value="1">

is being covered by another element:

<div class="flex flex-col gap-5.5 p-6.5">...</div>

Fix this problem, or use {force: true} to disable error checking.Learn more
cypress/e2e/checkbox.cy.js:12:30
  10 |     cy.goTo("/checkbox", "Checkbox");
  11 |
> 12 |     cy.get("input[value=1]").click();
     |                              ^
  13 |   });
  14 | });
  15 |
```

**Note:** Cypress itself provides a possible solution by adding the `{ force: true }` argument to the click event, which will force the click even if the element is identified as covered.

Another approach is to use the `.parent()` function to get the neares parent element of the initial locator and then perform the click on it:

- File [checkbox.cy.js](/cypress/e2e/checkbox.cy.js)

  ```js
  ...

  cy.goTo("/checkbox", "Checkbox");

  cy.get("input[value=1]").parent().click();

  ...
  ```

- HTML content

  ```html
  <label for="javascript" class="flex cursor-pointer select-none items-center">
    <!-- Nearest parent to perform the click -->
    <div class="relative">
      <!-- Initial locator -->
      <input
        type="checkbox"
        id="javascript"
        name="javascript"
        class="sr-only"
        value="1"
      />
      ...
    </div></label
  >
  ```

**Note:** In case the whole label is clickable you can use the `label[for="javascript"]` locator instead.

#### Finding elements by parent and label

It is common to face bad or no locators at all when creating automated tests:

```html
<div>
  <!-- Parent label with good locator -->
  <label class="mb-3 block text-black dark:text-white"
    >Selecione um Framework de Testes</label
  >
  <div class="relative z-20 bg-gray dark:bg-form-input">
    <span class="absolute top-1/2 left-4 z-30 -translate-y-1/2"
      ><svg></svg></span
    ><!-- Poor selector without usefull locators -->
    <select
      class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white"
    ></select>
  </div>
</div>
```

When facing these difficult locators you can use the `parent()` function combined with the `filter()` method to create unique locators:

```js
it('Should select Cypress as the framework option', () => {
  cy.contains('label', 'Selecione um Framework de Testes')
    .parent()
    .find('select')
    .select('Cypress')
})
```

**Note:** initially we had 14 found elements for the select locator, but by filtering by the parent label we only found 1.

#### Validate uploaded documents

When validating the functionality of uploading documents in an input field you should also check if the attached document is the one you expect, one way to do that is by using the `then()` method after the upload is executed:

```js
it('Should attach a document', () => {
  cy.get('input[name="doc"]')
    .selectFile('cypress/fixtures/doc.pdf')
    .then((element) => {
      //refers back to the initial input element
      expect(element[0].files[0].name).to.equal('doc.pdf')
    })
})
```

**Note:** when using the then method the argument defined is a reference to the initial element with which you started the interaction (aka `input[name="doc"]` in this example).

#### Validate uploaded images

When validating the functionality of uploading images in an input field you should also check if the attached image is the one you expect, using the then method as for the uploaded documents.

In addition to that ideally you should validate if the image is visible, if the source link is present within the element and also, in case a preview is displayed, you can check if the image source contain blob attribute:

```js
it.only("Should attach an image", () => {
  ...
  cy.get("#image-upload")
    .find("img")
    .should("be.visible")
    .should("have.attr", "src")
    .and("include", "blob");
});
```

**Note:** the blob attribute is present to indicate that a preview is being rendered in the page and the user should be able to visialize this image preview.

#### Perform keyboard actions

Sometimes when working with input elements such as tags or auto-generated suggestions (e.g. address) you'll need to perform keyboard actions in addition to the fulfiling the field (e.g. pressing enter to register a tag), in this case you can specify the key you want to press using `{Enter}` in combination to the text you want to type:

```js
it('should add some tags', () => {
  cy.get('.new-tag').type('Cypress{Enter}') // type Cypress and press the enter key
})
```

#### Thinking time

The main purpose of building automated tests is to validate user workflows, considering that it good to consider adding some waiting time to mimic the users thinking time before performing the action (e.g. adding multiple tags):

```js
it('should add some tags', () => {
  const tags = ['Cypress', 'Javascript', 'NodeJS']

  tags.forEach((tag) => {
    cy.get('.new-tag').type(`${tag}{Enter}`)
    cy.wait(500) // thinking time
  })
})
```

**Note:** this is optional but can provide a closest relation of the actual users interaction with the page.
