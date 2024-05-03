//npm i --save react-native-circular-progress react-native-svg

import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Vibration, Platform } from "react-native";
import { Dimensions } from 'react-native';
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Audio } from 'expo-av';
import { Storage_Get } from "../../Tools/StorageTools";
import { setting_data } from "../../screens/settings/setting";
import { Colors } from "../../Variables/colors";

export type progressBarStatus = 'start' | 'pause' | 'reset' | 'idle' | 'refresh' | 'stop' | 'resume'

interface props {
    loaded?: number
    endCallback?: () => void
    total?: number
    status?: progressBarStatus
    trigger?: any
    sound?: boolean
    vibration?: boolean
}

const widthDimention = Dimensions.get('window').width
const heightDimention = Dimensions.get('window').height
const smallerDimention = widthDimention < heightDimention ? widthDimention : heightDimention

let Started = false
let Timer: any = null
let myPre = 0

export default function Circle_ProgressBar({ loaded = 0, total = 100, status = 'idle', trigger, vibration, sound, endCallback }: props) {
    const circular_progress = useRef(null)
    const [currentTimer, setCurrentTimer] = useState<number>(0)
    const [progressColor, setProgressColor] = useState<any>(Colors.ProgressBar.green)
    const [progressBGColor, setProgressBGColor] = useState<any>('white')
    const [mySound, setSound] = useState<any>(undefined)

    useEffect(() => {
        if (!mySound) LoadingSounds()
        if (status === 'idle') return
        switch (status) {
            case 'start':
                Start()
                break;
            case 'pause':
                Pause()
                break;
            case 'reset':
                Restart()
                break;
            case 'refresh':
                Refresh()
                break;
            case 'resume':
                Resume()
                break;
            default:
                break;
        }
    }, [status, trigger, sound, vibration])

    async function Start() {
        if (Started) return

        Started = true
        const one = (1 * 100) / total
        setProgressBGColor('white')
        let soundPlaying = false
        LoadingSounds()

        const myTimer = setInterval(() => {
            myPre++
            setCurrentTimer(pre => (+pre) + (+one))
            if (myPre >= (total - total / 3)) {
                setProgressColor(Colors.ProgressBar.orange)
            } else {
                setProgressColor(Colors.ProgressBar.green)
            }
            if (myPre >= total - 3) {
                setProgressColor(Colors.ProgressBar.red)
                if (!soundPlaying) {
                    soundPlaying = true
                    Sound('start')
                    Vibrationn('start')
                    setTimeout(() => {
                        mySound.unloadAsync();
                    }, 3500);
                }
            }
            if (myPre >= total) {
                Started = false
                myPre = 0;
                soundPlaying = false
                setCurrentTimer(0)
                setProgressBGColor(Colors.ProgressBar.red)
                clearInterval(Timer)
            }
        }, 1000)

        Timer = myTimer
        myTimer
    }
    function Pause() {
        Started = false
        clearInterval(Timer)
    }
    function Resume() {
        Started = false
        clearInterval(Timer)
        if (myPre !== 0) {
            Start()
        }
    }
    function Restart() {
        Pause()
        setProgressBGColor('white')
        setCurrentTimer(0)
        myPre = 0;
    }
    function Refresh() {
        Pause()
        setCurrentTimer(0)
        myPre = 0;
        Start()
    }
    async function LoadingSounds() {
        const { sound } = await Audio.Sound.createAsync(require('./media/countdown.mp3'))
        setSound(sound);
    }
    async function Sound(type: 'ready' | 'start') {
        const data = await Storage_Get<setting_data>('setting')
        if (!data.restS) return
        await mySound.playAsync();
    }
    async function Vibrationn(type: 'ready' | 'start') {
        const data = await Storage_Get<setting_data>('setting')
        if (!data.restV) return
        const PATTERN = [
            0,
            150,
            1000,
            150,
            1000,
            150,
            1000,
            1000
        ];
        Vibration.vibrate(PATTERN)
    }

    return (
        <View ref={circular_progress} style={styles.circular_progress}>
            <AnimatedCircularProgress
                size={smallerDimention}
                width={40}
                fill={currentTimer}
                tintColor={progressColor}
                backgroundColor={progressBGColor}
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