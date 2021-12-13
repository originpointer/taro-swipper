import { createNodesRef, elementUnref, isRootElement } from "./element"

export interface Rect {
  dataset?: Record<string, any>
  id?: string
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}

const makeRect = (width: number, height: number): Rect => {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  }
}

const getRect = (elementOrRef: any): Promise<Rect> => {
  const element = elementUnref(elementOrRef)

  if (element) {
    return new Promise<Rect>((resolve) => {
      const nodeRef = createNodesRef(element)
      if (nodeRef) {
        nodeRef.boundingClientRect()
        .exec(([rect]) => {
          if (isRootElement(element)) {
            const { width, height } = rect
            resolve(makeRect(width, height))
          } else {
            resolve(rect)
          }
        })
      } else {
        resolve(makeRect(0, 0))
      }
    })
  }
  return Promise.resolve(makeRect(0, 0))
}

export {
  getRect
}
