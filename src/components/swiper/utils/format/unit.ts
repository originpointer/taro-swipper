
/**
 * 将以 px / rpx 为单位的字符串属性中的数字提取出来
 * @param value
 * @returns
 */
const convertPx = (value: string): number => {
  if (value.includes('rpx')) {
    value = value.replace(/rpx/g, '')
  } else {
    value = value.replace(/px/g, '')
  }
  return +value
}

/**
 * 将以 rem为单位的字符串属性中的数字提取出来
 * @param value
 * @returns
 */
const convertRem = (value: string): number => {
  if (value.includes('rem')) {
    value = value.replace(/rem/g, '')
  }
  return +value
}
/**
 * 将以 vw为单位的字符串属性中的数字提取出来
 * @param value
 * @returns
 */
const convertVw = (value: string): number => {
  if (value.includes('vw')) {
    value = value.replace(/vw/g, '')
  }
  return +value
}
/**
 * 将以 vh为单位的字符串属性中的数字提取出来
 * @param value
 * @returns
 */
const convertVh = (value: string): number => {
  if (value.includes('vh')) {
    value = value.replace(/vh/g, '')
  }
  return +value
}

const unitToPx = (value: string | number): number => {
  if (typeof value === 'number') {
    return value
  }

  if (value.includes('px')) {
    return convertPx(value)
  }
  if (value.includes('rem')) {
    return convertRem(value)
  }
  if (value.includes('vw')) {
    return convertVw(value)
  }
  if (value.includes('vh')) {
    return convertVh(value)
  }

  return parseFloat(value)
}

const addUnitPx = (value?: string | number): string => {
  return value === undefined ? '' : `${unitToPx(value)}px`
}

export {
  unitToPx,
  addUnitPx
}
