const form = document.getElementById('form-item');
const listaItens = document.getElementById('lista-itens');
const mensagemStatus = document.getElementById('mensagem-status');
const filtroCategoria = document.getElementById('filtro-categoria');

async function carregarItens() {
  const categoria = filtroCategoria.value;
  const url = categoria ? `/api/itens?categoria=${encodeURIComponent(categoria)}` : '/api/itens';
  const resposta = await fetch(url);
  const itens = await resposta.json();

  listaItens.innerHTML = '';
  if (itens.length === 0) {
    listaItens.innerHTML = '<li>Nenhum item encontrado nesta categoria.</li>';
    return;
  }

  itens.forEach((item) => {
    const li = document.createElement('li');
    li.className = `item-card ${item.status === 'concluido' ? 'concluido' : ''}`;
    li.innerHTML = `
      <div>
        <span class="badge">${item.categoria}</span>
        <h3>${item.titulo}</h3>
        <p><strong>Bairro:</strong> ${item.bairro} | <strong>Contato:</strong> ${item.contato}</p>
        <p><strong>Status:</strong> ${item.status === 'disponivel' ? 'Disponível' : 'Doado / Concluído'}</p>
      </div>
      ${
        item.status === 'disponivel'
          ? `<button class="btn-secundario" onclick="marcarConcluido(${item.id})">Marcar como Doado</button>`
          : ''
      }
    `;
    listaItens.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  mensagemStatus.textContent = '';

  const payload = {
    titulo: document.getElementById('titulo').value,
    categoria: document.getElementById('categoria').value,
    bairro: document.getElementById('bairro').value,
    contato: document.getElementById('contato').value
  };

  const resposta = await fetch('/api/itens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    mensagemStatus.style.color = '#c53030';
    mensagemStatus.textContent = dados.erro || 'Erro ao cadastrar item.';
    return;
  }

  mensagemStatus.style.color = '#1b4332';
  mensagemStatus.textContent = 'Item publicado com sucesso!';
  form.reset();
  carregarItens();
});

async function marcarConcluido(id) {
  await fetch(`/api/itens/${id}/concluir`, { method: 'PATCH' });
  carregarItens();
}

filtroCategoria.addEventListener('change', carregarItens);
carregarItens();