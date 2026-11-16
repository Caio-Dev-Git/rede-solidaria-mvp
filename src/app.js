const express = require('express');
const path = require('path');
const itemService = require('./services/itemService');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'ConectaBairro MVP' });
});

app.get('/api/itens', (req, res) => {
  const { categoria } = req.query;
  const lista = itemService.listarItens(categoria);
  res.status(200).json(lista);
});

app.post('/api/itens', (req, res) => {
  try {
    const criado = itemService.criarItem(req.body);
    res.status(201).json(criado);
  } catch (err) {
    res.status(err.statusCode || 500).json({ erro: err.message });
  }
});

app.patch('/api/itens/:id/concluir', (req, res) => {
  try {
    const atualizado = itemService.concluirItem(req.params.id);
    res.status(200).json(atualizado);
  } catch (err) {
    res.status(err.statusCode || 500).json({ erro: err.message });
  }
});

module.exports = app;