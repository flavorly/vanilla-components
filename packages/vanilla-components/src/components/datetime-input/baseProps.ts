import { useVariantProps } from '@/core/use'

export const baseProps = {
  ...useVariantProps(),
  placeholder: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'indigo',
  },
  inline: {
    type: Boolean,
    default: false,
  },
}
