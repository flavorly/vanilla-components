// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasProperty = <X, Y extends PropertyKey>(obj: X | undefined, prop: Y): obj is X & Record<Y, unknown> => obj !== null && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, prop);

export default hasProperty;
