import { StyleSheet, View, Text, Button } from 'react-native';
import IconButton from '../components/IconButton';

export default function HomeScreen({ navigation }: {navigation: any}) {
    return (
        <View style={styles.homeContainer}>
            <Text>Home Screen</Text>
            <View style={styles.dexButtonContainer}>
                <IconButton
                 iconSource={require('../../assets/pokedex.png')}
                 onPress={() => navigation.navigate('Dex')}
                />
            </View>
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
    }
});
