const objectToArrayMap = (initialObject: object, toKey: string, toValue: string): { [key: string]: unknown } => {
  return Object.fromEntries(Object.entries(initialObject).map(([key, value]) =>  [value[toKey], value[toValue]]));
};

export default objectToArrayMap;
