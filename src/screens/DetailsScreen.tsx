import { StyleSheet, View, Text} from 'react-native'

export default function DetailsScreen({route, navigation}: any) {
    const { pokemonId }= route.params;
    
    return (
        <View style={styles.detailsContainer}>
            <Text>{pokemonId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {

    }
});
