import { TaroElement, TaroNode } from "@tarojs/runtime";
import { createSelectorQuery } from "@tarojs/taro";

export const ELEMENT_NODE_TYPE = 1

const elementUnref = (elementOrRef: any): TaroElement => {
  if (elementOrRef === undefined || elementOrRef === null) {
    return elementOrRef
  }
  if ('current' in elementOrRef) {
    return elementOrRef.current
  }
  return elementOrRef
}

const isRootElement = (node?: TaroElement): boolean => {
  return node?.nodeType === ELEMENT_NODE_TYPE && node?.tagName === 'ROOT'
}

const createNodesRef = (element: TaroElement) => {
  if (isRootElement(element)) {
    return createSelectorQuery().selectViewport()
  }

  let ancestor = element;
  if (ancestor.parentNode) {
    while(ancestor.parentNode && !isRootElement(ancestor.parentNode as TaroElement)) {
      ancestor = ancestor.parentNode as TaroElement
    }

    if (ancestor && ancestor !== element) {
      return createSelectorQuery().select(`#${ancestor.uid}>>>#${element.uid}`)
    }
  }
}

export {
  elementUnref,
  createNodesRef,
  isRootElement
}
