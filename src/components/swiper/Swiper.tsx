import { ViewProps } from '@tarojs/components/types/View'
import { FC } from '@tarojs/taro'
import { ITouchEvent, View } from '@tarojs/components'
import { CSSProperties, useCallback, useMemo, useState } from 'react'
import { useUpdate } from '~/hooks'

import { useTouch } from './utils/touch'
import { SwiperDirection } from './swiper.shared'
import { addUnitPx, unitToPx } from './utils/format/unit'

export interface SwiperProps extends ViewProps {
  touchable?: boolean
  direction?: SwiperDirection
}

const Swiper: FC<SwiperProps> = (props) => {
  const { touchable = true, direction, ...restProps } = props

  const vertical = direction === 'vertical'

  const touch = useTouch()

  const update = useUpdate()

  const [offset, setOffset] = useState(0)

  const [swiperTag, setSwiperTag] = useState(0)

  const onTouchStart = useCallback(
    (event: ITouchEvent) => {
      if (!touchable) {
        return
      }
    },
    [touchable],
  )
  const onTouchMove = useCallback((event: ITouchEvent) => {
    touch.move(event)
  }, [touch])
  const onTouchCancel = useCallback(() => {
    console.log('sodalog onTouch cancel')
  }, [])

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
    <View {...restProps}>
      <View
        catchMove
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchCancel}
        style={trackStyle}
      >
        hello world {swiperTag}
      </View>
    </View>
  )
}

export default Swiper

