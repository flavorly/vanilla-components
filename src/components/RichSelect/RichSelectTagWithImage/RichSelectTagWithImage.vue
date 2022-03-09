<template>
  <div
    :class="[
      parentClasses,
      configuration.classesList.wrapper,
      disabled ? configuration.classesList.disabled : ''
    ]"
  >
    <div :class="[configuration.classesList.labelAndImageWrapper]">
      <div
        :class="[
          selected ? configuration.classesList.labelAndImageContainerSelected : '',
          !selected ? configuration.classesList.labelAndImageContainerRegular : '',
          configuration.classesList.labelAndImageContainer,
        ]"
      >
        <div
          :class="[
            configuration.classesList.image
          ]"
          :style="{
            backgroundImage: `url(${image})`
          }"
        />
        <span
          :class="[
            configuration.classesList.label
          ]"
          v-html="name"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useConfigurationWithClassesList } from '@/core';
import {
    VanillaRichSelectTagWithImageClassesKeys,
    VanillaRichSelectTagWithImageConfig,
    VanillaRichSelectTagWithImageProps,
} from '@/components/RichSelect/RichSelectTagWithImage';

export default defineComponent({
    name: 'VanillaRichSelectTagWithImage',
    props: {
        name: {
            type: String,
            default: undefined,
        },
        image: {
            type: String,
            required: true,
        },
        selected: {
            type: Boolean,
            default: false,
        },
        description: {
            type: [String] as PropType<string | undefined>,
            default: undefined,
        },
        hasErrors: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        parentClasses: {
            type: [String, Array] as PropType<string | string[]>,
            default: '',
        },
    },
    setup(props) {

        const {
            localVariant,
        } = useBootVariant(props, 'errors', ref(null));

        const { configuration } = useConfigurationWithClassesList<VanillaRichSelectTagWithImageProps>(
            VanillaRichSelectTagWithImageConfig,
            VanillaRichSelectTagWithImageClassesKeys,
            localVariant,
        );

        return {
            props,
            configuration,
        };
    },
});
</script>

