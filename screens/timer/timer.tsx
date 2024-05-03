// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import EditSVGR from './icons/editSVGR';
import RestartSVGR from './icons/restartSVGR';
import Circle_ProgressBar, { progressBarStatus } from '../../components/circle_progressBar';
import Timer_Component from '../../components/timer_component';
import { useEffect, useRef, useState } from 'react';
import { timerStatus } from '../../components/timer_component';
import { VW, myDimention } from '../../Tools/DimentionTools';
import { useNavigation } from '@react-navigation/native';
import { Storage_Add, Storage_Get } from '../../Tools/StorageTools';
import { setting_data } from '../settings/setting';
import { useKeepAwake } from 'expo-keep-awake';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../Variables/colors';
import Popup from '../../components/popup/popup';
import Toast from 'react-native-root-toast';
import { useExercise, useSet } from '../../contexts/myProvider';

let RefreshRestTimer = true

export default function Timer(props: any) {
  useKeepAwake();

  const [timerStart, setTimerStart] = useState<timerStatus>('idle')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [startProgressBar, setStartProgressBar] = useState<progressBarStatus>('idle')
  const [trigger, setTrigger] = useState<any>(0)
  const [set, setSet] = useState<string>('1')
  const [move, setMove] = useState<string>('1')
  const [totalRestTimer, setTotalRestTimer] = useState<number>(60)
  const [setsNumber, setSetsNumber] = useState<number>(4)
  const [popup, setPopup] = useState<boolean>(false)
  const { sett, setSett } = useSet()
  const { excercisee, setExcercisee } = useExercise()

  const editView = useRef(null)
  const navigation = useNavigation()

  useEffect(() => {
    navigation.addListener('blur', () => {

    });
    navigation.addListener('focus', () => {
      UpdateData()
    });
  }, [navigation]);

  useEffect(() => {
    setSett(set)
    setExcercisee(move)
  }, [set, move])

  async function UpdateData() {
    const data = await Storage_Get<setting_data>('setting')
    console.log('Timer: ', data);
    setSetsNumber(+data.sets || 4)
    setTotalRestTimer(+data.rest || 60)
  }

  return (
    <>
      <StatusBar backgroundColor={Colors.Timer.red} />

      <View style={styles.container}>

        {/* Background ----------------------------------------- */}
        <LinearGradient
          colors={[Colors.Timer.red, Colors.Timer.blue]}
          style={styles.linearGradient}
          locations={[.5, .5]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
        </LinearGradient>

        {/* ProgressBar ---------------------------------------- */}
        <Circle_ProgressBar total={totalRestTimer} status={startProgressBar} trigger={trigger} />

        {/* Timer ---------------------------------------------- */}
        <View style={styles.timerView}>
          {/* Timer */}
          <Timer_Component command={timerStart} />
          {/* Sets */}
          <View style={styles.setsView}>
            <Pressable style={styles.set}>
              <Image width={35} height={35} source={require('./icons/dumbell.png')} style={styles.setImage} />
              <TextInput value={set} onChangeText={(x) => setSet(x)} keyboardType='numeric' style={styles.input} />
            </Pressable>
            <Pressable style={styles.set}>
              <Image width={35} height={35} source={require('./icons/set.png')} style={styles.setImage} />
              <TextInput value={move} onChangeText={(x) => setMove(x)} keyboardType='numeric' style={styles.input} />
            </Pressable>
          </View>
        </View>

        {/* Icons ---------------------------------------------- */}
        <TouchableOpacity
          onPress={() => {
            setPopup(true)
          }}
          style={styles.setting}
        >
          <Image width={35} height={35} source={require('./icons/dots.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (editMode) {
              let toast = Toast.show('Edit mode turned off', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'black',
                textColor: 'white'
              })
              toast
            } else {
              let toast = Toast.show('Edit mode turned on', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'green',
                textColor: 'black'
              })
              toast
            }
            setEditMode(!editMode)
          }}
          style={styles.edit}
        >
          <EditSVGR width={35} height={35} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            try {
              await UpdateData()
              setTimerStart('restart')
              setStartProgressBar('reset')
              setSet('1')
              setMove('1')
            } catch (error) {
              console.log('restart_index_error: ', error);
            }
          }}
          style={styles.restart}
        >
          <RestartSVGR width={45} height={45} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (timerStart === 'start') {
              setTimerStart('pause')
              setStartProgressBar('pause')
            } else {
              setTimerStart('start')
              setStartProgressBar('resume')
            }
          }}
          style={styles.play}
        >
          <Image width={35} height={35} source={timerStart === 'start' ? require('./icons/pause.png') : require('./icons/play.png')} style={styles.image} />
        </TouchableOpacity>

        {/* Edit layer ------------------------------------------- */}
        {!editMode && <View
          ref={editView}
          style={styles.editProtector}
          onTouchStart={async () => {
            if (!RefreshRestTimer) return
            if (timerStart !== 'start') return;
            await UpdateData()
            if (+set >= setsNumber) {
              setSet('1')
              setMove(pre => `${+pre + 1}`)
            } else {
              setSet(pre => `${+pre + 1}`)
            }
            if (startProgressBar === 'start' || startProgressBar === 'refresh' || startProgressBar === 'resume') {
              setStartProgressBar('refresh')
              setTrigger(Math.random())
            } else {
              setStartProgressBar('start')
              setTrigger(Math.random())
            }
            RefreshRestTimer = false
            setTimeout(() => {
              RefreshRestTimer = true
            }, 1500);
          }}
        >
        </View>}

        {/* Popup ---------------------------------------------- */}
        {popup && <Popup cb={setPopup}>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('History')
            }}
            style={styles.popup}
          >
            <Text style={styles.popup_button}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={(x) => {
              x.stopPropagation()
              props.navigation.navigate('Setting')
              console.log('setting');

            }}
          >
            <Text style={styles.popup_button}>Setting</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Info')
            }}
          >
            <Text style={styles.popup_button}>Info</Text>
          </TouchableOpacity>

        </Popup>}

      </View>
    </>
  );
}

