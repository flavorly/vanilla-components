import { useVariantProps } from '../../core/use'
import type { DateTimeInputClassesValidKeys, DateTimeInputProps } from './config'

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
