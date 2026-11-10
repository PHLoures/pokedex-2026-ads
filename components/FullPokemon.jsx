// components/FUllPokemon.jsx
'use client'
import { useEffect, useState } from "react";
import Link from 'next/link'

export default function FUllPokemon({ numero }) {
    // Começa como null porque o pokemon ainda não foi carregado
    let [pokemon, setPokemon] = useState(null)

    // Busca na API todas as informações do pokemon com este numero
    useEffect(()=>{
        async function getPokemon(){
            let resposta = await fetch (`https://pokemon.danielpimentel.com.br/v1/pokemon/numero/${numero}`)
            let dados = await resposta.json()
            setPokemon(dados.pokemon)
        }
        getPokemon()
    }, [numero])

    // Enquanto a resposta da API não chega, mostra um aviso
    if (pokemon == null) {
        return <p className="p-6">Carregando...</p>
    }

    // A API manda os tipos e as evoluções como texto separado por vírgula.
    // Ex: "bug,poison". O split transforma em lista: ["bug", "poison"]
    let tipos = pokemon.tipo.split(",")
    let evolucoes = pokemon.evolucoes.split(",")

    // Lista dos atributos, para desenhar as barrinhas com um map
    let atributos = [
        { nome: "HP", valor: pokemon.hp },
        { nome: "Ataque", valor: pokemon.atk },
        { nome: "Defesa", valor: pokemon.def },
        { nome: "Ataque Especial", valor: pokemon.spatk },
        { nome: "Defesa Especial", valor: pokemon.spdef },
        { nome: "Velocidade", valor: pokemon.speed },
    ]

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Link href="/" className="font-bold cursor-pointer">
                Voltar para a lista
            </Link>

            <h1 className="text-3xl font-bold capitalize text-center mt-4">
                #{pokemon.numero} {pokemon.nome}
            </h1>

            {/* Tipos */}
            <div className="flex gap-2 justify-center mt-2">
                {tipos.map((tipo) => (
                    <span key={tipo} className="bg-red-600 text-white capitalize py-1 px-3 rounded-2xl text-sm">
                        {tipo}
                    </span>
                ))}
            </div>

            {/* As 3 imagens que a API oferece */}
            <div className="flex gap-4 justify-center flex-wrap mt-6">
                <div className="text-center">
                    <img className="h-40" src={pokemon.img} />
                    <span className="text-xs">Arte oficial</span>
                </div>
                <div className="text-center">
                    <img className="h-40" src={pokemon.img_3d} />
                    <span className="text-xs">3D</span>
                </div>
                <div className="text-center">
                    <img className="h-40" src={pokemon.img_shiny} />
                    <span className="text-xs">Shiny</span>
                </div>
            </div>

            {/* Informações gerais */}
            <div className="border rounded-xl border-red-800 p-5 mt-6">
                <h2 className="font-semibold mb-2">Informações</h2>
                <p>Número: <span className="font-semibold">{pokemon.numero}</span></p>
                <p>Geração: <span className="font-semibold">{pokemon.geracao}</span></p>
                <p>Altura: <span className="font-semibold">{pokemon.altura}cm</span></p>
                <p>Peso: <span className="font-semibold">{pokemon.peso / 1000}kg</span></p>
            </div>

            {/* Atributos com barrinha */}
            <div className="border rounded-xl border-red-800 p-5 mt-4">
                <h2 className="font-semibold mb-2">Atributos</h2>
                {atributos.map((item) => (
                    <div key={item.nome} className="flex items-center gap-2 mt-1">
                        <span className="w-36 text-sm">{item.nome}</span>
                        <span className="w-8 text-sm font-semibold">{item.valor}</span>
                        <div className="flex-1 bg-gray-200 rounded-2xl h-3">
                            {/* O maior valor possível de um atributo é 255 */}
                            <div
                                className="bg-red-600 rounded-2xl h-3"
                                style={{ width: (item.valor / 255 * 100) + "%" }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Evoluções */}
            <div className="border rounded-xl border-red-800 p-5 mt-4">
                <h2 className="font-semibold mb-2">Evoluções</h2>
                <div className="flex gap-2 flex-wrap">
                    {evolucoes.map((nome) => (
                        <span
                            key={nome}
                            className={"capitalize py-1 px-3 rounded-2xl text-sm border border-red-800 " + (nome == pokemon.nome ? "bg-red-600 text-white" : "")}
                        >
                            {nome}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
