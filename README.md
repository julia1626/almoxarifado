# 🧰 Sistema de Gestão de Estoque – Fabricante de Ferramentas

## 📖 Contextualização
Uma fabricante de ferramentas e equipamentos manuais enfrenta desafios críticos na gestão de estoque devido à ausência de um sistema informatizado para controlar a entrada e saída de materiais. Isso causa falta de produtos em momentos cruciais da produção e excesso de estoque, gerando custos elevados e risco de obsolescência.  

O sistema foi desenvolvido para resolver esses problemas, permitindo o controle eficiente de produtos com diferentes características, tamanhos e materiais — como martelos com cabeças e cabos variados, e chaves de fenda com revestimento isolante ou ponta imantada.

---

## 🎯 Objetivo do Sistema
Desenvolver uma aplicação web que permita:
- Cadastro e gerenciamento de produtos.
- Registro de movimentações de entrada e saída.
- Monitoramento automático do estoque mínimo, com alertas.
- Rastreamento completo das operações, registrando usuário e data.

---

## 🧩 Tecnologias Utilizadas

### 💻 Front-end e Back-end
- **Framework:** Next.js 16 (TypeScript)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS + CSS customizado
- **Gerenciamento de estado:** React Hooks
- **Autenticação:** JWT (JSON Web Token)

### 🗄️ Banco de Dados
- **SGBD:** MongoDB 6.0
- **ODM:** Mongoose

### ⚙️ Infraestrutura
- **Sistema Operacional:** Windows 11
- **Node.js:** v20.x
- **NPM:** v10.x

---

## 📝 Requisitos Funcionais

1. **Autenticação de Usuário**
   - Login com verificação de credenciais.
   - Exibição do nome do usuário logado.
   - Logout com redirecionamento à tela de login.
   - Mensagens claras em caso de falha.

2. **Interface Principal**
   - Menu para acessar Cadastro de Produto e Gestão de Estoque.
   - Exibição do nome do usuário ativo.

3. **Cadastro de Produto**
   - Listagem automática de produtos em tabela.
   - Campo de busca para filtrar produtos.
   - CRUD completo (criar, editar, excluir).
   - Validação de dados obrigatórios e formato correto.
   - Botão para retornar à tela principal.

4. **Gestão de Estoque**
   - Listagem de produtos em ordem alfabética (com algoritmo de ordenação).
   - Registro de movimentações de entrada e saída.
   - Registro da data e do responsável.
   - Alerta automático quando estoque ficar abaixo do mínimo configurado.

5. **Histórico e Rastreamento**
   - Cada movimentação deve ser registrada para auditoria e rastreabilidade.

---

## Testes de Software ##
    - Autenticação de usuário (login correto/incorreto).
    - Cadastro, edição e exclusão de produtos.
    - Entrada e saída de estoque com atualização correta.
    - Alertas de estoque mínimo.
    - Rastreamento de movimentações com data e usuário.
    - Pesquisa de produtos e ordenação alfabética.

## 📊 Diagrama Entidade-Relacionamento (DER)
```mermaid
erDiagram
    PRODUTO {
        int id
        string nome
        string descricao
        string categoria
        string unidade
        int quantidade
        int estoque_minimo
    }

    MOVIMENTACAO {
        int id
        string tipo
        int quantidade
        datetime data
        int produto_id
        int usuario_id
    }

    USUARIO {
        int id
        string nome
        string email
        string senha
        string cargo
    }

    PRODUTO ||--o{ MOVIMENTACAO : possui
    USUARIO ||--o{ MOVIMENTACAO : realiza
````

---

## Script de Criação e População do Banco de Dados (MySQL) ##
CREATE DATABASE almoxarifado;
USE almoxarifado;

CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  cargo ENUM('Administrador')
);

CREATE TABLE produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  categoria VARCHAR(100),
  unidade VARCHAR(20),
  quantidade INT DEFAULT 0,
  estoque_minimo INT DEFAULT 5
);

CREATE TABLE movimentacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('Entrada', 'Saída') NOT NULL,
  quantidade INT NOT NULL,
  data DATETIME DEFAULT CURRENT_TIMESTAMP,
  produto_id INT,
  usuario_id INT,
  FOREIGN KEY (produto_id) REFERENCES produto(id),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

INSERT INTO usuario (nome, email, senha, cargo) VALUES
('Admin', 'admin@gmail.com', 'senha_hash', 'Administrador');

INSERT INTO produto (nome, descricao, categoria, unidade, quantidade, estoque_minimo) VALUES
('Papel A4', 'Resma 500 folhas', 'Material de Escritório', 'Un', 50, 10),
('Tinta Azul', 'Cartucho impressora HP', 'Insumos', 'Un', 20, 5);

INSERT INTO movimentacao (tipo, quantidade, produto_id, usuario_id) VALUES
('Saída', 5, 1, 2),
('Entrada', 10, 2, 1);
