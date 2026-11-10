import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("favoritos.db");

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
