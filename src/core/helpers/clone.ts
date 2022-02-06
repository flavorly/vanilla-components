// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clone = <P> (obj: P): P => {
  if (obj instanceof Date) {
    return new Date(obj.valueOf()) as unknown as P;
  }

  return JSON.parse(JSON.stringify(obj));
};

export default clone;
