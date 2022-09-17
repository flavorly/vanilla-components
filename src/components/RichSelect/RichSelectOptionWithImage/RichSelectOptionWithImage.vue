<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { VanillaRichSelectOptionWithImageProps } from './'
import { VanillaRichSelectOptionWithImageClassesKeys, VanillaRichSelectOptionWithImageConfig } from './'
import { useBootVariant, useConfigurationWithClassesList, useVariantProps } from '@/core'
import CheckIcon from '@/components/Icons/Hero/Solid/CheckIcon.vue'

export default defineComponent({
    name: 'VanillaRichSelectOptionWithImage',
    components: {
        CheckIcon,
    },
    props: {
        ...useVariantProps<VanillaRichSelectOptionWithImageProps>(),
        name: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        image: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        selected: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        description: {
            type: [String] as PropType<string | undefined>,
            default: undefined,
        },
        hasErrors: {
            type: Boolean as PropType<boolean>,
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
        } = useBootVariant(props, 'errors', ref(null))

        const { configuration } = useConfigurationWithClassesList<VanillaRichSelectOptionWithImageProps>(
            VanillaRichSelectOptionWithImageConfig,
            VanillaRichSelectOptionWithImageClassesKeys,
            localVariant,
        )

        return {
            configuration,
        }
    },
})
</script>

<template>
  <div
    :class="[
      parentClasses,
      configuration.classesList.wrapper,
      disabled ? configuration.classesList.disabled : '',
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
            configuration.classesList.image,
          ]"
          :style="{
            backgroundImage: `url(${image})`,
          }"
        />
        <span
          :class="[
            configuration.classesList.label,
          ]"
          v-html="name"
        />
      </div>
    </div>
    <p
      v-if="description"
      :class="[
        configuration.classesList.description,
        selected ? configuration.classesList.descriptionSelected : '',
        !selected ? configuration.classesList.descriptionRegular : '',
      ]"
      v-html="description"
    />
    <span
      v-if="selected"
      :class="[configuration.classesList.selectedIconContainer]"
    >
      <slot name="selectedIcon">
        <CheckIcon
          aria-hidden="true"
          :class="[configuration.classesList.icon]"
        />
      </slot>
    </span>
  </div>
</template>

