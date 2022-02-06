/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

const addToArray = <P extends Array<any>>(arr: any, value: any): P => {
  if (!Array.isArray(arr)) {
    return [value] as P;
  }

  return [...arr, value] as P;
};

export default addToArray;
