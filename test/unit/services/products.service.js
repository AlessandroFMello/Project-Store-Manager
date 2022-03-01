const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/products.model');
const productsService = require('../../../services/products.service');

describe(
  'TESTES CAMADA SERVICE DE PRODUTOS',
  () => {
    const productsMock = [
      {
        "id": 1,
        "name": "produtoA",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      },
    ];

    const productsFailMock = [
      {
        "id": 1,
        "name": "produtoA",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      },
      {
        "id": 3,
        "name": "Teia do Miranha",
        "quantity": 19
      },
    ];

    const productMock = {
      name: 'Teia do Miranha',
      quantity: 19,
    };

  describe(
    'Testa a função create() do productsService.',
    () => {
      describe('Quando dá certo', () => {
      before(() => {

        sinon.stub(connection, 'execute')
          .resolves([productsMock]);
        sinon.stub(productsModel, 'create').resolves(modelResponse);
      });

      after(() => {
        connection.execute.restore();
        productsModel.create.restore();
      });
  
      const modelResponse = {
        id: 1,
        name: 'Teia do Miranha',
        quantity: 19,
      };
  
      const serviceSuccessResponse = {
        code: 201,
        product: {
          id: 1,
          name: 'Teia do Miranha',
          quantity: 19,
        },
      };

      it(
        'Testa se é retornado um objeto com code 201 e o product com as informações do produto',
        async () => {
        const product = await productsService.create(productMock);

        expect(product).to.be.deep.equal(serviceSuccessResponse);
      });
    });
    
    // describe('Quando dá errado', () => {
    //   before(() => {
    //     sinon.stub(connection, 'execute')
    //       .resolves([productsFailMock]);
    //     sinon.stub(productsModel, 'create').resolves({
    //       code: 409,
    //       message: "Product already exists",
    //     });
    //   });

    //   after(() => {
    //     connection.execute.restore();
    //     productsModel.create.restore();
    //   });

    //   const serviceFailureResponse = {
    //     code: 409,
    //     message: 'Product already exists',
    //   };

    //   it(
    //     'Testa se é retornado um objeto com code 409 e a mensagem correta',
    //     async() => {
    //       const product = await productsModel.create(productMock);

    //       expect(product).to.be.deep.equal(serviceFailureResponse);
    //     });
    // });
  });
});
