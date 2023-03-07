import { createStore, action, Action} from 'easy-peasy';

export interface FavouritePokemonModel {
    pokemonId: number,
    favourite: Action<FavouritePokemonModel, number>,
    unfavourite: Action<FavouritePokemonModel, void>,
}

export default createStore<FavouritePokemonModel>({
    pokemonId: 2,
    favourite: action((state, payload) => {
        state.pokemonId = payload;
    }),
    unfavourite: action((state, _) => {
        state.pokemonId = 0;
    }),
});
