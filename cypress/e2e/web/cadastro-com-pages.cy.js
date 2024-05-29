/// <reference types="cypress" />
import CadastroPage from '../../support/pages/cadastro.page'

describe('Funcionalidade: Cadastro - Usando Page Objects', () => {
    
    beforeEach(() => {
        //acessa tela de cadastro de usuários
        CadastroPage.visitarUrl()
    });

    it('Deve fazer cadastro de usuário admin com sucesso', () => {
        let email = `teste${Date.now()}@teste.com`

        //realiza cadastro de usuário admin
        CadastroPage.CadastroUsuarioAdmin('Nome Teste', email, 'teste')

        //valida se cadastro com sucesso
        cy.get('.alert-link', { timeout: 10000 }).should('contain', 'Cadastro realizado com sucesso')
        cy.get('.lead', { timeout: 10000 }).should('contain', 'Este é seu sistema para administrar seu ecommerce')
    });

    it('Deve fazer cadastro de usuário não admin com sucesso', () => {
        var email = `teste${Date.now()}@teste.com`

        //realiza cadastro de usuário não admin
        CadastroPage.CadastroUsuarioNaoAdmin('Nome Teste', email, 'teste')

        //valida se cadastro com sucesso
        cy.get('.alert-link').should('contain', 'Cadastro realizado com sucesso')
        cy.get('h1', { timeout: 10000 }).should('contain', 'Serverest Store')
    });
});