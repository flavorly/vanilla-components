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
        <span
          :class="[
            configuration.classesList.indicator,
            indicatorClass
          ]"
          aria-hidden="true"
        />
        <span
          :class="[
            configuration.classesList.label
          ]"
          v-html="name"
        />
      </div>
    </div>
    <div
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
<script lang="ts">
import { CheckIcon } from '@heroicons/vue/solid';
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useConfigurationWithClassesList } from '@/core';
import {
    VanillaRichSelectOptionWithIndicatorsClassesKeys,
    VanillaRichSelectOptionWithIndicatorsConfig,
    VanillaRichSelectOptionWithIndicatorsProps,
} from '@/components/RichSelect/RichSelectOptionWithIndicators';

export default defineComponent({
    name: 'VanillaRichSelectOptionWithIndicators',
    components: {
        CheckIcon,
    },
    props: {
        name: {
            type: String,
            default: undefined,
        },
        status: {
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

        const { configuration } = useConfigurationWithClassesList<VanillaRichSelectOptionWithIndicatorsProps>(
            VanillaRichSelectOptionWithIndicatorsConfig,
            VanillaRichSelectOptionWithIndicatorsClassesKeys,
            localVariant,
        );

        const indicatorClass = {
            'green' : configuration.classesList?.indicatorGreen,
            'gray': configuration.classesList?.indicatorGray,
            'red' : configuration.classesList?.indicatorRed,
            'yellow': configuration.classesList?.indicatorYellow,
            'blue': configuration.classesList?.indicatorBlue,
        }[props.status];

        return {
            props,
            indicatorClass,
            configuration,
        };
    },
});
</script>

