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

Cypress.Commands.add('token', (urlBase, email, senha) => {
   cy.request({
      method: 'POST',
      url: urlBase + 'login',
      body:
      {
         "email": email,
         "password": senha
      }

   }).then((response) => {
      expect(response.status).to.be.equal(200)
      return response.body.authorization
   })

})

Cypress.Commands.add('cadastrarProduto', (urlBase, tkn) => {
   var produto = `Produto Teste ${Date.now()}`

   cy.request({
      method: 'POST',
      url: urlBase + 'produtos',
      body: {
         "nome": produto,
         "preco": 250,
         "descricao": "Mouse",
         "quantidade": 15
      },
      headers: {
         authorization: tkn

      }
   })

})