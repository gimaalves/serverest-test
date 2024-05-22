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

    it('Deve realizar login com sucesso usando método customizado', () => {
        
        cy.login("teste11@teste.com", "teste")

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

    it('Validar link Cadastre-se na tela login', () => {
        
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.font-robot').should('contain', 'Cadastro')
    });

/*     it('Validar link "Recuperar senha" na tela login', () => {
        //Não tem esse link na tela de login
    }); */

    it.only('Deve realizar login com sucesso usando fixture', () => {
        
        cy.fixture('login').then((dadoslogin) => {
            cy.login(dadoslogin.email, dadoslogin.senha)
        })
        

        cy.get('h1').should('contain', 'Bem Vindo')
        cy.get('.lead').should('contain', 'Este é seu sistema para administrar seu ecommerce')
    });
});