const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales.model');

// MOCK DO RETORNO DE salesModel.getAll()
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
  }
];

const saleMock =     [
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

describe(
  'TESTES CAMADA MODEL DE SALES',
  () => {
  describe(
    'Testa a função getAll() do salesModel.',
    async () => {
    before(async () => {
      sinon.stub(connection, 'execute')
        .resolves([salesMock]);
    });
    
    after(async () => {
      // RESTORE DO EXECUTE
      connection.execute.restore();
    });
    
    
    it(
      'Testa se é retornado um array com dois objetos.',
      async () => {
      const sales = await salesModel.getAll();

      expect(sales).to.be.an('array');
      expect(sales).to.have.lengthOf(2);
    });

    it(
      'Testa se os dois itens dentro do array são objetos.',
      async () => {
      const sales = await salesModel.getAll();

      expect(sales[0]).to.be.an('object');
      expect(sales[1]).to.be.an('object');
    });

    it(
      'Testa se os objetos contém as chaves corretas.',
      async () => {
      const sales = await salesModel.getAll();

      expect(sales[0]).to.have
        .property('saleId').to.be.equal(1);
      expect(sales[0]).to.have
        .property('date').to.be.equal("2021-09-09T04:54:29.000Z");
      expect(sales[0]).to.have
        .property('productId').to.be.equal(1);
      expect(sales[0]).to.have
        .property('quantity').to.be.equal(2);
      expect(sales[1]).to.have
        .property('saleId').to.be.equal(1);
      expect(sales[1]).to.have
        .property('date').to.be.equal("2021-09-09T04:54:54.000Z");
      expect(sales[1]).to.have
        .property('productId').to.be.equal(2);
      expect(sales[1]).to.have
        .property('quantity').to.be.equal(2);
    });
  });

  describe(
    'Testa a função getById() do salesModel.', 
    ()=> {
    describe(
      'Quando dá certo',
      () => {
        before(async () => {
          sinon.stub(connection, 'execute')
            .resolves([salesMock]);
        });
    
        after(async () => {
          // RESTORE DO EXECUTE
          connection.execute.restore();
        });
    
        it(
          'Testa se é retornado um array.',
          async () => {
          const sale = await salesModel.getById(1)
    
          expect(sale).to.be.an('array');
        });
    
        it(
          'Testa se é retornado um array.',
          async () => {
          const sale = await salesModel.getById(1)
    
          expect(sale).to.be.an('array');
        });
    
        it(
          'Testa se dentro do array é retornado pelo menos um objeto.',
          async () => {
          const [sale] = await salesModel.getById(1);
          
          expect(sale).to.be.an('object');
        });
    
        it(
          'Testa se os objetos contêm as chaves corretas.',
          async () => {
          const sale = await salesModel.getById(1)
          
          expect(sale[0]).to.have
            .property('date').to.be.equal("2021-09-09T04:54:29.000Z");
          expect(sale[0]).to.have
            .property('productId').to.be.equal(1);
          expect(sale[0]).to.have
            .property('quantity').to.be.equal(2);
          expect(sale[1]).to.have
            .property('date').to.be.equal("2021-09-09T04:54:54.000Z");
          expect(sale[1]).to.have
            .property('productId').to.be.equal(2);
          expect(sale[1]).to.have
            .property('quantity').to.be.equal(2);
        });
      })
    describe('Quando dá errado',() => {
      before(async () => {
        const execute = [[]]

        sinon.stub(connection, 'execute')
          .resolves(execute);
      });
  
      after(async () => {
        // RESTORE DO EXECUTE
        connection.execute.restore();
      });

      it(
        'Testa se é retornado como undefined',  async () => {
        const sale = await salesModel.getById(5)
      
        expect(sale).to.be.deep.equal(undefined);
      })
    })
  });
});