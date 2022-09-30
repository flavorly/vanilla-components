import type { Slot, VNode } from 'vue'
import { Comment, Text } from 'vue'

export default function hasSlot(slot: Slot | undefined, slotProps = {}): boolean {
  if (!slot)
return false

  return slot(slotProps).some((vnode: VNode) => {
    if (vnode.type === Comment)
return false

    if (Array.isArray(vnode.children) && !vnode.children.length)
return false

    return (
      vnode.type !== Text
      || (typeof vnode.children === 'string' && vnode.children.trim() !== '')
    )
  })
}
