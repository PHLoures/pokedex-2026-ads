// /app/pokemon/[id]/page.jsx
'use server'

import FUllPokemon from "@/components/FullPokemon"

export default async function PokemonPage({ params }) {
    let parameters = await params
    let id = parameters.id

    // Pegar as informações deste pokemon
    // e montar uma página completa
    // https://pokemon.danielpimentel.com.br/v1/pokemon/numero/15
    
    return (
        <div>
            <FUllPokemon numero={id} />
        </div>
    )
}