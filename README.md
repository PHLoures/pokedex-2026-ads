# Pokedex

Projeto feito em [Next.js](https://nextjs.org) para a faculdade. Lista os Pokemon por região, mostra os detalhes de cada um e permite favoritar.

## Funcionalidades

- Listagem dos Pokemon por região (Kanto, Johto, Hoenn...)
- Tela de detalhes com tipos, imagens, atributos e evoluções, com os dados vindos do banco
- Favoritar Pokemon na listagem, salvando no banco de dados
- Página "Favoritos", que lista apenas os favoritados
- Página "Sobre"

## Como rodar

Precisa do Node e do MySQL instalados.

1. Criar o banco de dados `pokemon` no MySQL e importar o arquivo `pokemon.sql`:

```bash
mysql -uroot -e "CREATE DATABASE pokemon"
mysql -uroot pokemon < pokemon.sql
```

2. Conferir o usuário e a senha do MySQL no arquivo `lib/db.js`.

3. Instalar as dependências e rodar:

```bash
npm install
npm run dev
```

Depois é só abrir [http://localhost:3000](http://localhost:3000) no navegador.

## Tecnologias

- Next.js e React
- Tailwind CSS
- MySQL (banco de dados `pokemon`, com a biblioteca mysql2)
- API de Pokemon: https://pokemon.danielpimentel.com.br

## Estrutura

```
app
  | page.js                   (listagem)
  | sobre/page.jsx            (página Sobre)
  | favoritos/page.jsx        (página Favoritos)
  | pokemon/[id]/page.jsx     (detalhes do Pokemon)
  | api/favoritos/route.js    (API que salva os favoritos no banco)
  | api/pokemon/[numero]/route.js (API que busca um Pokemon no banco)
components
  | CardPokemon.jsx           (card da listagem)
  | FullPokemon.jsx           (tela de detalhes)
lib
  | db.js                     (conexão com o banco de dados)
```

Os favoritos ficam salvos na tabela `favoritos` do banco `pokemon`, criada automaticamente na primeira vez que o projeto roda.
