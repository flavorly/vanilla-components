const isNumber = (value: unknown): boolean => {
  if (value === null) {
    return false
  }

  return ['number'].includes(typeof value)
}

export default isNumber
