/// <reference types="cypress" />

describe('Funcionalidade: Cadastro', () => {
   
    beforeEach(() => {
        cy.visit('cadastrarusuarios')
    });

    it('Deve realizar cadastro com sucesso', () => {
        cy.get('[data-testid="nome"]').clear().type('nometeste')
        cy.get('[data-testid="email"]').clear().type('teste2@teste.com')
        cy.get('[data-testid="password"]').clear().type('teste1')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert-link').should('contain', 'Cadastro realizado com sucesso')
    });
});