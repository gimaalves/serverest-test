class CadastroPage{

    visitarUrl() {
        cy.visit('cadastrarusuarios')
    }

    campoNome(nome) {
        cy.get('[data-testid="nome"]').clear().type(nome)
    }

    campoEmail(email) {
        cy.get('[data-testid="email"]').clear().type(email)
    }

    campoSenha(senha) {
        cy.get('[data-testid="password"]').clear().type(senha)
    }

    checkAdmin() {
        cy.get('[data-testid="checkbox"]').check()
    }

    btnCadastrar() {
        cy.get('[data-testid="cadastrar"]').click()
    }

    CadastroUsuarioAdmin(nome, email, senha){
        this.campoNome(nome)
        this.campoEmail(email)
        this.campoSenha(senha)
        this.checkAdmin()
        this.btnCadastrar()
    }

    CadastroUsuarioNaoAdmin(nome, email, senha){
        this.campoNome(nome)
        this.campoEmail(email)
        this.campoSenha(senha)
        this.btnCadastrar()
    }


}

export default new CadastroPage;