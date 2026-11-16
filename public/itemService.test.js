const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const itemService = require('../../src/services/itemService');

describe('Testes Unitários - itemService', () => {
  beforeEach(() => {
    itemService.resetarDados();
  });

  it('deve validar corretamente um item com dados válidos', () => {
    const res = itemService.validarItem({
      titulo: 'Livros de Programação',
      categoria: 'Livros',
      bairro: 'Vila Mariana',
      contato: '(11) 97777-6666'
    });
    assert.equal(res.valido, true);
  });

  it('deve rejeitar título com menos de 3 caracteres', () => {
    const res = itemService.validarItem({
      titulo: 'Oi',
      categoria: 'Livros',
      bairro: 'Centro',
      contato: '(11) 97777-6666'
    });
    assert.equal(res.valido, false);
  });

  it('deve criar e concluir um item na lista', () => {
    const criado = itemService.criarItem({
      titulo: 'Cadeira de Escritório',
      categoria: 'Móveis',
      bairro: 'Pinheiros',
      contato: '(11) 96666-5555'
    });
    assert.equal(criado.status, 'disponivel');

    const concluido = itemService.concluirItem(criado.id);
    assert.equal(concluido.status, 'concluido');
  });
});