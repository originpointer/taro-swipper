import { useRef } from "react"

type UseRenderedCallback<T> = () => T
const useRenderedRef = <T>(callback: UseRenderedCallback<T>): React.MutableRefObject<T | undefined> => {
  const stateRef = useRef<T>()
  if (callback) {
    stateRef.current = callback()
  }
  return stateRef
}

export {
  useRenderedRef
}
