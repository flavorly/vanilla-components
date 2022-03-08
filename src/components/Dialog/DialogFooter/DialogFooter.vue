<template>
  <div
    ref="footer"
    :class="[
      footerClasses,
      classesList?.footer,
      divided ? classesList?.footerDivided : ''
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, computed, onBeforeMount, onMounted } from 'vue';
import { useInjectsClassesList } from '@/core';

export default defineComponent({
    name: 'VanillaDialogFooter',
    compatConfig: {
        MODE: 3,
    },
    props: {
        divided: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
    },
    setup(props, { slots }){

        const classesList = useInjectsClassesList()!;
        const footer = ref(null);
        const children = ref(0);
        const footerClasses = ref('');

        onMounted(() => {
            //children.value = slots.default;
            children.value = footer.value.children.length;


            if (children.value === 1){
                footerClasses.value = classesList.value.footerWithOneButton;
            }

            if (children.value === 2){
                footerClasses.value = classesList.value.footerWithTwoButtons;
            }

            if (children.value === 3){
                footerClasses.value = classesList.value.footerWithThreeButtons;
            }
        });

        return {
            classesList,
            children,
            footerClasses,
            footer,
            props,
        };
    },
});
</script>
