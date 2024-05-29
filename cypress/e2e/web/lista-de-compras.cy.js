/// <reference types="cypress" />

describe('Funcionalidade: Lista de compras', () => {
    
    //faz login antes de cada teste
    beforeEach(() => {  
        var email = `teste${Date.now()}@teste.com`

        //cadastra novo usuário e faz login
        cy.cadastroUsuarioAdmin("Nome Teste", email, "teste")
        cy.get('h1', {timeout: 10000}).should('contain', 'Bem Vindo')
        cy.get('.lead', {timeout: 10000}).should('contain', 'Este é seu sistema para administrar seu ecommerce')
    });

    it('Validar acesso a lista de compras', () => {

        //acessa a lista de compras
        cy.visit('minhaListaDeProdutos')

        //valida se lista de compras apresentada
        cy.get('h1', {timeout: 10000}).should('contain', 'Lista de Compras')
        cy.url().should('contain', 'minhaListaDeProdutos')
    });
});