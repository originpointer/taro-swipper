import { useCallback, useMemo, useRef } from "react"
import { useUpdate } from "~/hooks"

type UseRenderedCallback<T> = () => T
const useRenderedRef = <T>(callback: UseRenderedCallback<T>): React.MutableRefObject<T | undefined> => {
  const stateRef = useRef<T>()
  if (callback) {
    stateRef.current = callback()
  }
  return stateRef
}

interface UseValueOptions<T> {
  defaultValue?: T
  initialValue?: T
  value?: T

  onChange?: (...args: any[]) => void
}
interface UseValueReturn<T> {
  value: T | undefined
  getValue: () => T
  setValue: (newValue: T, emitChange?: (value: T) => void) => void
}
/**
 * 1. 变更缓存的值 stateRef
 * 2. 引发渲染 相当于 setState
 * 3. 通知回调
 * @param options
 * @returns
 */
const useValue = <T>(options: UseValueOptions<T> = {}): UseValueReturn<T> => {
  const { defaultValue, value, initialValue, onChange} = options
  const update = useUpdate()
  const stateRef = useRef<T>(defaultValue ?? value ?? initialValue ?? {} as T)

  const setValue = useCallback(() => {}, [])
  const getValue = useCallback(() => stateRef.current, [])

  return useMemo<UseValueReturn<T>>(
    () => ({ value: stateRef.current, getValue, setValue }),
    [stateRef.current, getValue, setValue]
  )
}

export {
  useRenderedRef
}
