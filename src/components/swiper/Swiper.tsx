import { ViewProps } from '@tarojs/components/types/View'
import { FC } from '@tarojs/taro'
import { ITouchEvent, View } from '@tarojs/components'
import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react'
import _clamp from 'lodash/clamp'
import { useUpdate } from '~/hooks'

import { useTouch } from './utils/touch'
import { SwiperDirection } from './swiper.shared'
import { addUnitPx, unitToPx } from './utils/format/unit'
import { useRenderedRef } from './utils/state'
import { getRect } from './utils/dom/rect'

export interface SwiperProps extends ViewProps {
  touchable?: boolean
  direction?: SwiperDirection
}

const Swiper: FC<SwiperProps> = (props) => {
  const { touchable = true, direction, ...restProps } = props

  const vertical = direction === 'vertical'

  const rootRef = useRef()

  // 用于描述矩形范围
  const rectRef = useRef()

  const touch = useTouch()

  const update = useUpdate()

  const [offset, setOffset] = useState(0)

  const activeIndexRef = useRef<number>(0)

  const [swiperTag, setSwiperTag] = useState(0)

  const getTargetActive = useCallback((pace: number) => {
    if (pace) {
      return
    }
    return activeIndexRef.current
  }, [])

  const minOffsetRef = useRenderedRef(() => {
    if (rectRef.current) {
    }
    return 0
  })
  // const maxCountRef = useRenderedRef(() => {
  //   Math.ceil(Math.abs())
  // })

  const getTrackRect = useCallback(
    () => {
      // Promise.all([])
      getRect(rootRef).then(rect => {
        console.log(`sodalog rect`, rect)
      })
    },
    []
  )
  const initialize = useCallback(
    async () => {
      if (!rootRef.current) return

      await getTrackRect()
    },
    [getTrackRect]
  )

  useMounted(initialize)

  const moveTo = useCallback(({ pace = 0, offset = 0, emitChange = false }) => {
    const targetActive = getTargetActive(pace)
    // _clamp(activeIndexRef.current + pace, 0, maxCountRef.current)
  }, [])

  const onTouchStart = useCallback(
    (event: ITouchEvent) => {
      if (!touchable) {
        return
      }

      touch.start(event);

    },
    [touch, touchable],
  )
  const onTouchMove = useCallback((event: ITouchEvent) => {
    touch.move(event)
  }, [touch])
  const onTouchEnd = useCallback(() => {
    const duration = Date.now() - touch.touchStartTime
    console.log(`duration`, duration)
  }, [touch.touchStartTime])

  const trackStyle = useMemo(() => {
    const style: CSSProperties = {
      transitionDuration: `0ms`,
      transform: `translate${vertical ? 'Y' : 'X'}(${addUnitPx(offset)})`

    }
    return style;
  }, [offset, vertical])

  console.log(`addUnitPx(offset)`, addUnitPx(offset))

  console.log(`trackStyle`, trackStyle)

  return (
    <View ref={rootRef} {...restProps}>
      <View
        catchMove
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        style={{ height: '100%' }}
      >
        hello world {swiperTag}
      </View>
    </View>
  )
}

export default Swiper
