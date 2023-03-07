import { gql } from '@apollo/client';

export const GET_POKEMON_DETAILS = gql`
    query pokemonDetails($pokemonId: Int) {
        pokemonDetails: pokemon_v2_pokemonspecies(where: {id: {_eq: $pokemonId}}) {
            name,
            id,
            pokemon_v2_pokemons {
                pokemon_v2_pokemonsprites {
                    sprites
                }
            }
        }
    }
`
