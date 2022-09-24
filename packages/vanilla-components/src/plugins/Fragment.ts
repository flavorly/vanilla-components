import type { App, ComponentPublicInstance, VNode } from 'vue'
import { Fragment as RawFragment, createVNode } from 'vue'

const name = 'Fragment'

export const Fragment = {
  name,
  render(this: ComponentPublicInstance): VNode {
    return createVNode(RawFragment, null, this.$slots.default?.())
  },
}

export function FragmentPlugin(app: App) {
  app.component(name, Fragment)
}
