import { ViewProps } from '@tarojs/components/types/View'
import { FC } from '@tarojs/taro'
import { ITouchEvent, View } from '@tarojs/components'
import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react'
import _clamp from 'lodash/clamp'
import { useRenderedEffect, useUpdate } from '~/hooks'
import { getComputedStyle } from '~/components/swiper/utils/dom/computed-style'

import { useTouch } from './utils/touch'
import { SwiperDirection } from './swiper.shared'
import { addUnitPx, unitToPx } from './utils/format/unit'
import { useRenderedRef } from './utils/state'
import { getRect, makeRect, Rect } from './utils/dom/rect'
import { useSwiperChildren } from './use-swiper-children'

export interface SwiperProps extends ViewProps {
  touchable?: boolean
  direction?: SwiperDirection
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
}

const Swiper: FC<SwiperProps> = (props) => {
  const { touchable = true, direction, children: childrenProp, value: valueProp, defaultValue, onChange: onChangeProp, ...restProps } = props

  useValue({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  })

  const { count, indicator, items} = useSwiperChildren(childrenProp)

  console.log(`count`, count)

  const vertical = direction === 'vertical'

  const rootRef = useRef()

  // 用于描述矩形范围
  const rectRef = useRef<Rect>()

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

  // 根据根节点的大小与css的设置来确定具体的组件宽高
  const getTrackRect = useCallback(
    () => Promise.all([getRect(rootRef), getComputedStyle(rootRef, ['width', 'height'])])
    .then(([rect, style]) => makeRect(
      style.width === 'auto' ? rect.width : unitToPx(style.width),
      style.height === 'auto' ? rect.height : unitToPx(style.height)
    )),
    []
  )
  const initialize = useCallback(
    () => {
      if (!rootRef.current) return

      const initRect = async () => {
        rectRef.current = await getTrackRect()

        // 如果Swiper的子项不为0 则activeIndex最大为count - 1
        if (count) {
        }


        // makeRect(
        //   computedStyle.width === 'auto' ? trackRect.width : unitToPx(style)
        // )
      }
      initRect()
    },
    [getTrackRect]
  )

  useRenderedEffect(initialize)

  const moveTo = useCallback(({ pace = 0, offset = 0, emitChange = false }) => {
    const targetActive = getTargetActive(pace)
    // _clamp(activeIndexRef.current + pace, 0, maxCountRef.current)
  }, [getTargetActive])

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
