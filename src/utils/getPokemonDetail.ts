import { pokeApi } from '@/api'
import { PokemonDetail } from '@/interfaces'

export const getPokemonDetail = async ( id: string ) => {

    try {
        const { data } = await  pokeApi.get<PokemonDetail>(`/pokemon/${id}`)

        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites
        }

    } catch (error) {
        return null
    }

}

