const elementIsTargetOrTargetChild = (target: EventTarget | null, wrapper: HTMLElement): boolean => {
  if (!(target instanceof Element)) {
    return false
  }

  return wrapper.contains(target)
}

export default elementIsTargetOrTargetChild