export const imageSize = 35;
export const imageTop = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    // borderWidth: 5,
    // borderColor: 'red',
  },

  setting: {
    position: 'absolute',
    right: imageTop,
    top: imageTop,
  },
  edit: {
    position: 'absolute',
    left: imageTop,
    top: imageTop,
  },
  restart: {
    position: 'absolute',
    right: imageTop,
    bottom: imageTop,
  },
  play: {
    position: 'absolute',
    left: imageTop,
    bottom: imageTop,
  },
  image: {
    width: imageSize,
    height: imageSize,
    // objectFit: 'fill',
    resizeMode: 'contain'
  },

  input: {
    width: '100%',
    textAlign: 'center',
    fontSize: VW(8),
    color: 'white',
    padding: 0,
    margin: 0,
  },

  timerView: {
    position: 'absolute',
    top: '40%',
    display: 'flex',
    flexDirection: 'column',
  },

  set: {
    // borderWidth: 1,
    // borderColor: 'black'
  },
  setImage: {
    width: VW(15),
    height: VW(15),
    // objectFit: 'fill',
    resizeMode: 'contain'
  },
  setsView: {
    // position: 'absolute',
    // left: 0,
    // top: widthDimention / 6,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: VW(15),
    paddingTop: VW(3)
  },

  editProtector: {
    position: 'absolute',
    left: 0,
    top: imageSize + 10,
    // backgroundColor: 'red',
    width: myDimention('width'),
    height: myDimention('height') - ((imageSize * 2) + 30) - (StatusBar.currentHeight || 0)
  },

  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },

  popup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: VW(5)
  },
  popup_button: {
    width: '100%',
    fontSize: VW(5),
  }
});
