import { StyleSheet, View } from "react-native";
import { imageSize, imageTop } from "../../screens/timer/timer";
import { VW } from "../../Tools/DimentionTools";


export default function Popup({ children, cb }: any) {
    return (
        <View onTouchStart={() => cb(false)} style={styles.container}>
            <View onTouchStart={(x) => x.stopPropagation()} style={styles.sub}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9c8d8d58',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    sub: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        // minHeight: 100,
        // minWidth: '70%',
        borderRadius: 10,
        elevation: 5,
        padding: VW(5),
        top: imageSize | 0 + imageTop | 0,
        right: imageSize | 0 + imageTop | 0,
        gap: VW(2)
    },

});
