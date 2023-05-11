import { useEffect, useState } from 'react'
import { Layout } from '@/components/layouts'
import { FavoritePokemons, NoFavorite } from '@/components/ui'
import { localStorageFavorites } from '@/utils'


const FavoritesPages = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons( localStorageFavorites.pokemons() )
  }, [])
  
  return (
    <Layout title='Pokémon - Favoritos'>
      {
        favoritePokemons.length === 0
          ? 
            (<NoFavorite />)
          : 
            (<FavoritePokemons favoritePokemons={ favoritePokemons }/>)
      }
    </Layout>
  )
}

export default FavoritesPages
