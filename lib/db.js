// lib/db.js
// Conexão com o Banco de Dados (BD) do projeto.
// Usamos o SQLite, que já vem dentro do Node: o banco é só um arquivo
// chamado "favoritos.db", criado sozinho na pasta do projeto.
import { DatabaseSync } from "node:sqlite";

// Abre o arquivo do banco (se não existir, ele é criado)
const db = new DatabaseSync("favoritos.db");

// Cria a tabela de favoritos na primeira vez que o projeto roda
db.exec(`
  CREATE TABLE IF NOT EXISTS favoritos (
    numero INTEGER PRIMARY KEY,
    nome   TEXT,
    img    TEXT,
    altura INTEGER,
    peso   INTEGER
  )
`);

export default db;
