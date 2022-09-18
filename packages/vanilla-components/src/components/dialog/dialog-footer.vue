<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useInjectsClassesList } from '../../core'

export default defineComponent({
    props: {
        divided: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
    },
    setup(props) {
        const classesList = useInjectsClassesList()!
        const footer = ref(null)
        const children = ref(0)
        const footerClasses = ref('')

        onMounted(() => {
            children.value = dialog.value?.children.length

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

        return {
            classesList,
            children,
            footerClasses,
            dialog,
            props,
        }
    },
})
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
