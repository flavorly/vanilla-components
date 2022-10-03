const idCounter = {} as string[] | number[]
function uniqueId(prefix: any = '$lodash$') {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const id = ++idCounter[prefix]
  if (prefix === '$lodash$') {
    return `${id}`
  }

  return `${prefix}${id}`
}
export default uniqueId
