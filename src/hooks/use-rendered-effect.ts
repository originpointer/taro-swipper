import { nextTick } from "@tarojs/taro";
import { DependencyList, EffectCallback, useEffect, useRef } from "react";
import _isFunction from 'lodash/isFunction'

const useRenderedEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const destructorRef = useRef<() => void>()

  useEffect(
    () => {
      nextTick(() => {
        const destructor = effect?.()
        if (_isFunction(destructor)) {
          destructorRef.current = destructor
        }
      })

      return destructorRef.current
    },
    deps
  )
}
