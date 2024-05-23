/// <reference types="cypress" />
import dadosUsuario from '../../fixtures/usuario-api.json'

const urlBase = 'http://localhost:3000/'
//const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzE2NDcyNjYxLCJleHAiOjE3MTY0NzMyNjF9.SrMkFmg7Zted4xcHd2mQdOY815RSmEP89EnhpMjszXQ'
//const id = '5H16OsJUgcUkWAkH'

//=> arrow function
describe('API: Produtos', () => {

    beforeEach(() => {
        cy.token(urlBase, dadosUsuario.email, dadosUsuario.senha).as('token')
    });

    it('Deve listar produtos com sucesso', () => {
        cy.request({
            method: 'GET',
            url: urlBase + 'produtos'
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

        cy.request({
            method: 'POST',
            url: urlBase + 'produtos',
            body: {
                "nome": produto,
                "preco": 250,
                "descricao": "Mouse",
                "quantidade": 15
            },
            headers: {
                authorization: this.token

            }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it('Deve alterar dados do produto com sucesso', function () {
        var produtoAlterado = `Produto Teste ${Date.now()}`

        cy.cadastrarProduto(urlBase, this.token)
            .then((response) => {
                var id = response.body._id

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
                    headers: {
                        authorization: this.token
                    }
                }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                })
            })


    });

    it('Deve excluir produto com sucesso', function () {
        cy.cadastrarProduto(urlBase, this.token)
            .then((response) => {
                cy.log(response.body._id)
                var id = response.body._id

                cy.request({
                    method: 'DELETE',
                    url: urlBase + 'produtos/' + id,
                    headers: {
                        authorization: this.token
                    }
                }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                })
            })


    });
});