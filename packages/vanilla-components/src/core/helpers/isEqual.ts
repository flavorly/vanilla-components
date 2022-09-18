const isEqual = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b)
export default isEqual
