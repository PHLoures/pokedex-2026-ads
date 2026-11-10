import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "pokemon",
});

await db.query(`
  CREATE TABLE IF NOT EXISTS favoritos (
    numero INT UNSIGNED PRIMARY KEY
  )
`);

export default db;
