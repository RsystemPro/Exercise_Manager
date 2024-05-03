import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Storage_Add(object: any, name: string) {
    try {
        const jsonString = await AsyncStorage.getItem(name)
        let dataa = jsonString != null ? JSON.parse(jsonString) : {};
        for (const i in object) {
            dataa[i] = object[i]
        }
        const jsonObject = JSON.stringify(dataa)
        await AsyncStorage.setItem(name, jsonObject)
    } catch (err) {
        console.log(err);
    }
}

export async function Storage_Get<T>(data: string): Promise<T> {
    try {
        const jsonString = await AsyncStorage.getItem(data)
        let dataa = jsonString != null ? JSON.parse(jsonString) : {};
        return dataa
    } catch (err) {
        console.log(err);
        return {} as any
    }
}

