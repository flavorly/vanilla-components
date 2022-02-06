const isTouchOnlyDevice = (w?: Window): boolean => {
  if (w === undefined) {
    if (window === undefined) {
      return false;
    }

    // eslint-disable-next-line no-param-reassign
    w = window;
  }

  return !!(w.matchMedia && w.matchMedia('(any-hover: none)').matches);
};

export default isTouchOnlyDevice;
