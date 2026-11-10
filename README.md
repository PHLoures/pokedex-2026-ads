# Pokedex

Projeto feito em [Next.js](https://nextjs.org) para a faculdade. Lista os Pokemon por região, mostra os detalhes de cada um e permite favoritar.

## Funcionalidades

- Listagem dos Pokemon por região (Kanto, Johto, Hoenn...)
- Tela de detalhes com tipos, imagens, atributos e evoluções
- Favoritar Pokemon na listagem, salvando no banco de dados
- Página "Favoritos", que lista apenas os favoritados
- Página "Sobre"

## Como rodar

Precisa do Node 22.13 ou mais novo.

```bash
npm install
npm run dev
```

Depois é só abrir [http://localhost:3000](http://localhost:3000) no navegador.

## Tecnologias

- Next.js e React
- Tailwind CSS
- SQLite (banco de dados dos favoritos, já vem no Node)
- API de Pokemon: https://pokemon.danielpimentel.com.br

## Estrutura

```
app
  | page.js                   (listagem)
  | sobre/page.jsx            (página Sobre)
  | favoritos/page.jsx        (página Favoritos)
  | pokemon/[id]/page.jsx     (detalhes do Pokemon)
  | api/favoritos/route.js    (API que salva os favoritos no banco)
components
  | CardPokemon.jsx           (card da listagem)
  | FullPokemon.jsx           (tela de detalhes)
lib
  | db.js                     (conexão com o banco de dados)
```

Os favoritos ficam salvos no arquivo `favoritos.db`, criado automaticamente na primeira vez que o projeto roda.
