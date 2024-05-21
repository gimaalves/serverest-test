/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Cadastro', () => {
   
    beforeEach(() => {
        cy.visit('cadastrarusuarios')
    });

    it('Deve realizar cadastro com sucesso (usando Datenow)', () => {
        var email = 'teste' + Date.now() + '@teste.com'

        cy.get('[data-testid="nome"]').clear().type('nometeste')
        cy.get('[data-testid="email"]').clear().type(email)
        cy.get('[data-testid="password"]').clear().type('teste1')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert-link').should('contain', 'Cadastro realizado com sucesso')
    });

    //it.skip para pular da execução
    it('Deve realizar cadastro com sucesso (usando Faker)', () => {

        cy.get('[data-testid="nome"]').clear().type(faker.person.fullName())
        cy.get('[data-testid="email"]').clear().type(faker.internet.email())
        cy.get('[data-testid="password"]').clear().type('teste1') //faker.internet.password()
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert-link').should('contain', 'Cadastro realizado com sucesso')
    });

    //usando metodo customizado
    it('Deve realizar cadastro de usuário admin com sucesso', () => {

        cy.cadastroUsuarioAdmin(faker.person.fullName(), faker.internet.email(), 'teste')

        cy.get('.alert-link').should('contain', 'Cadastro realizado com sucesso')
        cy.get('.lead', {timeout: 10000}).should('contain', 'Este é seu sistema para administrar seu ecommerce')
    });

    //usando metodo customizado
    it.only('Deve realizar cadastro de usuário não admin com sucesso', () => {

        cy.cadastroUsuarioNaoAdmin(faker.person.fullName(), faker.internet.email(), 'teste')
    
        cy.get('.alert-link').should('contain', 'Cadastro realizado com sucesso')
        cy.get('h1', {timeout: 10000}).should('contain', 'Serverest Store')
    });

    it('Validar obrigatoriedade de campo nome', () => {
        //cy.get('[data-testid="nome"]').clear().type('')
        cy.get('[data-testid="email"]').clear().type('teste3@teste.com')
        cy.get('[data-testid="password"]').clear().type('teste1')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert').should('contain', 'Nome é obrigatório')
    });

    it('Validar obrigatoriedade de campo email', () => {
        cy.get('[data-testid="nome"]').clear().type('nometeste')
        //cy.get('[data-testid="email"]').clear().type('teste3@teste.com')
        cy.get('[data-testid="password"]').clear().type('teste1')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert').should('contain', 'Email é obrigatório')
    });

    it('Validar obrigatoriedade de campo senha', () => {
        cy.get('[data-testid="nome"]').clear().type('nometeste')
        cy.get('[data-testid="email"]').clear().type('teste4@teste.com')
        //cy.get('[data-testid="password"]').clear().type('teste1')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert').should('contain', 'Password é obrigatório')
    });

/*     it.only('Validar se email é válido', () => {
        cy.get('[data-testid="nome"]').clear().type('nometeste')
        cy.get('[data-testid="email"]').clear().type('teste4!teste.com')
        cy.get('[data-testid="password"]').clear().type('teste1')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert').should('contain', 'Password é obrigatório')
    }); */

    it('Validar cadastro com email já cadastrado', () => {
        cy.get('[data-testid="nome"]').clear().type('nometeste')
        cy.get('[data-testid="email"]').clear().type('teste1@teste.com')
        cy.get('[data-testid="password"]').clear().type('teste1')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert').should('contain', 'Este email já está sendo usado')
    });

    it('Validar link Entrar para acessar tela de login', () => {
        cy.get('[data-testid="entrar"]').click()
       cy.get('.font-robot').should('contain', 'Login')
    });

});