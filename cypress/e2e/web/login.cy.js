/// <reference types="cypress" />

describe('Funcionalidade login', () => {
    
    before(() => {
        //faz algo antes de todos os cenários
    });

    beforeEach(() => {
        //faz algo antes de cada cenário
        cy.visit('login')
    });

    afterEach(() => {
        //faz algo depois de cada cenário
        cy.screenshot()
    });

    after(() => {
        //faz algo depois de todos os cenários
    });

    it('Deve realizar login com sucesso', () => {
        
        //clear() para limpar o campo antes de digitar novo conteúdo
        cy.get('[data-testid="email"]').clear().type('Matt94@hotmail.com')
        cy.get('[data-testid="senha"]').clear().type('teste')
        cy.get('[data-testid="entrar"]').click()
        cy.get('h1').should('contain', 'Bem Vindo')
        cy.get('.lead').should('contain', 'Este é seu sistema para administrar seu ecommerce')
    });

    //it.only para executar apenas o cenário em construção
    it('Deve validar usuário inválido', () => {
        
        cy.get('[data-testid="email"]').clear().type('teste@hotmail.com')
        cy.get('[data-testid="senha"]').clear().type('teste')
        cy.get('[data-testid="entrar"]').click()
        cy.get('.alert').should('contain', 'Email e/ou senha inválidos')

    });

    it('Deve validar mensagem de senha inválida', () => {
        
        cy.get('[data-testid="email"]').clear().type('Matt94@hotmail.com')
        cy.get('[data-testid="senha"]').clear().type('teste123')
        cy.get('[data-testid="entrar"]').click()
        cy.get('.alert').should('contain', 'Email e/ou senha inválidos')
    });
});