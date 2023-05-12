import { useState } from 'react'
import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'
import confetti from 'canvas-confetti'

import { PokemonDetail } from '@/interfaces'
import { Layout } from '@/components/layouts'
import { localStorageFavorites } from '@/utils'
import { getPokemonDetail } from '@/utils/getPokemonDetail'

interface Props {
  pokemon: PokemonDetail
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorite, setIsInFavorite] = useState(localStorageFavorites.existInFavorite( pokemon.id ))

  const onToggleFavorite = () => {
    localStorageFavorites.toggleFavorite( pokemon.id )
    setIsInFavorite( !isInFavorite )

    if( isInFavorite ) return

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 }
    });

  }

  return (
    <Layout title={ pokemon.name }>

      <Grid.Container css={{ marginTop: '5px' }} gap={2} >
        <Grid xs={ 12 } sm={ 4 }>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image 
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={ 12 } sm={ 8 }>
          <Card>

            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text 
                h1 
                transform='capitalize'
              >
                  { pokemon.name }
              </Text>
              <Button
                color="gradient"
                ghost={ !isInFavorite }
                onClick={onToggleFavorite}
              >
                { isInFavorite ? 'En Favorito' : 'Guardar en favoritos' }
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Detalles:</Text>
              <Container direction='row' display='flex' gap={ 0 }>
                <Image 
                  src={ pokemon.sprites.front_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image 
                  src={ pokemon.sprites.back_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image 
                  src={ pokemon.sprites.front_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image 
                  src={ pokemon.sprites.back_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  )
}



export const getStaticPaths: GetStaticPaths = async (ctx) => {

  // Creamos una lista de id con el index dentro de un Array
  const pokemons151 = [...Array(151)].map(( value, index ) => `${ index + 1 }`)

  return {
    paths: pokemons151.map( id => ({
      params: { id }
    })),
    fallback: false
  }
}



// Desestructuramos el params del ctx
export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string }
  
  const pokemon = await getPokemonDetail( id )

  // if (!pokemon) {
  //   return {
  //       redirect: {
  //         destination: '/',
  //         permanent: false
  //       }
  //   };
  // }

  return {
    props: {
      pokemon: pokemon
    },
    revalidate: 86400 // Cada 24 Horas Actualizamos la pagina
  }
}

export default PokemonPage
