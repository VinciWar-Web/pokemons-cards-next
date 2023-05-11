import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Layout } from '@/components/layouts'

import { pokeApi } from '@/api'
import { PokemonListResponse, SamllPokemon } from '@/interfaces'
import { PokemonCard } from '@/components/pokemon'
import { Grid } from '@nextui-org/react'


interface Props {
  pokemons: SamllPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title='Listado de Pokémons'>
      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map( ( pokemon ) => (
            <PokemonCard key={ pokemon.id } pokemon={ pokemon }/>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  // Repuesta de API
  const { data } = await  pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  // Mapeamos el resultado de la API y le anexamos 2 valores( id e img )
  const pokemons: SamllPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
