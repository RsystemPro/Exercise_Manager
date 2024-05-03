import { StyleSheet, View, StatusBar, Text, ScrollView } from 'react-native';
import { VW, myDimention } from '../../Tools/DimentionTools';
import { Storage_Add, Storage_Get } from '../../Tools/StorageTools';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../Variables/colors';
import { SQLite_GetTable } from '../../Tools/SQLite';

export interface setting_data {
  sets: string
  rest: string
  restV: boolean
  restS: boolean
}

export default function Info(props: any) {
  const t1 = `این برنامه توسط اینجانب محمد رضا سید مرتضی حسینی ساخته شده`
  const t2 = `امیدوارم برای شما مفید واقع شده باشد`
  const t3 = `حتما نظرات و پیشنهادات خود را ارسال کنید`
  const t4 = `rsystempro@gmail.com`

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.text}>{t1}</Text>
        <Text style={styles.text}>{t2}</Text>
        <Text style={styles.text}>{t3}</Text>
        <Text style={styles.text}>{t4}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    width: '100%',
    height: myDimention('height'),
    backgroundColor: Colors.Setting.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
    padding: 5
    // gap: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: VW(7)
  }
});
