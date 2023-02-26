import type { Modifier, ModifierArguments } from '@popperjs/core'
import type { Data } from '../types'

const popperOptions = {
  placement: 'bottom-end',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 10],
      },
    },
  ],
  strategy: 'absolute',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  onFirstUpdate: undefined,
}

const validPlacements = [
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
]

const sameWidthModifier: Modifier<'sameWidth', Data> = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: (options: ModifierArguments<Data>): void => {
    const { state } = options
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: (options: ModifierArguments<Data>): void => {
    const { state } = options
    const reference = state.elements.reference as HTMLElement
    state.elements.popper.style.width = `${reference.offsetWidth}px`
  },
}

export {
  sameWidthModifier,
  validPlacements,
  popperOptions,
}
