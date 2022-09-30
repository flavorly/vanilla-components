const isTouchOnlyDevice = (w?: Window): boolean => {
  if (w === undefined) {
    if (window === undefined) {
      return false
    }

    w = window
  }

  return !!(w.matchMedia && w.matchMedia('(any-hover: none)').matches)
}

export default isTouchOnlyDevice
