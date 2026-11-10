// /app/favoritos/page.jsx  (site.com/favoritos)
// Lista apenas os pokemons que foram favoritados (os que estão salvos no BD)
'use client'
import CardPokemon from "@/components/CardPokemon";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";

export default function FavoritosPage() {
    let [favoritos, setFavoritos] = useState([])

    let router = useRouter()

    // executa uma unica vez: busca os favoritos salvos no BD
    useEffect(()=>{
        async function getFavoritos(){
            let resposta = await fetch ("/api/favoritos")
            let dados = await resposta.json()
            setFavoritos(dados.favoritos)
        }
        getFavoritos()
    },[])

    // Nesta tela todos são favoritos, então clicar na estrela sempre desfavorita
    async function onDesfavoritar(pokemon){
        await fetch("/api/favoritos", { method: "DELETE", body: JSON.stringify(pokemon) })
        setFavoritos(favoritos.filter( item => item.numero != pokemon.numero))
    }

    function onPokemonClicked(id) {
        router.push(`/pokemon/${id}`)
    }

    return (
        <div>
            <ul className="bg-red-600 text-white flex gap-4 py-3 px-6 font-semibold flex-wrap">
                <li>
                    <Link href="/">Início</Link>
                </li>
                <li className="text-yellow-300">
                    <Link href="/favoritos">Favoritos</Link>
                </li>
                <li>
                    <Link href="/sobre">Sobre</Link>
                </li>
            </ul>

            <div className="mt-6">
                <h1 className="text-3xl text-center font-bold mb-6">
                    Meus Favoritos
                </h1>

                {favoritos.length == 0 && (
                    <p className="text-center">Você ainda não favoritou nenhum pokemon.</p>
                )}

                <div className="flex gap-4 flex-wrap justify-center px-6 pb-6">
                    {favoritos.map((item) => (
                        <CardPokemon
                            key={'fav_'+item.numero}
                            pokemon={item}
                            onSelected={onPokemonClicked}
                            favorito={true}
                            onFavoritar={onDesfavoritar}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
