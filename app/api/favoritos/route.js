import db from "@/lib/db";

export async function GET() {
  let [favoritos] = await db.query(
    "SELECT pokemon.* FROM pokemon JOIN favoritos ON favoritos.numero = pokemon.numero ORDER BY pokemon.numero"
  );

  return Response.json({ favoritos: favoritos });
}

export async function POST(request) {
  let pokemon = await request.json();

  await db.query("INSERT IGNORE INTO favoritos (numero) VALUES (?)", [pokemon.numero]);

  return Response.json({ erro: false });
}

export async function DELETE(request) {
  let pokemon = await request.json();

  await db.query("DELETE FROM favoritos WHERE numero = ?", [pokemon.numero]);

  return Response.json({ erro: false });
}
