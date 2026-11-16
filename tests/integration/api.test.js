const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../../src/app');
const itemService = require('../../src/services/itemService');

describe('Testes de Integração - API ConectaBairro', () => {
  beforeEach(() => {
    itemService.resetarDados();
  });

  it('GET /api/health deve retornar status 200', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.status, 'ok');
  });

  it('POST /api/itens deve cadastrar item e GET /api/itens deve listá-lo', async () => {
    const postRes = await request(app).post('/api/itens').send({
      titulo: 'Agasalhos de Inverno',
      categoria: 'Roupas',
      bairro: 'Santana',
      contato: '(11) 95555-4444'
    });
    assert.equal(postRes.statusCode, 201);
    assert.equal(postRes.body.titulo, 'Agasalhos de Inverno');

    const getRes = await request(app).get('/api/itens?categoria=Roupas');
    assert.equal(getRes.statusCode, 200);
    assert.equal(getRes.body.length, 1);
  });

  it('POST /api/itens com dados inválidos deve retornar 400', async () => {
    const res = await request(app).post('/api/itens').send({
      titulo: '',
      categoria: 'Invalida',
      bairro: '',
      contato: ''
    });
    assert.equal(res.statusCode, 400);
  });
});