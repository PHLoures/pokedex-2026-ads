// /app/sobre.page.jsx
import Link from 'next/link'

export default function SobrePage() {

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">
                Sobre o site
            </h1>
            <p>Este site foi desenvolvido para fins acadêmicos. Não nos processe, Nintendo!</p>

            <Link 
                href="/"
                className=" font-bold cursor-pointer"
            >
                Voltar para a lista
            </Link>
        </div>
    )
}

/*
app
  | page.jsx (site.com)
  | sobre
    | page.jsx (site.com/sobre)
  | contato
    | page.jsx (site.com/contato)
  | pokemon
    | [id]
      | page.jsx (site.com/pokemon/15)
*/