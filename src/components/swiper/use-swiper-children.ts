import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import SwiperIndicator from "./swiper-indicator";
import SwiperItem from "./swiper-item";

interface SwiperChildren {
  items: ReactNode[]
  indicator: ReactNode
  count: number
}

const useSwiperChildren = (children: ReactNode): SwiperChildren => {
  const __children__: SwiperChildren = {
    items: [],
    indicator: undefined,
    count: 0
  }

  Children.forEach(children, (child: ReactNode, index: number) => {
    if (!isValidElement(child)) {
      return
    }
    const element = child as ReactElement
    const elementType = element.type
    if (elementType === SwiperIndicator) {
      __children__.indicator = element
    } else if (elementType === SwiperItem) {
      const { key } = element

      __children__.items.push(
        cloneElement(element, {
          ...element.props,
          key: key ?? index,
          __dataIndex__: index++
        }),
      )
    } else {
      __children__.items.push(element)
    }
  })

  __children__.count = __children__.items.length
  return __children__
}

export {
  useSwiperChildren
}
