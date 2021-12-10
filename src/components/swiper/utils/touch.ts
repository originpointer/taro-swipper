import { ITouchEvent } from '@tarojs/components'
import _cloneDeep from 'lodash/cloneDeep'
import { useCallback, useEffect, useRef } from 'react'

export enum TouchDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export interface TouchRef {
  startX: number
  startY: number
  deltaX: number
  deltaY: number
  offsetX: number
  offsetY: number
  direction?: TouchDirection

  isVertical(): boolean

  isHorizontal(): boolean

  start(event: ITouchEvent): void

  move(event: ITouchEvent): void

  reset(): void
}

const emptyFunction = () => {}

const defaultTouchRef: TouchRef = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
  isVertical: () => false,
  isHorizontal: () => false,
  start: emptyFunction,
  move: emptyFunction,
  reset: emptyFunction,
}

const useTouch = () => {
  const touchRef = useRef<TouchRef>(_cloneDeep(defaultTouchRef))

  const isVertical = useCallback(() => touchRef.current.direction === TouchDirection.Vertical, []);
  const isHorizontal = useCallback(() => touchRef.current.direction === TouchDirection.Horizontal, []);


  const reset = useCallback(() => {
    touchRef.current.deltaX = 0
    touchRef.current.deltaY = 0
    touchRef.current.offsetX = 0
    touchRef.current.offsetY = 0
    touchRef.current.direction = undefined
  }, []);

  const start = useCallback(
    (event: ITouchEvent) => {
      reset();
      touchRef.current.startX = event.touches[0].clientX
      touchRef.current.startY = event.touches[0].clientY
    },
    [reset],
  );

  const move = useCallback(
    (event: ITouchEvent) => {
      const touch = event.touches[0]

      touchRef.current.deltaX = touch.clientX < 0 ? 0 : touch.clientX - touchRef.current.startX
      touchRef.current.deltaY = touch.clientY - touchRef.current.startY
      touchRef.current.offsetX = Math.abs(touchRef.current.deltaX)
      touchRef.current.offsetY = Math.abs(touchRef.current.deltaY)

      console.log(`sodalog touchRef.current`, touchRef.current)
    },
    []
  )

  useEffect(() => {
    console.log('sodalog horizontal change')
    if (touchRef.current.isHorizontal !== isHorizontal) {
      touchRef.current.isHorizontal = isHorizontal
    }
  }, [isHorizontal])

  useEffect(() => {
    if (touchRef.current.isVertical !== isVertical) {
      touchRef.current.isVertical = isVertical
    }
  }, [isVertical])

  useEffect(() => {
    if (touchRef.current.reset !== reset) {
      touchRef.current.reset = reset
    }
  }, [reset])

  useEffect(() => {
    if (touchRef.current.start !== start) {
      touchRef.current.start = start
    }
  }, [start])

  useEffect(() => {
    if (touchRef.current.move !== move) {
      touchRef.current.move = move
    }
  }, [move])

  return touchRef.current
}


export {
  useTouch
}
