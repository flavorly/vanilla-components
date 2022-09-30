const firstOf = (object: object | string []) => {
  // @ts-expect-error
  return object[Object.keys(object)[0]]
}
export default firstOf
