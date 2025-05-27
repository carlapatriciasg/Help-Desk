# 📌 SISTEMA WEB DE GERENCIAMENTO DE CHAMADOS

## 📍 Descrição

Sistema web completo para abertura, acompanhamento e gestão de chamados técnicos em ambiente corporativo.  
Permite cadastro de usuários, login seguro, abertura de chamados, acompanhamento do status, respostas/comentários, anexos e painel administrativo para gerenciamento.

---

## 📍 Tecnologias Utilizadas

### 🔹 Front-end

- **HTML5, CSS3, JavaScript (ES6)**
- **Bootstrap 5** (componentes e responsividade)
- **i18next** (internacionalização PT/EN)
- **Arquitetura SPA-like** (páginas HTML + JS modular)
- **Sem frameworks como React/Vue/Angular**

### 🔹 Back-end

- **Node.js** com **Express.js**
- **Sequelize** (ORM)
- **PostgreSQL** (banco de dados relacional)
- **JWT** (autenticação)
- **bcrypt** (hash de senha)
- **Dotenv** (variáveis de ambiente)

---

## 📍 Estrutura do Projeto

```
/frontend             # Código-fonte do front-end
  ├─ /public          # Arquivos públicos (HTML, favicon, etc.)
  ├─ /src            # Código-fonte em si
  │ ├─ /components    # Componentes reutilizáveis
  │ ├─ /pages         # Páginas da aplicação
  │ ├─ /services      # Serviços para chamadas à API
  │ ├─ /utils         # Funções utilitárias
  │ └─ App.js         # Componente principal
  └─ package.json     # Dependências e scripts do front-end

/backend               # Código-fonte do back-end
  ├─ /config          # Configurações (banco de dados, autenticação, etc.)
  ├─ /controllers     # Lógica de controle das rotas
  ├─ /middlewares     # Middlewares (ex: autenticação)
  ├─ /models          # Modelos do banco de dados
  ├─ /routes          # Definição das rotas da API
  ├─ /services        # Lógica de negócio
  └─ server.js        # Arquivo principal do servidor
```

---

## 📍 Funcionalidades

- **Cadastro e login de usuários**
  - Validação de senha forte
  - Hash de senha com bcrypt
  - Autenticação JWT

- **Abertura de chamados**
  - Formulário com categoria, subcategoria, prioridade, título, descrição e anexos
  - Upload de arquivos (restrito a formatos e tamanho)
  - Histórico de chamados

- **Acompanhamento e gestão**
  - Listagem de chamados abertos, em andamento, resolvidos e fechados
  - Visualização detalhada do chamado
  - Comentários e respostas em chamados
  - Histórico de ações (timeline)
  - Filtros e pesquisa

- **Painel do usuário**
  - Dashboard com métricas (abertos, em atendimento, resolvidos, fechados)
  - Perfil do usuário (edição de dados e senha)
  - Configurações (idioma, tema, fuso horário)

- **Painel do analista/admin**
  - Relatórios de atendimento
  - Visualização de todos os chamados
  - Alteração de status e atribuição de chamados

- **Internacionalização**
  - Suporte a Português (Brasil) e Inglês (EUA) via i18next

- **Acessibilidade**
  - Integração com VLibras

- **Outros**
  - FAQ e Termos de Uso
  - Responsividade total (mobile/desktop)
  - Temas claro/escuro

---

## 📍 Endpoints Principais (Back-end)

- `POST /api/login` — Login de usuário
- `POST /api/register` — Cadastro de usuário
- `GET /api/chamados-abertos` — Listar chamados do usuário
- `POST /api/abertura` — Abrir novo chamado
- `GET /api/chamado/:id` — Detalhes de um chamado
- `POST /api/chamado/:id/comentario` — Adicionar comentário
- `PUT /api/chamado/:id/status` — Alterar status do chamado
- `GET /api/usuarios` — Listar usuários (admin)
- `PUT /api/usuario/:id` — Editar perfil

---

## 📍 Como rodar o projeto

1. **Clone o repositório**
2. **Configure o arquivo `.env` no BackEnd** (exemplo de variáveis: DB_HOST, DB_USER, DB_PASS, DB_NAME, JWT_SECRET)
3. **Instale as dependências**
   - `cd BackEnd && npm install`
4. **Inicie o servidor**
   - `node app.js`
5. **Abra o FrontEnd**
   - Basta abrir os arquivos HTML no navegador (recomendado usar um servidor local para evitar problemas de CORS)

---

## 📍 Observações

- O projeto NÃO utiliza React, Vue ou Angular.
- Toda a lógica de internacionalização, sidebar, dashboard, etc., é feita em JavaScript puro.
- O banco de dados utilizado é o PostgreSQL.
- O sistema é modular e pode ser expandido facilmente.

---

## 📍 Pré-requisitos

Para rodar o projeto localmente, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão recomendada: >= 18.x)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (ou o banco de dados configurado no projeto)
- **Uma IDE ou editor de código** (recomendado: [Visual Studio Code](https://code.visualstudio.com/))
- **Um navegador moderno** (recomendado: [Google Chrome](https://www.google.com/chrome/) ou [Mozilla Firefox](https://www.mozilla.org/firefox/))
- (Opcional) [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar as APIs REST

---

## 📍 Créditos

Desenvolvido por [Carla Patrícia](https://www.linkedin.com/in/carlapatriciasg/), [Ielson Dias](https://www.linkedin.com/in/ielson-dias/), [Caique Mendes](https://www.linkedin.com/in/caiquemendes-/), [Vinicius Castro](https://www.linkedin.com/in/vinicius-castrodev/) e [Kaique Aquino](https://www.linkedin.com/in/kaique-aquino/)  
Orientação: Prof. [Sheila Tirony](https://www.linkedin.com/in/sheila-tirony-a2207924/)  
Projeto Acadêmico — 2025
