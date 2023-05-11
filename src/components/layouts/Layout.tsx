import { ReactNode } from 'react'
import Head from 'next/head'
import { Navbar } from '../ui';


interface Props {
    children: ReactNode;
    title?: string
}

export const Layout = ({ children, title } : Props ) => {
  return (
    <>
        <Head>
            <title>{ title || 'PokemonApp' }</title>
            <meta name="author" content="Vinci Guerra"/>
            <meta name="description" content={`Informació sobre el pokemon ${title}`}/>
            <meta name="keywords" content={`${title}, pokemon, pokedex`}/>
        </Head>

        <Navbar />

        <main style={{
          padding: '0px 20px'
        }}>
             { children } 
        </main>
    </>
  )
}
