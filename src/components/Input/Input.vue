<template>
  <t-input
    v-bind="$attrs"
    :variant="errors.length ? 'error' : undefined"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { TInput } from '@variantjs/vue';
import useVariantProps from '@/use/useVariantProps';
import { VCInputOptions } from '@/components/Input/Type';

export default defineComponent({
    name: 'VanillaInputText',
    components: {
        TInput,
    },
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VCInputOptions>(),
    },
});
</script>

