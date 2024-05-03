import { Dimensions } from "react-native"

export function VW(params: number): number {
    const widthDimention = Dimensions.get('window').width
    const vw = widthDimention * 0.01;
    const res = vw * params
    return res
}

export function VH(params: number): number {
    const heightDimention = Dimensions.get('window').height
    const vh = heightDimention * 0.01;
    const res = vh * params
    return res
}

export function SmallerDimention(): number {
    const widthDimention = Dimensions.get('window').width
    const heightDimention = Dimensions.get('window').height
    const smallerDimention = widthDimention < heightDimention ? widthDimention : heightDimention
    return smallerDimention
}

export function BiggerDimention(): number {
    const widthDimention = Dimensions.get('window').width
    const heightDimention = Dimensions.get('window').height
    const biggerDimention = widthDimention > heightDimention ? widthDimention : heightDimention
    return biggerDimention
}

export function myDimention(which: 'width' | 'height'): number {
    const widthDimention = Dimensions.get('window').width
    const heightDimention = Dimensions.get('window').height
    const res = which === 'width' ? widthDimention : heightDimention
    return res
}

