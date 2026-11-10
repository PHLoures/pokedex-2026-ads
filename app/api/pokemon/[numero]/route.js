import db from "@/lib/db";

export async function GET(request, { params }) {
  let parameters = await params;

  let [pokemons] = await db.query("SELECT * FROM pokemon WHERE numero = ?", [parameters.numero]);

  return Response.json({ pokemon: pokemons[0] });
}
