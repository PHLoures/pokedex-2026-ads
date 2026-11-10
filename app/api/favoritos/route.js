// /app/api/favoritos/route.js  (site.com/api/favoritos)
// Este arquivo roda no SERVIDOR. É ele quem conversa com o Banco de Dados.
// As telas chamam este endereço usando fetch.
import db from "@/lib/db";

// GET: devolve a lista de todos os favoritos salvos no BD
export async function GET() {
  let favoritos = db.prepare("SELECT * FROM favoritos ORDER BY numero").all();

  return Response.json({ favoritos: favoritos });
}

// POST: salva um pokemon como favorito no BD
export async function POST(request) {
  let pokemon = await request.json();

  db.prepare(
    "INSERT OR IGNORE INTO favoritos (numero, nome, img, altura, peso) VALUES (?, ?, ?, ?, ?)"
  ).run(pokemon.numero, pokemon.nome, pokemon.img, pokemon.altura, pokemon.peso);

  return Response.json({ erro: false });
}

// DELETE: tira um pokemon dos favoritos (apaga do BD)
export async function DELETE(request) {
  let pokemon = await request.json();

  db.prepare("DELETE FROM favoritos WHERE numero = ?").run(pokemon.numero);

  return Response.json({ erro: false });
}
