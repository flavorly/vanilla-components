const firstOf = (object: object | string []) => {
  // @ts-ignore
  return object[Object.keys(object)[0]];
};
export default firstOf;
