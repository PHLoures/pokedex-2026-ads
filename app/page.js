'use client'
import CardPokemon from "@/components/CardPokemon";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";


export default function Home() {
  let [regiao, setRegiao] = useState(1)
  let [regioes, setRegioes] = useState([])

  let [pokemons, setPokemons] = useState([])

  let [favoritos, setFavoritos] = useState([])

  // Irá gerenciar as nossas rotas
  let router = useRouter()

  // executa uma unica vez durante a amontagem do componente
  useEffect(()=>{
    async function getRegioes(){
      let resposta = await fetch ("https://pokemon.danielpimentel.com.br/v1/regioes")
      let dados = await resposta.json()
      console.log(dados)
      setRegioes(dados.regioes)
    }
    getRegioes()
  },[])

  useEffect(()=>{
    async function getFavoritos(){
      let resposta = await fetch ("/api/favoritos")
      let dados = await resposta.json()
      setFavoritos(dados.favoritos.map((item) => item.numero))
    }
    getFavoritos()
  },[])

  // chama toda vez que variavel região é alterada
  useEffect(()=>{
    async function getPokemons(){
      let resposta = await fetch (`https://pokemon.danielpimentel.com.br/v1/pokemon/geracao/${regiao}/151/1`)
      let dados = await resposta.json()
      setPokemons(dados.pokemon)
    }
    getPokemons()
  }, [regiao])


  function onRemove(numeroPokemon){
    let pokemonsUpdateList = pokemons.filter( item => item.numero != numeroPokemon)
    
    setPokemons(pokemonsUpdateList)
  }

  async function onFavoritar(pokemon){
    if (favoritos.includes(pokemon.numero)) {
      await fetch("/api/favoritos", { method: "DELETE", body: JSON.stringify(pokemon) })
      setFavoritos(favoritos.filter( numero => numero != pokemon.numero))
    } else {
      await fetch("/api/favoritos", { method: "POST", body: JSON.stringify(pokemon) })
      setFavoritos([...favoritos, pokemon.numero])
    }
  }

  function onPokemonClicked(id) {
    // Leva para outra rota, semelhante ao Link
    router.push(`/pokemon/${id}`)
  }

// map aplica uma operação ou funcao para todos os elementos de um conjunto 
// SPA - Single Page Application
  return (
    <div >
      <ul className="bg-red-600 text-white flex gap-4 py-3 px-6 font-semibold flex-wrap">
        {regioes.map((item)=>(
          <li 
            key={'reg_'+item.id}
            className="cursor-pointer capitalize hover:text-yellow-300 transition-all duration-300"
            onClick={() => setRegiao(item.id)}
          >
            {item.nome}
          </li>
        ))}
        <li>
          <Link href="/favoritos">Favoritos</Link>
        </li>
        <li>
          <Link href="/sobre">Sobre</Link>
        </li>
      </ul>

      <div className="mt-6">
        <h1 className="text-3xl text-center font-bold mb-6">
          Pokedex
        </h1>

        <div className="flex gap-4 flex-wrap justify-center px-6 pb-6">
          {pokemons.map((item) => (
            <CardPokemon key={
              'poke_'+item.numero} pokemon={item} onRemove={onRemove} onSelected={onPokemonClicked}
              favorito={favoritos.includes(item.numero)} onFavoritar={onFavoritar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
