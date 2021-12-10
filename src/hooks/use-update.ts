import { useReducer } from 'react'

const updateReducer = (num: number): number => (num + 1) % 1_000_000;

const useUpdate = () => {
  const [value, update] = useReducer(updateReducer, 0)
  console.log(`update value: ${value}`)
  return update;
}

export default useUpdate
