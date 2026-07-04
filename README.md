# SecureShop AI
SecureShop AI é uma aplicação de e-commerce desenvolvida com **Node.js**, **Express**, **SQLite** e **Ollama**, integrando conceitos de **Desenvolvimento Seguro** e **Inteligência Artificial** por meio de **Retrieval-Augmented Generation (RAG)** com **embeddings**.
O projeto foi desenvolvido como aplicação acadêmica, demonstrando a integração entre autenticação segura, controle de acesso, gerenciamento de produtos e um assistente inteligente capaz de responder perguntas utilizando informações recuperadas do catálogo da loja.

# Funcionalidades
- Cadastro de usuários
- Login com senhas criptografadas (bcrypt)
- Controle de sessão
- Controle de acesso por papéis (RBAC)
- Dashboard administrativo
- CRUD completo de produtos
- Carrinho de compras
- Registro de auditoria (Audit Logs)
- Assistente Inteligente utilizando RAG
- Embeddings gerados localmente com Ollama
- Recuperação semântica utilizando Similaridade de Cosseno

# Backend
- Node.js
- Express
- SQLite
- Express Session
- Helmet
- bcrypt
- Axios
  
# Frontend
- HTML5
- CSS3
- Bootstrap 5
- EJS

# Inteligência Artificial
- Ollama
- llama3.2:3b
- nomic-embed-text

# Pipeline RAG
O sistema implementa Retrieval-Augmented Generation (RAG) utilizando embeddings locais.

# Segurança Implementada
O projeto aplica diversas práticas de desenvolvimento seguro:

- Hash de senhas com bcrypt
- Sessões autenticadas
- Helmet
- RBAC (Role-Based Access Control)
- Auditoria de Login
- Auditoria de Logout
- Auditoria de Cadastro
- Middleware de autenticação
- Middleware de autorização
  
# Banco de Dados
O projeto utiliza SQLite.
Principais tabelas:
- users
- products
- audit_logs
- product_embeddings

# Chat Model

llama3.2:3b

# Inicie a aplicação
bash
npm run dev

# Funcionalidades da IA
O Assistente Inteligente pode responder perguntas como:

- Estou procurando um notebook para programação.
- Qual é o produto mais barato?
- Existe algum produto para autenticação em dois fatores?
- Qual produto possui maior estoque?

As respostas são produzidas utilizando o pipeline RAG implementado no projeto.

# Objetivos Acadêmicos
Este projeto demonstra a integração entre:

- Desenvolvimento Web
- Desenvolvimento Seguro
- Inteligência Artificial
- Large Language Models
- Embeddings
- Retrieval-Augmented Generation (RAG)
- Engenharia de Software
- Arquitetura MVC

# Autor
Rafael Ramos
Desenvolvido como projeto acadêmico para a disciplina de Desenvolvimento Seguro e Inteligência Artificial.
