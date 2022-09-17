import type { Measure } from '@/core/types'

const normalizeMeasure = (measure?: Measure | null | undefined): string | undefined => {
  if (measure === null || measure === undefined) {
    return undefined
  }

  if (typeof measure === 'number') {
    return `${measure}px`
  }

  if (String(Number(measure)) === measure) {
    return `${Number(measure)}px`
  }

  return measure
}

export default normalizeMeasure
