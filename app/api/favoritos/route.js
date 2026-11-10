import db from "@/lib/db";

export async function GET() {
  let favoritos = db.prepare("SELECT * FROM favoritos ORDER BY numero").all();

  return Response.json({ favoritos: favoritos });
}

export async function POST(request) {
  let pokemon = await request.json();

  db.prepare(
    "INSERT OR IGNORE INTO favoritos (numero, nome, img, altura, peso) VALUES (?, ?, ?, ?, ?)"
  ).run(pokemon.numero, pokemon.nome, pokemon.img, pokemon.altura, pokemon.peso);

  return Response.json({ erro: false });
}

export async function DELETE(request) {
  let pokemon = await request.json();

  db.prepare("DELETE FROM favoritos WHERE numero = ?").run(pokemon.numero);

  return Response.json({ erro: false });
}
