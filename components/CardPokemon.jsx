// components/CardPokemon.jsx
// favorito     -> true ou false: diz se este pokemon já está favoritado
// onFavoritar  -> função chamada quando clicam na estrela
// onRemove     -> função do botão Remover (se não for passada, o botão não aparece)
export default function CardPokemon({pokemon, onRemove, onSelected, favorito, onFavoritar}){


    return(
        <div className="border-gray-100 border rounded-xl border-sky-800 p-5 ">
            <img
                className="whidth h-50 cursor-pointer"
                src={pokemon.img}
                onClick={() => onSelected(pokemon.numero)}
            />
            <h2
                className="text-center capitalize font-semibold mt-1.5 cursor-pointer"
                onClick={() => onSelected(pokemon.numero)}
            >
                {pokemon.nome}
            </h2>

            <div className="text-xs mt-2 flex justify-between">
                <span>Altura: </span>
                <span className="font-semibold">{pokemon.altura}cm</span>
                <span>Peso: </span>
                <span className="font-semibold">{pokemon.peso / 1000}kg</span>
            </div>

            <div className="flex justify-between items-center mt-4">
                {onRemove && (
                    <button className=" text xl bg-red-600 text-white py-1 px-2 rounded-2xl cursor-pointer" onClick={()=> onRemove(pokemon.numero)}>Remover</button>
                )}

                {/* Estrela cheia se for favorito, vazia se não for */}
                <button
                    className="text-2xl text-yellow-500 cursor-pointer"
                    title={favorito ? "Tirar dos favoritos" : "Favoritar"}
                    onClick={() => onFavoritar(pokemon)}
                >
                    {favorito ? "★" : "☆"}
                </button>
            </div>

        </div>


    )
}
