const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const postTransferencias = require('../fixtures/postTransferencias.json');
const postLogin = require('../fixtures/postLogin.json');



describe('Transferencias', () => {

    let token

    beforeEach (async () => {
        token = await obterToken('julio.lima', '123456');
    })

    describe('POST /transferencia', () => {

        it('Deve retornar sucesso com 201, quando valor da transferência for igual ou acima de $10,00', async () => {
            
            const bodyTransferencias = {...postTransferencias};
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);

            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Transferência realizada com sucesso.');
        });

        it('Deve retornar sucesso com 422, quando valor da transferência for abaixo de $10,00', async () => {
            const bodyTransferencias = {...postTransferencias};
            bodyTransferencias.valor = 9.99 // Valor abaixo de $10,00

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);

            expect(response.status).to.equal(422);
          
        });
    });

    describe ('GET/transferencias/{id}', async () => {

        it('Deve retornar sucesso com200 e dados iguais ao registro de transaferencia contido no banco de dados, quando o id for válido ', async () =>{
            const resposta = await request (process.env.BASE_URL)
                .get('/transferencias/1')
                .set('Authorization', `Bearer ${token}`)
                
                expect(resposta.status).to.equal(200);
                expect(resposta.body.id).to.equal(1);
                expect(resposta.body.valor).to.equal(10.00);
                expect(resposta.body.conta_origem_id).to.equal(1);
                expect(resposta.body.conta_destino_id).to.equal(2);
        });


    });
    
});



