//npm i --save react-native-circular-progress react-native-svg

import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from "react-native-circular-progress";

let loading_circle_data = {
    loaded: 0
}

export type timerStatus = 'start' | 'pause' | 'restart' | 'idle' | 'edit'

interface props {
    command?: timerStatus
}

const widthDimention = Dimensions.get('window').width
const heightDimention = Dimensions.get('window').height
const smallerDimention = widthDimention < heightDimention ? widthDimention : heightDimention

export default function Timer_Component({ command = 'idle' }: props) {
    const [timer, setTimer] = useState<any>()

    const [hour, setHour] = useState<string>('00')
    const [min, setMin] = useState<string>('00')
    const [sec, setSec] = useState<string>('00')
    const [mili, setMili] = useState<string>('00')

    const hour1 = useRef(null)
    const min1 = useRef(null)
    const sec1 = useRef(null)
    const mili1 = useRef(null)

    useEffect(() => {
        if (command === 'idle') return

        if (command === 'restart') {
            RestartTimer()
            return;
        }
        if (command === 'pause') {
            StopTimer()
            return;
        }
        if (command === 'start') {
            StartTimer()
        }

        return () => clearInterval(timer);
    }, [command])

    //Tools -----------------------------------------------------------------------------------------------
    function StartTimer() {
        let myTimer: any;
        let myMili = +mili;
        let mySec = +sec;
        let myMin = +min;
        myTimer = setInterval(() => {
            if (+myMili < 90) {
                myMili++
                setMili(pre => +pre < 9 ? `0${+pre + 1}` : `${+pre + 1}`);
            } else {
                myMili = 0
                setMili('00')
                if (+mySec < 59) {
                    mySec++
                    setSec(pre => +pre < 9 ? `0${+pre + 1}` : `${+pre + 1}`);
                } else {
                    mySec = 0
                    setSec('00')
                    if (myMin < 59) {
                        myMin++
                        setMin(pre => +pre < 9 ? `0${+pre + 1}` : `${+pre + 1}`)
                    } else {
                        myMin = 0
                        setMin('00')
                        setHour(pre => +pre < 9 ? `0${+pre + 1}` : `${+pre + 1}`)
                    }
                }
            }
        }, 100)
        setTimer(myTimer)
        myTimer
    }
    function StopTimer() {
        clearInterval(timer);
    }
    function RestartTimer() {
        clearInterval(timer)
        setHour('00')
        setMin('00')
        setSec('00')
        setMili('00')
    }

    //Render ----------------------------------------------------------------------------------------------
    return (
        <View style={styles.container}>
            <TextInput value={hour} keyboardType="numeric" readOnly={true} ref={hour1} style={styles.text} />
            <Text style={styles.text}>:</Text>
            <TextInput value={min} keyboardType="numeric" readOnly={true} ref={min1} style={styles.text} />
            <Text style={styles.text}>:</Text>
            <TextInput value={sec} keyboardType="numeric" readOnly={true} ref={sec1} style={styles.text} />
            <Text style={styles.text}>:</Text>
            <TextInput value={mili} keyboardType="numeric" readOnly={true} ref={mili1} style={styles.text} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 40,
        color: 'black'
    },
});