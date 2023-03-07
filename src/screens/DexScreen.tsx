import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useQuery, gql} from '@apollo/client';
import IconButton from '../components/IconButton';
import DexEntryItem from '../components/DexEntryItem';
import { useCallback } from 'react';

const GET_ALL_POKEMON = gql`
  query allPokemon($offset: Int, $limit: Int) {
   pokemon_v2_pokemon {
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    id
    name
  }
}
`

export default function DexScreen({navigation}: any) {
    const {loading, error, data, fetchMore } = useQuery(GET_ALL_POKEMON, {
        variables: {
            offset: 0,
            limit: 30,
        },
    });

    const onEnd = useCallback(() =>{
        console.warn('fetch more');
        fetchMore({
        variables:{
            offset: data.pokemon_v2_pokemonspecies.length,
            length: 5,
        }})
    },[fetchMore, data]);

    const renderDexItem = useCallback(({item}: any) => (
        <DexEntryItem 
         id={item.id}
         name={item.name} 
         onPress={() => {
         navigation.navigate('Details', {
         pokemonId: item.id,
         })}}
         types={item.pokemon_v2_pokemontypes.map((typeObj: any) => typeObj.pokemon_v2_type.name)}
        />
    ), [])

    if(loading) return (
        <View style={styles.dexContainer}>
            <Text>Loading</Text>
        </View>
    );

    if(error) return (
        <View style={styles.dexContainer}>
            <Text>Error {error.message} {error.extraInfo}</Text>
        </View>
    );

    return (
        <FlatList
            style={styles.dexContainer}
             data={data.pokemon_v2_pokemon}
             renderItem={renderDexItem}
             keyExtractor={item => item.id}
             onEndReachedThreshold={0.5}
             onEndReached={onEnd}
            />
    );
}

const styles = StyleSheet.create({
    dexContainer: {
        flex: 1,
        backgroundColor: '#ddd',
        paddingTop: 10,
    },
    
});
