'use client'
import CardPokemon from "@/components/CardPokemon";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";


export default function Home() {
  let [regiao, setRegiao] = useState(1)
  let [regioes, setRegioes] = useState([])

  let [pokemons, setPokemons] = useState([])

  // Guarda os NÚMEROS dos pokemons favoritados. Ex: [1, 4, 25]
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

  // executa uma unica vez: busca no BD quais pokemons já são favoritos
  useEffect(()=>{
    async function getFavoritos(){
      let resposta = await fetch ("/api/favoritos")
      let dados = await resposta.json()
      // do BD vem o pokemon inteiro, aqui só precisamos do numero
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

  // Chamada quando clicam na estrela de um card
  async function onFavoritar(pokemon){
    if (favoritos.includes(pokemon.numero)) {
      // Já era favorito: apaga do BD e tira da lista
      await fetch("/api/favoritos", { method: "DELETE", body: JSON.stringify(pokemon) })
      setFavoritos(favoritos.filter( numero => numero != pokemon.numero))
    } else {
      // Não era favorito: salva no BD e coloca na lista
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
      <ul className="bg-sky-500 text-white flex gap-4 py-2 px-6">
        {regioes.map((item)=>(
          <li 
            key={'reg_'+item.id}
            className="cursor-pointer capitalize hover:text-red-700 transition-all duration-300"
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
        <h1 className="text-2x1 text-center font-semibold">
          Pokemon
          
        </h1>

        <div className="flex gap-4 flex-wrap">
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
