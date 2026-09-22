# Defesa SAE — Caderno de estudo do TCC

Site estático para estudar o Sistema de Alimentação Escolar e preparar a apresentação do TCC.

## O que existe

- Trilha com 23 aulas baseadas nos arquivos do projeto.
- Atlas navegável das 13 tabelas e 108 colunas do modelo analisado.
- Explicação de PK, FK, UNIQUE, cardinalidade, normalização, tipos, índices, SQL, JOIN, transações, ACID e concorrência.
- Fluxos interativos de login, baixa, cardápio, QR Code e recuperação de senha.
- Laboratório SQL com SQLite executado no navegador e dados fictícios.
- 30 perguntas de quiz com feedback e link para a aula relacionada.
- Cartões de memória com revisão simples.
- Simulador de perguntas de banca.
- Roteiro cronometrado de apresentação, checklist e exportação das anotações.
- Glossário, mapa de pastas e links para documentação oficial.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Copie todo o conteúdo desta pasta para a raiz do repositório.
3. Faça o commit e o push.
4. Abra Settings → Pages.
5. Em Build and deployment, escolha Deploy from a branch, a branch principal e a pasta /(root).
6. Salve e aguarde a URL aparecer.

O site é estático: não precisa de PHP, Node.js ou MySQL para ser estudado. O laboratório SQL usa uma base fictícia apenas na memória do navegador. O progresso, anotações e revisões ficam no localStorage de cada navegador.

## Teste local

Abra por um servidor HTTP local, porque Web Worker e os arquivos .wasm podem ser bloqueados quando o index.html é aberto diretamente pelo Explorer. Por exemplo, use a extensão Live Server do VS Code ou o servidor estático de sua preferência.

O projeto original usa MySQL/MariaDB; o laboratório didático usa SQLite no navegador. As diferenças são explicadas na própria interface.

## Estrutura

    index.html       entrada do site
    style.css        tema e layout responsivo
    app.js           navegação e interações
    data.js          aulas, fluxos, banca, glossário e roteiro
    schema.js        atlas gerado a partir dos scripts do banco
    practice.js      quiz, exercícios e seed fictício do laboratório
    sql-worker.js    execução isolada das consultas
    vendor/          sql.js e WebAssembly local

Não coloque senhas, hashes reais, tokens, dumps com dados pessoais ou credenciais no repositório público. O conteúdo desta pasta usa exemplos fictícios.
