import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useQuery, gql} from '@apollo/client';
import IconButton from '../components/IconButton';

const GET_ALL_POKEMON = gql`
 query samplePokeAPIquery($offset: Int, $limit: Int) {
  gen3_species: pokemon_v2_pokemonspecies(order_by: {id: asc}, offset: $offset, limit: $limit) {
    name
    id
  }
}
`

const Item = ({name}: any) => (
    <View>
        <Text style={styles.item}>{name}</Text>
    </View>
);

export default function DexScreen() {
    const {loading, error, data, fetchMore } = useQuery(GET_ALL_POKEMON, {
        variables: {
            offset: 0,
            limit: 10,
        },
    });

    if(loading) return (
        <View style={styles.dexContainer}>
            <Text>Loading</Text>
        </View>
    );

    if(error) return (
        <View style={styles.dexContainer}>
            <Text>Error {error.message}</Text>
        </View>
    );

    return (
        <View style={styles.dexContainer}>
            <IconButton onPress={() => console.log(data)}/>
            <FlatList
             data={data.gen3_species}
             renderItem={({item}) => <Item name={item.name} />}
             keyExtractor={item => item.id}
             onEndReached={() => fetchMore({
                variables:{
                    offset: data.feed.length,
                },
             })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dexContainer: {
        flex: 1,
        backgroundColor: '#ddd',
        paddingTop: 10,
    },
    item: {
        backgroundColor: '#b0b0b0',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});
