const VALID_CATEGORIES = ['Alimentos', 'Roupas', 'Móveis', 'Livros', 'Eletrônicos', 'Outros'];

let items = [
  {
    id: 1,
    titulo: 'Cesta Básica Comunitária',
    categoria: 'Alimentos',
    bairro: 'Centro',
    contato: '(11) 99999-0001',
    status: 'disponivel',
    criadoEm: new Date().toISOString()
  }
];
let nextId = 2;

function validarItem({ titulo, categoria, bairro, contato }) {
  if (!titulo || titulo.trim().length < 3) {
    return { valido: false, erro: 'O título deve ter pelo menos 3 caracteres.' };
  }
  if (!categoria || !VALID_CATEGORIES.includes(categoria)) {
    return { valido: false, erro: 'Categoria inválida.' };
  }
  if (!bairro || bairro.trim().length < 2) {
    return { valido: false, erro: 'O bairro é obrigatório.' };
  }
  if (!contato || contato.trim().length < 8) {
    return { valido: false, erro: 'Informe um contato válido (mínimo 8 caracteres).' };
  }
  return { valido: true };
}

function listarItens(filtroCategoria = '') {
  if (!filtroCategoria) return items;
  return items.filter(
    (item) => item.categoria.toLowerCase() === filtroCategoria.toLowerCase()
  );
}

function criarItem(dados) {
  const validacao = validarItem(dados);
  if (!validacao.valido) {
    const error = new Error(validacao.erro);
    error.statusCode = 400;
    throw error;
  }

  const novoItem = {
    id: nextId++,
    titulo: dados.titulo.trim(),
    categoria: dados.categoria,
    bairro: dados.bairro.trim(),
    contato: dados.contato.trim(),
    status: 'disponivel',
    criadoEm: new Date().toISOString()
  };

  items.push(novoItem);
  return novoItem;
}

function concluirItem(id) {
  const item = items.find((i) => i.id === Number(id));
  if (!item) {
    const error = new Error('Item não encontrado.');
    error.statusCode = 404;
    throw error;
  }
  item.status = 'concluido';
  return item;
}

function resetarDados() {
  items = [
    {
      id: 1,
      titulo: 'Cesta Básica Comunitária',
      categoria: 'Alimentos',
      bairro: 'Centro',
      contato: '(11) 99999-0001',
      status: 'disponivel',
      criadoEm: new Date().toISOString()
    }
  ];
  nextId = 2;
}

module.exports = {
  VALID_CATEGORIES,
  validarItem,
  listarItens,
  criarItem,
  concluirItem,
  resetarDados
};