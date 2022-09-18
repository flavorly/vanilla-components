const promisify = <P>(value: Promise<P> | P): Promise<P> => {
  if (value instanceof Promise) {
    return value
  }

  return Promise.resolve(value)
}

export default promisify
