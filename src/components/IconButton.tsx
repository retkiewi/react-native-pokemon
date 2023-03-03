import { View, StyleSheet, Pressable, Image } from "react-native";

export default function IconButton({iconSource, onPress}: any){
    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
            <Image style={styles.icon} source={iconSource} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e76262',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: '65%',
        height: '65%',
    },
});
