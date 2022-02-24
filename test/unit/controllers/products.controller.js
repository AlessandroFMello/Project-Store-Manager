const sinon = require('sinon');
const {expect} = require('chai');

const productsController = require('../../../controllers/products.controler');
const productsModel = require('../../../models/products.model');

const productsMock =   [
  {
    "id": 1,
    "name": "produto A",
    "quantity": 10
  },
  {
    "id": 2,
    "name": "produto B",
    "quantity": 20
  }
];

describe('TESTA A CAMADA CONTROLLER DOS PRODUTOS', () => {
  const request = {};
  const response = {};

  describe(
    'Testa a função getAll() do productscontroller.',
    () => {
    before(() => {
      sinon.stub(productsModel, 'getAll')
        .resolves(productsMock);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(productsMock);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it(
      'Testa se a response.status do productsController.getAll() é igual a 200.',
      async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it(
      'Testa se a response.json do productsController retorna um array.',
      async () => {
      await productsController.getAll(request,response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe(
    'Testa a função getById() do productscontroller.',
    () => {
    describe(
      'Quando dá certo', () => {
      before(() => {
        sinon.stub(productsModel, 'getById')
          .resolves(productsMock[1]);
          request.params = {
            id: 1
          }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(productsMock);
      });
  
      after(() => {
        productsModel.getById.restore();
      });
  
      it(
        'Testa se a response.status do productsController.getById() é igual a 200.',
        async () => {
        const result = await productsController.getById(request, response);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  
    describe(
      'Quando dá errado',
      () => {
      before(() => {
        sinon.stub(productsModel, 'getById')
          .resolves(undefined);
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({ message: 'Product not found' });
      });
  
      after(() => {
        productsModel.getById.restore();
      });
      
      it(
        'Testa se a response.status do productsController.getById() é igual a 404.',
        async () => {
        await productsController.getById(request, response);
  
        expect(response.status.calledWith(404)).to.be.equal(true);
      });
    });
  });
});
