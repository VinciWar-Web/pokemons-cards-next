export interface PokemonListResponse {
    count:     number;
    next?:     string;
    previous?: string;
    results:   SamllPokemon[];
}

export interface SamllPokemon {
    name: string;
    url:  string;
    id:   number;
    img:  string;
}