import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { useStoreState } from 'easy-peasy';
import { useQuery } from '@apollo/client';

import IconButton from '../components/IconButton';
import { GET_POKEMON_DETAILS } from '../queries';
import { FavouritePokemonModel } from '../state/FavouritePokemonStore';
import { spriteToGitHubUri } from '../utils';

export default function HomeScreen({ navigation }: {navigation: any}) {
    const favouritePokemonId = useStoreState<FavouritePokemonModel>((state) => state.pokemonId);

    const {error, loading, data} = useQuery(GET_POKEMON_DETAILS, {
        variables: {
            pokemonId: favouritePokemonId,
        }
    });

    const dexSharedButton = () => (
        <View style={styles.dexButtonContainer}>
            <IconButton
                iconSource={require('../../assets/pokedex.png')}
                onPress={() => navigation.navigate('Dex')}
            />
        </View>
    )

    if(error) return (
        <View style={styles.homeContainer}>
            <Text>Error {error.message}</Text>
            {dexSharedButton()}
        </View>
    );
    
    if( loading ) return (
        <View style={styles.homeContainer}>
            <Text>Loading...</Text>
        </View>
    );

    if(favouritePokemonId === 0) return (
        <View style={styles.homeContainer}>
            <Text>No favourite pokemon</Text>
            {dexSharedButton()}
        </View>
    )

    const {name, pokemon_v2_pokemons: [{pokemon_v2_pokemonsprites: [{sprites: spritesJSON}]}]} = data.pokemonDetails[0];

    const sprites = JSON.parse(spritesJSON);

    return (
        <View style={styles.homeContainer}>
            <Text style={styles.title}>{favouritePokemonId}. {name[0].toUpperCase()+name.slice(1)}</Text>
            <View style={styles.spriteContainer}>
             <Image style={styles.sprite} source={{uri: spriteToGitHubUri(sprites.other['official-artwork'].front_default)}} />
            </View>
            {dexSharedButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dexButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    title: {
        paddingBottom: 5,
        // borderRadius: 10,
        // backgroundColor: '#f19d9d',
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
        backgroundColor: '#909090'
    }
});
