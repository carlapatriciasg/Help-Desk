# 📌 PROJETO: SISTEMA WEB DE GERENCIAMENTO DE CHAMADOS

## 📍 Descrição

Desenvolver um sistema web para abertura e acompanhamento de chamados técnicos.  
O sistema deve permitir que usuários se cadastrem, façam login e registrem solicitações,  
além de um painel para administradores gerenciarem os chamados.

## 📍 Objetivo

Aplicar conceitos de front-end e back-end integrados com um banco de dados SQL,  
abordando segurança, comunicação cliente-servidor e boas práticas de UI/UX.

---

## 📌 Requisitos Técnicos

### 1️⃣ Front-end

**✅ Framework:** React.js  
**✅ Tecnologias:** HTML5, CSS3, JavaScript (ES6)  
**✅ Bibliotecas Extras:**  
- Axios (requisições HTTP)  
- React Router (navegação)  
- Formik/Yup (validação de formulários)

**Requisitos:**  
- Interface responsiva e intuitiva  
- Formulários para cadastro/login com validação  
- Tela para listagem de chamados abertos  
- Tela para criação e edição de chamados

---

### 2️⃣ Back-end

**Endpoints da API:**

- `/auth/login` → Login  
- `/auth/register` → Cadastro de usuários  
- `/chamados/` → CRUD completo para chamados  
- `/users/` → Gerenciamento de usuários

---

### 3️⃣ Banco de Dados (SQL)

- MySQL ou PostgreSQL

---

## 📌 Requisitos Funcionais

### ✅ Login e Cadastro

- Usuário e senha devem ser armazenados com segurança.

### ✅ Abertura e Gerenciamento de Chamados

- Usuários podem abrir chamados e acompanhar seu status.  
- Administradores podem alterar o status dos chamados (Aberto, Em andamento, Concluído).  
- Respostas podem ser adicionadas dentro de um chamado.

### ✅ Segurança

- Permissões diferentes para usuários comuns e administradores.

---

## 📌 Entrega

- ✅ Código-fonte no GitHub  
- ✅ Banco de dados SQL com scripts de criação das tabelas  
- ✅ Demonstração em vídeo (5 minutos) explicando funcionalidades e código  
- ✅ Relatório técnico (2-3 páginas) abordando arquitetura, tecnologias e protocolos usados

---

## 📌 Critérios de Avaliação

- Implementação do banco de dados SQL corretamente estruturado  
- Interface responsiva e bem estruturada (React + Bootstrap)  
- Comunicação entre front-end e back-end via API REST  
- Clareza na apresentação e documentação

---

## 📌 Tecnologias

### 🔹 Front-end

- React.js  
- Bootstrap

### 🔹 Back-end

- Node.js  
- Express.js

### 🔹 Banco de Dados

- MySQL ou PostgreSQL
