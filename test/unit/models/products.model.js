const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/products.model');

// MOCK DO RETORNO DE productsModel.getAll()
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
  },
];

describe(
  'TESTES CAMADA MODEL DE PRODUTOS',
  () => {
  before(async () => {
    sinon.stub(connection, 'execute')
      .resolves([productsMock]);
  });

  after(async () => {
    // RESTORE DO EXECUTE
    connection.execute.restore();
  });

  describe(
    'Testa a função getAll() do productsModel.',
    async () => {  
    it(
      'Testa se é retornado um array com dois itens.',
      async () => {
      const products = await productsModel.getAll();

      expect(products).to.be.an('array');
      expect(products).to.have.lengthOf(2);
    });

    it(
      'Testa se os dois itens dentro do array são objetos.',
      async () => {
      const products = await productsModel.getAll();

      expect(products[0]).to.be.an('object');
      expect(products[1]).to.be.an('object');
    });

    it(
      'Testa se os objetos contém as chaves corretas.',
      async () => {
      const products = await productsModel.getAll();

      expect(products[0]).to.have
        .property('id').to.be.equal(1);
      expect(products[0]).to.have
        .property('name').to.be.equal('produto A');
      expect(products[0]).to.have
        .property('quantity').to.be.equal(10);
      expect(products[1]).to.have
        .property('id').to.be.equal(2);
      expect(products[1]).to.have
        .property('name').to.be.equal('produto B');
      expect(products[1]).to.have
        .property('quantity').to.be.equal(20);
    });

    it(
      'Testa se o objeto encontrado é estritamente igual.',
      async () => {
      const [products] = await productsModel.getAll();

      expect(products).to.be.deep.equal(productsMock[0]);
    });
  });

  describe(
    'Testa a função getById() do productsModel.', 
    ()=> {
    it(
      'Testa se é retornado apenas um objeto.',
      async () => {
      const product = await productsModel.getById(1);

      expect(product).to.be.an('object');
    });

    it(
      'Testa se é o objeto contém as chaves corretas.',
      async () => {
      const product = await productsModel.getById(1);

      expect(product).to.have
        .property('id').to.be.equal(1);
      expect(product).to.have
        .property('name').to.be.equal('produto A');
      expect(product).to.have
        .property('quantity').to.be.equal(10);
    });
  });
});
