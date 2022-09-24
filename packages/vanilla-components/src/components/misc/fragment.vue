<script lang="ts">
import type { ComponentPublicInstance, VNode } from 'vue'
import { Fragment as RawFragment, createVNode } from 'vue'

export default {
  name: 'Fragment',
  render(this: ComponentPublicInstance): VNode {
    return createVNode(RawFragment, null, this.$slots.default?.())
  },
}
</script>
