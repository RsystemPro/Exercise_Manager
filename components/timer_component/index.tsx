//npm i --save react-native-circular-progress react-native-svg

import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, AppState } from "react-native";
import { VW } from "../../Tools/DimentionTools";
import { Storage_Add, Storage_Get } from "../../Tools/StorageTools";
import { SQLite_Insert } from "../../Tools/SQLite";
import { useExercise, useSet } from "../../contexts/myProvider";

export let timer_data = {
    mil: '00',
    sec: '00',
    min: '00',
    hour: '00',
    status: 'idle'
}

export type timerStatus = 'start' | 'pause' | 'restart' | 'idle' | 'edit'
export type timerStorage = { mil: string, sec: string, min: string, hour: string }

interface props {
    command?: timerStatus
}

function SaveTimerToStorage() {
    const { mil, sec, min, hour } = timer_data
    const data = { mil, sec, min, hour }
    Storage_Add(data, 'timer')
}
async function SaveTimerToSqlite(set: string, excercise: string) {
    try {
        const { mil, sec, min, hour } = timer_data
        const data = { mil, sec, min, hour }
        const time = new Date().toLocaleString();
        await SQLite_Insert('history', time, JSON.stringify(data), set.toString(), excercise.toString())
    } catch (error) {
        console.log(error);
    }
}

export default function Timer_Component({ command = 'idle' }: props) {
    const [timer, setTimer] = useState<any>()

    const [hour, setHour] = useState<string>('00')
    const [min, setMin] = useState<string>('00')
    const [sec, setSec] = useState<string>('00')
    const [mili, setMili] = useState<string>('00')
    const [getMili, setGetMili] = useState<string>('00')

    const hour1 = useRef(null)
    const min1 = useRef(null)
    const sec1 = useRef(null)
    const mili1 = useRef(null)

    const { sett, setSett } = useSet()
    const { excercisee, setExcercisee } = useExercise()

    //save timer when close app && recover timer when start app
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (nextAppState === 'background') {
                SaveTimerToStorage()
                console.log("App is in the background");
            }

            if (nextAppState === 'active') {
                if (timer_data.status === 'idle') {
                    Storage_Get<timerStorage>('timer').then((x) => {
                        setMili(x.mil || '00')
                        setSec(x.sec || '00')
                        setMin(x.min || '00')
                        setHour(x.hour || '00')
                    })
                }
                console.log("App is in the foreground");
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        if (command === 'idle') return

        timer_data.status = command

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

    useEffect(() => {
        const checkNotZero = [+mili, +sec, +min, +hour].some(Boolean)
        if (!checkNotZero) return
        timer_data.mil = mili
        timer_data.sec = sec
        timer_data.min = min
        timer_data.hour = hour
    }, [mili, sec, min, hour])

    //Tools -----------------------------------------------------------------------------------------------
    function StartTimer() {
        let myTimer: any;
        let myMili = +mili;
        let mySec = +sec;
        let myMin = +min;
        setGetMili(Date.now().toString())
        myTimer = setInterval(() => {
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
        }, 1000)
        setTimer(myTimer)
        myTimer
    }
    function StopTimer() {
        clearInterval(timer);
        if (+mili > 0) {
            const newMili = Calculate_Mili();
            let dif = Math.abs(+newMili - +mili).toString()
            dif.length < 2 && (dif = dif + '0')
            setMili(dif.toString())
        } else {
            let dif = Calculate_Mili().toString()
            dif.length < 2 && (dif = dif + '0')
            setMili(dif)
        }
    }
    function RestartTimer() {
        timer_data.mil = Calculate_Mili().toString()
        SaveTimerToSqlite(sett, excercisee)
        clearInterval(timer)
        setHour('00')
        setMin('00')
        setSec('00')
        setMili('00')
        timer_data.mil = '00'
        timer_data.sec = '00'
        timer_data.min = '00'
        timer_data.hour = '00'
    }
    function Calculate_Mili() {
        return ((Date.now() - +getMili) % 1000).toString().substring(0, 2)
    }

    //Render ----------------------------------------------------------------------------------------------
    return (
        <View style={styles.container}>
            <TextInput value={hour} onChangeText={(x) => setHour(x)} keyboardType="numeric" ref={hour1} style={styles.text} />
            <Text style={styles.text}>:</Text>
            <TextInput value={min} onChangeText={(x) => setMin(x)} keyboardType="numeric" ref={min1} style={styles.text} />
            <Text style={styles.text}>:</Text>
            <TextInput value={sec} onChangeText={(x) => setSec(x)} keyboardType="numeric" ref={sec1} style={styles.text} />
            <Text style={styles.text}>:</Text>
            <TextInput value={mili} onChangeText={(x) => setMili(x)} keyboardType="numeric" ref={mili1} style={styles.text} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontSize: VW(11),
        color: 'white',
        fontWeight: 'bold'
    },
});