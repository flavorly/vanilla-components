<script setup lang="ts">
import type { ComponentPublicInstance, PropType, Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { useInjectsClassesList } from '../../../core/use'
import type { CssClass } from '../../../core/types'

const props = defineProps({
  divided: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
})

const classesList = useInjectsClassesList()!
const footer = ref(null) as Ref<ComponentPublicInstance<HTMLInputElement> | null>
const children = ref(0)
const footerClasses = ref('') as Ref<String | CssClass>

onMounted(() => {
  children.value = footer.value?.children?.length ?? 0

  if (children.value === 1) {
    footerClasses.value = classesList.value.footerWithOneButton
  }

  if (children.value === 2) {
    footerClasses.value = classesList.value.footerWithTwoButtons
  }

  if (children.value === 3) {
    footerClasses.value = classesList.value.footerWithThreeButtons
  }
})
</script>

<script lang="ts">
export default {
  name: 'VanillaDialogFooter',
}
</script>

<template>
  <div
    ref="footer"
    :class="[
      footerClasses,
      classesList?.footer,
      divided ? classesList?.footerDivided : '',
    ]"
  >
    <slot />
  </div>
</template>
