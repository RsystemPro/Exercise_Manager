//npm i --save react-native-circular-progress react-native-svg

import { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from "react-native-circular-progress";

let loading_circle_data = {
    loaded: 0
}

interface props {
    loaded?: number
    endCallback?: () => void
    total?: number
}

const widthDimention = Dimensions.get('window').width
const heightDimention = Dimensions.get('window').height
const smallerDimention = widthDimention < heightDimention ? widthDimention : heightDimention

export default function Circle_ProgressBar({ loaded = 0, total = 100, endCallback }: props) {
    const circular_progress = useRef(null)
    const inner_circle = useRef(null)

    const percent = Math.ceil((+loaded * 100) / total)

    return (
        <View ref={circular_progress} style={styles.circular_progress}>
            <AnimatedCircularProgress
                size={smallerDimention}
                width={40}
                fill={percent}
                tintColor="lime"
                backgroundColor="white"
                rotation={0}
            >
            </AnimatedCircularProgress>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circular_progress: {
        position: 'absolute',
        width: smallerDimention - 20,
        height: smallerDimention - 20,
        borderRadius: smallerDimention / 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
});