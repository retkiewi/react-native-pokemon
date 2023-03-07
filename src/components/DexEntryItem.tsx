import {View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native';
import { TYPE_ICON_MAP } from '../consts';
import { capitalize } from '../utils';

export default function DexEntryItem({id, name, onPress, types=['bug', 'dark']}: {id: number, name: string, onPress: any, types: (keyof typeof TYPE_ICON_MAP)[]}) {
    return (
        <Pressable style={styles.itemContainer} onPress={onPress}>
            <Text style={styles.pokemonName}>{id}.  {capitalize(name)}</Text>
            <FlatList 
                horizontal
                data={types}
                style={styles.typeList}
                renderItem={({item: icon, index}) => {
                    return (
                        <Image
                        style={styles.typeIcon}
                        source={TYPE_ICON_MAP[icon]}
                        key={index}
                        />
                    )
                }}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#b0b0b0',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
    },
    pokemonName: {
        fontSize: 18,
    },
    typeList: {
        marginLeft: 'auto',
        flex: 1,
        flexDirection: 'row-reverse',
    },
    typeIcon: {
        width: 25,
        height: 25,
        marginLeft: 3,
    },
})
