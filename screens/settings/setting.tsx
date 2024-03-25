import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Pressable } from 'react-native';

export default function Setting(props: any) {
  return (
    <View style={styles.container}>
      <Text>Setting Page</Text>
      <Pressable onPress={()=>{
        props.navigation.navigate('Timer')
      }}>
        <Text>Click</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
