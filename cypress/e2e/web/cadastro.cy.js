/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import dadosUsuario from '../../fixtures/usuarios.json'

describe('Funcionalidade: Cadastro', () => {

    //acessa tela de cadastro de usuarios antes de cada teste
    beforeEach(() => {
        cy.visit('cadastrarusuarios')
    });

    it('Deve realizar cadastro com sucesso usando Datenow', () => {
        //gera email único usando método Date.now()
        var email = 'teste' + Date.now() + '@teste.com'

        //realiza cadastro de usuário usando email único gerado
        cy.cadastroUsuarioAdmin("Nome Teste", email, 'teste')

        //valida se cadastro realizado com sucesso
        cy.get('.alert-link', {timeout: 10000}).should('contain', 'Cadastro realizado com sucesso')
    });

    it('Deve realizar cadastro de usuário admin com sucesso (usando Faker)', () => {

        //realiza cadastro de usuário admin usando biblioteca Faker
        cy.cadastroUsuarioAdmin(faker.person.fullName(), faker.internet.email(), 'teste')

        //valida se cadastro realizado com sucesso
        cy.get('.alert-link', {timeout: 10000}).should('contain', 'Cadastro realizado com sucesso')
        cy.get('.lead', { timeout: 10000 }).should('contain', 'Este é seu sistema para administrar seu ecommerce')
    });

    it('Deve realizar cadastro de usuário não admin com sucesso', () => {

        //realiza cadastro de usuário não admin usando biblioteca Faker
        cy.cadastroUsuarioNaoAdmin(faker.person.fullName(), faker.internet.email(), 'teste')

        //valida se cadastro realizado com sucesso
        cy.get('.alert-link', { timeout: 10000 }).should('contain', 'Cadastro realizado com sucesso')
        cy.get('h1', { timeout: 10000 }).should('contain', 'Serverest Store')
    });

    it('Validar obrigatoriedade de campo nome', () => {
        
        //tenta cadastrar sem preenchimento do nome
        //cy.get('[data-testid="nome"]').clear().type('')
        cy.get('[data-testid="email"]').clear().type('teste3@teste.com')
        cy.get('[data-testid="password"]').clear().type('teste1')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()

        //valida se alerta de obrigatoriedade de campo é exibido
        cy.get('.alert', { timeout: 10000 }).should('contain', 'Nome é obrigatório')
    });

    it('Validar obrigatoriedade de campo email', () => {

        //tenta cadastrar sem preenchimento do email
        cy.get('[data-testid="nome"]').clear().type('nometeste')
        //cy.get('[data-testid="email"]').clear().type('teste3@teste.com')
        cy.get('[data-testid="password"]').clear().type('teste1')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()

        //valida se alerta de obrigatoriedade de campo é exibido
        cy.get('.alert', { timeout: 10000 }).should('contain', 'Email é obrigatório')
    });

    it('Validar obrigatoriedade de campo senha', () => {

        //tenta cadastrar sem preenchimento da senha
        cy.get('[data-testid="nome"]').clear().type('nometeste')
        cy.get('[data-testid="email"]').clear().type('teste4@teste.com')
        //cy.get('[data-testid="password"]').clear().type('teste1')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()

        //valida se alerta de obrigatoriedade de campo é exibido
        cy.get('.alert', { timeout: 10000 }).should('contain', 'Password é obrigatório')
    });

    //solução pelo colega Osvaldo
    it('Validar se email é válido', () => {
        
        //tenta cadastrar usuário com email inválido
        cy.get('[data-testid="nome"]').clear().type('nometeste')
        cy.get('[data-testid="email"]').clear().type('teste4!teste.com')
        cy.get('[data-testid="password"]').clear().type('teste1')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        
        //valida se mensagem de erro apresentada
        cy.get('[data-testid="email"]').then(($input) => {
            if ('validationMessage' in $input[0]) {
                const validationMessage = $input[0].validationMessage;
                expect(validationMessage).to.contain("Please include an '@' in the email address.");
            }
        });
    });

    it('Validar cadastro com email já cadastrado', () => {
        var email = 'teste' + Date.now() + '@teste.com'

        //realiza cadastro de novo usuário
        cy.cadastroUsuarioAdmin("Nome Teste", email, 'teste')
        cy.get('.lead', { timeout: 10000 }).should('contain', 'Este é seu sistema para administrar seu ecommerce')
        
        //realiza logout e acessa tela de cadastro de usuários
        cy.get('[data-testid="logout"]').click()
        cy.visit('cadastrarusuarios')
        
        //tenta cadastrar usuário novamente
        cy.cadastroUsuarioAdmin("Nome Teste", email, 'teste')

        //valida se alerta de email já existente é apresentado
        cy.get('.alert', { timeout: 10000 }).should('contain', 'Este email já está sendo usado')
    });

    it('Validar link Entrar para acessar tela de login', () => {
        
        //acessa tela de login
        cy.get('[data-testid="entrar"]').click()

        //valida se tela de login é apresentada
        cy.get('.font-robot', { timeout: 10000 }).should('contain', 'Login')
    });

    it('Deve realizar cadastro com sucesso usando importação de dados', () => {
        var email = `teste${Date.now()}@teste.com`

        //realiza cadastro de usuário usando importação de dados
        cy.cadastroUsuarioAdmin(dadosUsuario[0].nome, email, dadosUsuario[0].senha)

        //valida se cadastro realizado com sucesso
        cy.get('.alert-link', { timeout: 10000 }).should('contain', 'Cadastro realizado com sucesso')
        cy.get('.lead', { timeout: 10000 }).should('contain', 'Este é seu sistema para administrar seu ecommerce')
    });

});