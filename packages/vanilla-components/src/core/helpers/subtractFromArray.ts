import isEqual from './isEqual'

const subtractFromArray = <P extends any[] = []>(arr: any, value: any): P => {
  if (!Array.isArray(arr)) {
    return [] as any
  }

  const index = arr.findIndex(valueInOriginal => isEqual(valueInOriginal, value))

  if (index === -1) {
    return arr as P
  }

  const newArray = [...arr]

  newArray.splice(index, 1)

  return newArray as P
}

export default subtractFromArray
