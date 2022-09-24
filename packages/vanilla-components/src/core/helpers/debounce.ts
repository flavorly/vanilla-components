import type { DebounceFn, DebouncedFn } from '@/core/types'

const debounce = (func: (...args: any[]) => void, wait = 200): DebouncedFn => {
  let timeout: ReturnType<typeof setTimeout> | undefined

  const cancel: () => void = () => {
    if (timeout) {
      clearTimeout(timeout)
    }
  }

  const debounceFn: DebounceFn = (...args: any[]) => {
    cancel()

    timeout = setTimeout(() => {
      timeout = undefined
      func(args)
    }, wait)

    if (!wait) {
      func(args)
    }
  }

  return Object.assign(debounceFn, { cancel })
}

export default debounce
