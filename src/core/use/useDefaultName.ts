import { getCurrentInstance } from 'vue';
import { Data } from '@/core/types';
import uniqueId from 'lodash/uniqueId';

/**
 * Attempts to set the child name default based on parent label / name
 * @param props
 */
export default function useDefaultName<Props extends Data>(props: Props): string | unknown {
  const vm = getCurrentInstance()!;
  let localName = uniqueId('vc-component-') as string | unknown;

  if (
    props.name === undefined &&
    vm.parent?.props?.name !== undefined &&
    vm.parent?.type?.name === 'VanillaInputGroup' &&
    vm?.type.name !== 'VanillaInputGroup' &&
    vm?.type.name !== 'VanillaFormLabel'
  ) {
    localName = vm.parent?.props?.name;
    //console.log('Component ' + vm?.type.name + ' is taking name from the parent : ' + localName);
    return localName || uniqueId('vc-component-');
  }
  return localName;
}
