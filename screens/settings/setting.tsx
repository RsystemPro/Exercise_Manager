import { StyleSheet, Text, View, TouchableWithoutFeedback, Pressable, StatusBar, TextInput, Switch } from 'react-native';
import { VW } from '../../Tools/DimentionTools';
import { Storage_Add, Storage_Get } from '../../Tools/StorageTools';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../Variables/colors';

export interface setting_data {
  sets: string
  rest: string
  restV: boolean
  restS: boolean
}

export default function Setting(props: any) {
  const [setsPH, setSetsPH] = useState<string>('4')
  const [restPH, setRestPH] = useState<string>('60')
  const [restV, setRestV] = useState<boolean>(true)
  const [restS, setRestS] = useState<boolean>(true)
  const nav = useNavigation()

  //useEffects -------------------------------------------------------------------
  useEffect(() => {
    Get_Data()
  }, [])
  useEffect(() => {
    const myEv = nav.addListener('blur', () => {
      Save_Data()
    })
    return () => {
      myEv
    }
  }, [setsPH, restPH, restV, restS, nav])

  //Functions --------------------------------------------------------------------
  async function Get_Data() {
    const dataa = await Storage_Get<setting_data>('setting')
    console.log('Setting Get: ', dataa);
    setSetsPH(dataa.sets || '4')
    setRestPH(dataa.rest || '60')
    setRestV(dataa.restV)
    setRestS(dataa.restS)
  }
  async function Save_Data() {
    const data: setting_data = {
      sets: setsPH,
      rest: restPH,
      restV: restV,
      restS: restS
    }
    await Storage_Add(data, 'setting')
    console.log('Setting Save: ', data);
  }

  return (
    <>
      <StatusBar />
      <View style={styles.container}>

        {/* Sets */}
        <View style={styles.item}>
          <Text style={styles.title}>Sets</Text>
          <View style={styles.subItems}>
            <Text style={styles.texts}>Sets Number: </Text>
            <TextInput style={styles.inputs} value={setsPH} onChangeText={(t) => setSetsPH(t)} />
          </View>
        </View>

        {/* Rest */}
        <View style={styles.item}>
          <Text style={styles.title}>Rest</Text>
          <View style={styles.subItems}>
            <Text style={styles.texts}>Rest Time: </Text>
            <TextInput style={styles.inputs} value={restPH} onChangeText={(t) => setRestPH(t)} />
          </View>
          <View style={styles.subItems}>
            <Text style={styles.texts}>Finished Vibration: </Text>
            <Switch
              trackColor={{ false: '#767577', true: 'green' }}
              thumbColor={restV ? 'lime' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setRestV(!restV)}
              value={restV}
            />
          </View>
          <View style={styles.subItems}>
            <Text style={styles.texts}>Finished Sound: </Text>
            <Switch
              trackColor={{ false: '#767577', true: 'green' }}
              thumbColor={restS ? 'lime' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(x) => setRestS(!restS)}
              value={restS}
            />
          </View>
        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Setting.background,
    alignItems: 'center',
    overflow: 'scroll',
    padding: VW(5),
    gap: 15,
  },
  item: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    position: 'relative',
    // minHeight: 100,
    padding: VW(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  },
  title: {
    position: 'absolute',
    top: -15,
    left: 20,
    backgroundColor: Colors.Setting.background,
    fontSize: 20
  },
  subItems: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  texts: {
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputs: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    minWidth: VW(15),
    fontSize: VW(5),
    textAlign: 'center'
  }
});
