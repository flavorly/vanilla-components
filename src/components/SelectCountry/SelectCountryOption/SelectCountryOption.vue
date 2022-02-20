<template>
  <div :class="[parentClasses, configuration.classesList.wrapper]">
    <div :class="[configuration.classesList.labelAndImageWrapper]">
      <div
        :class="[
          selected ? configuration.classesList.labelAndImageContainerSelected : '',
          !selected ? configuration.classesList.labelAndImageContainerRegular : '',
          configuration.classesList.labelAndImageContainer,
        ]"
      >
        <suspense>
          <vanilla-flag-icon
            :class="[
              configuration.classesList.image
            ]"
            :country="country"
          />
          <template #fallback>
            <div :class="configuration.classesList.fallbackImage" />
          </template>
        </suspense>
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
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useConfigurationWithClassesList } from '@/core';
import { VanillaSelectCountryOptionConfig, VanillaSelectCountryOptionClassesKeys, VanillaFormFeedbackProps } from './index';
import VanillaFlagIcon from '@/components/Icons/FlagIcon/Index.vue';
import { CheckIcon } from '@heroicons/vue/solid';

export default defineComponent({
    name: 'VanillaSelectCountryOption',
    components: {
        VanillaFlagIcon,
        CheckIcon,
    },
    props: {
        name: {
            type: String,
            default: undefined,
        },
        country: {
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
        parentClasses: {
            type: [String, Array] as PropType<string | string[]>,
            default: '',
        },
    },
    setup(props) {

        const {
            localVariant,
        } = useBootVariant(props, 'errors', ref(null));

        const { configuration } = useConfigurationWithClassesList<VanillaFormFeedbackProps>(
            VanillaSelectCountryOptionConfig,
            VanillaSelectCountryOptionClassesKeys,
            localVariant,
        );

        return {
            props,
            configuration,
        };
    },
});
</script>

