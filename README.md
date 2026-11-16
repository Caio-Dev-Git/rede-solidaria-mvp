# Rede Solidária — MVP (Experiência Prática III)

Aplicação web comunitária desenvolvida na disciplina de **Projeto de Software (ADS)** para cadastro, divulgação, filtro e acompanhamento de doações e trocas locais, alinhada às **ODS 11** (Cidades e Comunidades Sustentáveis) e **ODS 12** (Consumo e Produção Responsáveis).

## Funcionalidades do MVP
- Cadastro de itens disponíveis para doação comunitária (título, categoria, bairro e contato).
- Listagem dinâmica dos itens cadastrados na comunidade.
- Filtragem por categoria (Alimentos, Roupas, Móveis, Livros, Eletrônicos e Outros).
- Atualização de status do item para **Doado / Concluído**.

## Tecnologias Utilizadas
- **Backend:** Node.js + Express
- **Frontend:** HTML5 semântico, CSS3 responsivo e JavaScript (Vanilla) com recursos de acessibilidade (ARIA)
- **Testes Automatizados:** Node.js Native Test Runner (`node:test`) + Supertest (Unitários e Integração)
- **Integração Contínua (CI):** GitHub Actions

## Estrutura do Projeto
```text
rede-solidaria-mvp/
├── .github/workflows/ci.yml   # Pipeline de Integração Contínua
├── public/                    # Interface web (HTML, CSS, JS)
├── src/                       # API Express e regras de negócio
├── tests/                     # Testes automatizados unitários e de integração
├── package.json
└── README.md
