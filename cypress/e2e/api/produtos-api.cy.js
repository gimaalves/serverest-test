/// <reference types="cypress" />
import dadosUsuario from '../../fixtures/usuario-api.json'

const urlBase = 'http://localhost:3000/'


describe('API: Produtos', () => {

    beforeEach(() => {
        //guarda o token de autorização antes de cada teste
        cy.token(urlBase, dadosUsuario.email, dadosUsuario.senha).as('token')
    });

    it('Deve listar produtos com sucesso', () => {
        //requisição GET para listar produtos
        cy.request({
            method: 'GET',
            url: urlBase + 'produtos'
        //valida o response
        }).then((response) => {
            expect(response.status).to.equal(200)
            //em ms
            expect(response.duration).to.be.lessThan(1500)
            expect(response.body).to.have.property('produtos')
            expect(response.body).to.have.property('quantidade')
        })
    });

    it('Deve cadastrar um produto com sucesso', function () {
        var produto = `Produto Teste ${Date.now()}`

        //requisição POST para cadastro de produto
        cy.request({
            method: 'POST',
            url: urlBase + 'produtos',
            body: {
                "nome": produto,
                "preco": 250,
                "descricao": "Mouse",
                "quantidade": 15
            },
            //usa o token salvo no before each
            headers: {
                authorization: this.token

            }
        //valida o response
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it('Deve alterar dados do produto com sucesso', function () {
        var produtoAlterado = `Produto Teste ${Date.now()}`

        //realiza um cadastro com método customizado passando o token e urlBase
        cy.cadastrarProduto(urlBase, this.token)
            .then((response) => {
                var id = response.body._id

                //requisição PUT para alteração de produto
                cy.request({
                    method: 'PUT',
                    url: urlBase + 'produtos/' + id,
                    body:
                    {
                        "nome": produtoAlterado,
                        "preco": 250,
                        "descricao": "Mouse",
                        "quantidade": 15
                    },
                    //usa o token salvo no before each na alteração
                    headers: {
                        authorization: this.token
                    }
                //valida o response
                }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                })
            })

    });

    it('Deve excluir produto com sucesso', function () {
        
        //realiza um cadastro com método customizado passando o token e urlBase
        cy.cadastrarProduto(urlBase, this.token)
            .then((response) => {
                cy.log(response.body._id)
                var id = response.body._id

                //requisição DELETE para exclusão de produto
                cy.request({
                    method: 'DELETE',
                    url: urlBase + 'produtos/' + id,
                    //usa o token salvo no before each na alteração
                    headers: {
                        authorization: this.token
                    }
                //valida o response
                }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                })
            })

    });
});