import { StyleSheet, View, Text, Pressable, Image} from 'react-native';
import { useQuery } from '@apollo/client';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { SPRITE_BASE_URL } from '../consts';
import { GET_POKEMON_DETAILS } from '../queries';
import { FavouritePokemonModel } from '../state/FavouritePokemonStore';
import { capitalize, spriteToGitHubUri } from '../utils';

interface PokemonDetails {
    name: string,
    pokemon_v2_pokemons: [{
        pokemon_v2_pokemonsprites: [{
            sprites: string
        }]
    }]
}

export default function DetailsScreen({route, navigation}: any) {
    const { pokemonId, ...rest }= route.params;

    const favouritePokemonId = useStoreState<FavouritePokemonModel>((state) => state.pokemonId)

    const {error, loading, data} = useQuery(GET_POKEMON_DETAILS, {
        variables: {
            pokemonId: pokemonId,
        }
    });

    const favouritePokemon = useStoreActions<FavouritePokemonModel>((actions) => actions.favourite);
    const unfavouritePokemon = useStoreActions<FavouritePokemonModel>((actions) => actions.unfavourite);

    const handleFavouriteButton = () => {
        if (pokemonId === favouritePokemonId) {
            unfavouritePokemon();
        } else {
            favouritePokemon(pokemonId);
        }
    }

    if(error) return (
        <View>
            <Text>Error {error.message} {error.extraInfo}</Text>
        </View>
    );
    
    if( loading ) return (
        <Text>Loading...</Text>
    );
    
    const {name, pokemon_v2_pokemons: [{pokemon_v2_pokemonsprites: [{sprites: spritesJSON}]}]} = data.pokemonDetails[0];

    const sprites = JSON.parse(spritesJSON);

    return (
        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{pokemonId}. {name ? capitalize(name): '???'}</Text>
            <View style={styles.spriteContainer}>
                <Image style={styles.sprite} source={{uri: spriteToGitHubUri(sprites.other['official-artwork'].front_default)}} />
            </View>
            <Pressable style={styles.favouriteButton} onPress={handleFavouriteButton}>
                <Text style={{fontSize: 20}}>{favouritePokemonId === pokemonId ? 'Unfavourite' : 'Make Favourite'}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        padding: 20,
        gap: 5,
    },
    title: {
        paddingBottom: 5,
        fontSize: 30,
    },
    button: {
        width: 80,
        height: 80,
        backgroundColor: '#9f5454'
    },
    spriteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: '100%',
        backgroundColor: '#cbcbcb',
        borderRadius: 10,
    },
    sprite: {
        width: 250,
        height: 250,
    },
    favouriteButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#a0a0a0',
    }
});
