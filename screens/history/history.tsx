import { StyleSheet, View, StatusBar, Text, ScrollView, Alert, TouchableOpacity, Pressable, Image } from 'react-native';
import { VW } from '../../Tools/DimentionTools';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../Variables/colors';
import { SQLite_GetTable, SQLite_RemoveItem } from '../../Tools/SQLite';

export interface setting_data {
  sets: string
  rest: string
  restV: boolean
  restS: boolean
}

export default function History(props: any) {
  const [historyData, setHistoryData] = useState([])
  const nav = useNavigation()

  useEffect(() => {
    GetData()
  }, [])

  function GetData() {
    SQLite_GetTable('history').then((x: any) => {
      const json = x._array
      setHistoryData(json.reverse())
    })
  }

  function Item({ time, timer, set, exercise }: any) {

    function ClickHandler() {

      Alert.alert(
        'Remove',
        'Are you sure to remove this item?',
        [
          {
            text: 'No',
            onPress: () => {
              // Handle "No" button press
            },
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              SQLite_RemoveItem(time, timer).then(() => {
                console.log('success');
                GetData()
              }).catch((er) => {
                console.log(er);
              })
            },
          },
        ],
        { cancelable: false }
      );
    }

    try {
      const jsonTimer = JSON.parse(timer)
      const timerr = jsonTimer.hour + ':' + jsonTimer.min + ':' + jsonTimer.sec + ':' + jsonTimer.mil
      return (
        <View style={styles.item_container} onTouchEnd={ClickHandler} >
          <Text style={styles.item_timer}>{timerr}</Text>
          <Text style={styles.item_time}>{time}</Text>
          <View style={styles.iconsStyle}>
            <Pressable style={styles.set}>
              <Image width={35} height={35} source={require('./icons/dumbell.png')} style={styles.setImage} />
              <Text>{set}</Text>
            </Pressable>
            <Pressable style={styles.set}>
              <Image width={35} height={35} source={require('./icons/set.png')} style={styles.setImage} />
              <Text>{exercise}</Text>
            </Pressable>
          </View>
        </View>
      );
    } catch (error) {

    }
  }

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          {historyData.length > 0 && historyData.map((x: any, y: number) => <Item key={y} timer={x.timer} time={x.time} set={x.set_col} exercise={x.exercise} />)}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    width: '100%',
    // height: myDimention('height'),
    backgroundColor: Colors.Setting.background,
    alignItems: 'center',
    overflow: 'scroll',
    // gap: 15,
  },
  scroll: {
    width: '100%',
    height: '100%',
    // height: myDimention('height'),
    // padding: VW(5),
    // backgroundColor: 'blue',
    paddingHorizontal: VW(5),
    marginBottom: 10
  },
  item_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: VW(5),
    // elevation: 5,
    padding: VW(5),
    width: '100%'
  },
  item_timer: {
    fontSize: VW(8)
  },
  item_time: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    fontSize: VW(3)
  },
  setImage: {
    width: VW(5),
    height: VW(5),
    // objectFit: 'fill',
    resizeMode: 'contain'
  },
  set: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconsStyle: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 0,
    gap: 8
  }
});
