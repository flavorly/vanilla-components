import {
  getCurrentInstance,
  unref,
} from 'vue'

import pick from 'lodash/pick'
import omit from 'lodash/omit'

export default function useAttributesAndProps(only: string[] = [], except: string[] = []) {
  const vm = getCurrentInstance()!

  const props = Object.fromEntries(Object.entries(unref(vm.props)).filter(([v]) => v != null && v !== undefined))
  const attrs = Object.fromEntries(Object.entries(unref(vm.attrs)).filter(([v]) => v != null && v !== undefined))

  let merge = {
    ...props,
    ...attrs,
  }

  if (only.length) {
    merge = pick(merge, only)
  }

  if (except.length) {
    merge = omit(merge, except)
  }

  // Always removed these
  const blacklist = ['variant', 'variants', 'classes', 'variants']

  return omit(merge, blacklist)
}
