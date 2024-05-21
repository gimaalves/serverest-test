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

Cypress.Commands.add('login', (email, password) => { 
    cy.visit('login')
    cy.get('[data-testid="email"]').clear().type(email)
    cy.get('[data-testid="senha"]').clear().type(password)
    cy.get('[data-testid="entrar"]').click()
    cy.wait(2000)
 })

 Cypress.Commands.add('cadastroUsuarioAdmin', (nome, email, password) => { 
    cy.visit('cadastrarusuarios')
    cy.get('[data-testid="nome"]').clear().type(nome)
    cy.get('[data-testid="email"]').clear().type(email)
    cy.get('[data-testid="password"]').clear().type(password)
    cy.get('[data-testid="checkbox"]').check()
    cy.get('[data-testid="cadastrar"]').click()
 })

 Cypress.Commands.add('cadastroUsuarioNaoAdmin', (nome, email, password) => { 
    cy.visit('cadastrarusuarios')
    cy.get('[data-testid="nome"]').clear().type(nome)
    cy.get('[data-testid="email"]').clear().type(email)
    cy.get('[data-testid="password"]').clear().type(password)
    cy.get('[data-testid="cadastrar"]').click()
 })