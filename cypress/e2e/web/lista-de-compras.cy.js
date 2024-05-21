/// <reference types="cypress" />

describe('Funcionalidade: Lista de compras', () => {
    
    beforeEach(() => {
/*         cy.visit('login')
        cy.get('[data-testid="email"]').clear().type('Kirstin_Lehner34@yahoo.com')
        cy.get('[data-testid="senha"]').clear().type('teste')
        cy.get('[data-testid="entrar"]').click()
        cy.wait(1000) */
        //uso de método customizado em support\commands.js
        cy.login('Kirstin_Lehner34@yahoo.com', 'teste')
    });

    it('Validar acesso a lista de compras', () => {
        cy.visit('minhaListaDeProdutos')
        cy.get('h1', {timeout: 10000}).should('contain', 'Lista de Compras')
    });
});