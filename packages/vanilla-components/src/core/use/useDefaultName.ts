import { getCurrentInstance } from 'vue'
import { uniqueId } from '../helpers'
import type { Data } from '../types'

/**
 * Attempts to set the child name default based on parent label / name
 * @param props
 */
export default function useDefaultName<Props extends Data>(props: Props): string | unknown {
  const vm = getCurrentInstance()!
  let localName = uniqueId('vc-component-') as string | unknown

  if (
    props.name === undefined
    && vm?.parent?.props?.name !== undefined
    && vm?.parent?.type?.name === 'VanillaInputGroup'
    && vm?.type.name !== 'VanillaInputGroup'
    && vm?.type.name !== 'VanillaFormLabel'
  ) {
    localName = vm.parent?.props?.name

    return localName || uniqueId('vc-component-')
  }
  return localName
}
