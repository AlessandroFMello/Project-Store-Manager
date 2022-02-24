const sinon = require('sinon');
const {expect} = require('chai');

const salesController = require('../../../controllers/sales.controller');
const salesModel = require('../../../models/sales.model');

const salesMock =     [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  },
];

const saleMock =   [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

describe('TESTA A CAMADA CONTROLLER DAS VENDAS', () => {
  const request = {};
  const response = {};

  describe(
    'Testa a função getAll() do salescontroller.',
    () => {
    before(() => {
      sinon.stub(salesModel, 'getAll')
        .resolves(salesMock);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(salesMock);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it(
      'Testa se a response.status do salesController.getAll() é igual a 200.',
      async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it(
      'Testa se a response.json do salesController retorna um array.',
      async () => {
      await salesController.getAll(request,response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe(
    'Testa a função getById() do salescontroller.',
    () => {
    describe(
      'Quando dá certo', () => {
      before(() => {
        sinon.stub(salesModel, 'getById')
          .resolves(saleMock);
          request.params = {
            id: 1
          }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(salesMock);
      });
  
      after(() => {
        salesModel.getById.restore();
      });
  
      it(
        'Testa se a response.status do salesController.getById() é igual a 200.',
        async () => {
        await salesController.getById(request, response);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  
    describe(
      'Quando dá errado',
      () => {
      before(() => {
        sinon.stub(salesModel, 'getById')
          .resolves(undefined);
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({ message: 'Product not found' });
      });
  
      after(() => {
        salesModel.getById.restore();
      });
      
      it(
        'Testa se a response.status do salesController.getById() é igual a 404.',
        async () => {
        await salesController.getById(request, response);
  
        expect(response.status.calledWith(404)).to.be.equal(true);
      });
    });
  });
});
