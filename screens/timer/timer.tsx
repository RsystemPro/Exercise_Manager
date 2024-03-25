import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Pressable, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';
import SettingSVG from './icons/settings.svg';
import SettingSVGR from './icons/settingSVGR';
import EditSVGR from './icons/editSVGR';
import RestartSVGR from './icons/restartSVGR';
import Circle_ProgressBar from '../../components/circle_progressBar';
import Timer_Component from '../../components/timer_component';
import { useState } from 'react';
import { timerStatus } from '../../components/timer_component';

export default function Timer(props: any) {
  const [timerStart, setTimerStart] = useState<timerStatus>('start')

  return (
    <View style={styles.container}>

      {/* ProgressBar ---------------------------------------- */}
      <Circle_ProgressBar loaded={20} total={50} />

      {/* Timer ---------------------------------------------- */}
      <Timer_Component command={timerStart} />

      {/* Icons ---------------------------------------------- */}
      <Pressable
        onPress={() => {
          props.navigation.navigate('Setting')
        }}
        style={styles.setting}
      >
        <SettingSVGR width={35} height={35} style={styles.image} />
      </Pressable>
      <Pressable
        onPress={() => {
          props.navigation.navigate('Setting')
        }}
        style={styles.edit}
      >
        <EditSVGR width={35} height={35} style={styles.image} />
      </Pressable>
      <Pressable
        onPress={() => {
          setTimerStart('restart')
        }}
        style={styles.restart}
      >
        <RestartSVGR width={45} height={45} style={styles.image} />
      </Pressable>
      <Pressable
        onPress={() => {
          timerStart === 'start' ? setTimerStart('pause') : setTimerStart('start')
        }}
        style={styles.play}
      >
        <Image width={35} height={35} source={timerStart === 'start' ? require('./icons/pause.png') : require('./icons/play.png')} style={styles.image} />
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setting: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  edit: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  restart: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  play: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  image: {
    width: 35,
    height: 35,
    // objectFit: 'fill',
    resizeMode: 'contain'
  }
});
