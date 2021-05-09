// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('deleteDB', () => {
  cy.request('DELETE', 'http://localhost:3003/api/testing/reset')
})

Cypress.Commands.add('createUser', () => {
  const testUserData = {
    username: 'testUsername',
    password: 'testPassword',
    name: 'testName',
  }
  cy.request('POST', 'http://localhost:3003/api/users', testUserData)
})

Cypress.Commands.add('login', () => {
  const testUserData = {
    username: 'testUsername',
    password: 'testPassword',
    name: 'testName',
  }
  cy.request('POST', 'http://localhost:3003/api/login', {
    username: testUserData.username,
    password: testUserData.password,
  }).then((response) => {
    localStorage.setItem('loggedUser', JSON.stringify(response.body))
  })
})

Cypress.Commands.add('createBlog', () => {
  const sampleBlogData = {
    title: 'blogTitle',
    author: 'blogAuthor',
    url: 'blogURL',
  }
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { ...sampleBlogData },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })

})
