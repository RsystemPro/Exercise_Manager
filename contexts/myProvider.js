import { Children, createContext, useContext, useState } from "react"

const set = createContext()
const exercise = createContext()

export function useSet() {
  return useContext(set)
}
export function useExercise() {
  return useContext(exercise)
}

export function MyProvider({ children }) {
  const [sett, setSett] = useState("0")
  const [excercisee, setExcercisee] = useState("0")

  return (
    <set.Provider value={{ sett, setSett }}>
      <exercise.Provider value={{ excercisee, setExcercisee }}>
        {children}
      </exercise.Provider>
    </set.Provider>
  )
}