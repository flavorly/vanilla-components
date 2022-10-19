import type { DateTimeInputClassesValidKeys, DateTimeInputProps } from './config'
import { useVariantProps } from '@/core/use'

export const baseProps = {
  ...useVariantProps<DateTimeInputProps, DateTimeInputClassesValidKeys>(),
  modelValue: {
    type: [String, Object, Number, Array, undefined],
  },
  color: {
    type: String,
    default: 'indigo',
  },
  placeholder: {
    type: String,
    default: '',
  },
  inline: {
    type: Boolean,
    default: false,
  },
}
