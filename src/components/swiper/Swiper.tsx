import { ViewProps } from '@tarojs/components/types/View'
import { FC } from '@tarojs/taro'
import { ITouchEvent, View } from '@tarojs/components'
import { useCallback, useState } from 'react'
import { useUpdate } from '~/hooks'

import { useTouch } from './utils/touch'

export interface SwiperProps extends ViewProps {
  touchable?: boolean
}

const Swiper: FC<SwiperProps> = (props) => {
  const { touchable = true, ...restProps } = props

  const touch = useTouch()

  const update = useUpdate()

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

  return (
    <View {...restProps}>
      <View
        catchMove
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchCancel}
        style={{ height: '100%' }}
      >
        hello world {swiperTag}
      </View>
    </View>
  )
}

export default Swiper
