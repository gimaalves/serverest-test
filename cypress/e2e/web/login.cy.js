/// <reference types="cypress" />

describe('Funcionalidade login', () => {
    
    beforeEach(() => {
        //executa antes de cada cenário
        cy.visit('login')
    });

    afterEach(() => {
        //executa depois de cada cenário
        cy.screenshot()
    });

    it('Deve realizar login com sucesso', () => {
        
        //realiza login
        cy.get('[data-testid="email"]').clear().type('teste1717011470864@teste.com')
        cy.get('[data-testid="senha"]').clear().type('teste')
        cy.get('[data-testid="entrar"]').click()
        
        //valida apresentação de tela inicial após login
        cy.get('h1', {timeout: 10000}).should('contain', 'Bem Vindo')
        cy.get('.lead', {timeout: 10000}).should('contain', 'Este é seu sistema para administrar seu ecommerce')
    });

    it('Deve realizar login com sucesso usando método customizado', () => {

        //login customizado
        cy.login("teste1717011470864@teste.com", "teste")

        //valida apresentação de tela inicial após login
        cy.get('h1', {timeout: 10000}).should('contain', 'Bem Vindo')
        cy.get('.lead', {timeout: 10000}).should('contain', 'Este é seu sistema para administrar seu ecommerce')
    });

    it('Deve validar usuário inválido', () => {
        
        //tenta fazer login
        cy.get('[data-testid="email"]').clear().type('testerdsdf3434@hotmail.com')
        cy.get('[data-testid="senha"]').clear().type('teste')
        cy.get('[data-testid="entrar"]').click()

        //valida alerta de email ou usuario invalido
        cy.get('.alert', {timeout: 10000}).should('contain', 'Email e/ou senha inválidos')

    });

    it('Deve validar mensagem de senha inválida', () => {
        
        //tenta fazer login
        cy.get('[data-testid="email"]').clear().type('Matt94@hotmail.com')
        cy.get('[data-testid="senha"]').clear().type('teste123')
        cy.get('[data-testid="entrar"]').click()

        //valida alerta de email ou usuario invalido
        cy.get('.alert', {timeout: 10000}).should('contain', 'Email e/ou senha inválidos')
    });

    it('Validar link Cadastre-se na tela login', () => {
        
        //acessar o link Cadastre-se
        cy.get('[data-testid="cadastrar"]').click()

        //valida se tela de cadastro apresentada
        cy.get('.font-robot', {timeout: 10000}).should('contain', 'Cadastro')
    });

    it('Deve realizar login com sucesso usando fixture', () => {
        
        //realiza login
        cy.fixture('login').then((dadoslogin) => {
            cy.login(dadoslogin.email, dadoslogin.senha)
        })

        //valida apresentação de tela inicial após login
        cy.get('h1', {timeout: 10000}).should('contain', 'Bem Vindo')
        cy.get('.lead', {timeout: 10000}).should('contain', 'Este é seu sistema para administrar seu ecommerce')
    });
});