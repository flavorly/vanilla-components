import { Modifier, ModifierArguments } from '@popperjs/core';
import { Data } from '@/core/types';

export const popperOptions = {
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
  onFirstUpdate: undefined,
};

export const validPlacements = [
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
];

export const sameWidthModifier: Modifier<'sameWidth', Data> = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: (options: ModifierArguments<Data>): void => {
    const { state } = options;
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: (options: ModifierArguments<Data>): void => {
    const { state } = options;
    const reference = state.elements.reference as HTMLElement;
    state.elements.popper.style.width = `${reference.offsetWidth}px`;
  },
};
