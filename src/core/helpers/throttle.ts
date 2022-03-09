/* eslint-disable @typescript-eslint/no-explicit-any */
const throttle = (func: (...args: any[]) => void, wait = 200): (...args: any[]) => void => {
  let isCalled = false;

  return (...args: any[]) => {
    if (!isCalled) {
      func(...args);
      isCalled = true;
      setTimeout(() => {
        isCalled = false;
      }, wait);
    }
  };
};

export default throttle;
