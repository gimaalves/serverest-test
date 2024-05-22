/// <reference types="cypress" />
import CadastroPage from '../../support/pages/cadastro.page'

describe('Funcionalidade: Cadastro - Usando Page Objects', () => {
    
    beforeEach(() => {
        CadastroPage.visitarUrl()
    });

    it('Deve fazer cadastro de usuário admin com sucesso', () => {
        var email = `teste${Date.now()}@teste.com`
        CadastroPage.CadastroUsuarioAdmin('Nome Teste', email, 'teste')
        cy.get('.alert-link').should('contain', 'Cadastro realizado com sucesso')
        cy.get('.lead', { timeout: 10000 }).should('contain', 'Este é seu sistema para administrar seu ecommerce')
    });

    it('Deve fazer cadastro de usuário não admin com sucesso', () => {
        var email = `teste${Date.now()}@teste.com`
        CadastroPage.CadastroUsuarioNaoAdmin('Nome Teste', email, 'teste')
        cy.get('.alert-link').should('contain', 'Cadastro realizado com sucesso')
        cy.get('h1', { timeout: 10000 }).should('contain', 'Serverest Store')
    });
});