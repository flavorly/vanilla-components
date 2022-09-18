const pick = <T, K extends keyof T>(object: T, condition: (value: T[K], key: K) => boolean = value => !!value): T => {
  const newObject = { ...object }

  Object.keys(object)
    .filter(key => !condition(newObject[key as K], key as K))
    .forEach(key => delete newObject[key as K])

  return newObject
}

export default pick
