import { CSSProperties } from "react"
import { createNodesRef, elementUnref } from "./element"

const getComputedStyle = (elementOrRef: any, computedStyle: string[]) => {
  const element = elementUnref(elementOrRef)

  if (element) {
    return new Promise<CSSStyleDeclaration>((resolve) => {
      const nodesRef = createNodesRef(element)
      console.log(`nodesRef`, nodesRef)
      if (nodesRef) {
        nodesRef.fields({
          computedStyle
        },
        (result) => {
          resolve(result as CSSStyleDeclaration)
        }
        ).exec()
      }
    })
  }
  return Promise.resolve({} as CSSStyleDeclaration)
}

export {
  getComputedStyle
}
