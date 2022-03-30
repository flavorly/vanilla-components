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
          <VanillaFlag
            :class="[
              configuration.classesList.image
            ]"
            :country="country?.iso2"
          />
          <template #fallback>
            <div :class="configuration.classesList.fallbackImage" />
          </template>
        </suspense>
        <span
          :class="[
            configuration.classesList.label
          ]"
          v-html="nameLabel"
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
import { computed, defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useConfigurationWithClassesList } from '@/core';
import { VanillaSelectCountryOptionConfig, VanillaSelectCountryOptionClassesKeys, VanillaSelectCountryOptionProps } from './index';
import VanillaFlag from '@/components/Icons/Flag.vue';
import { CheckIcon } from '@heroicons/vue/solid';

export default defineComponent({
    name: 'VanillaSelectCountryOption',
    components: {
        VanillaFlag,
        CheckIcon,
    },
    props: {
        country: {
            // TODO : move this to a exported type
            type: [Object, Array] as PropType<{
                value: string,
                label: string,
                name: string,
                name_raw: string,
                dialCode: string,
                iso2: string,
            }>,
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
        labelWithDialCode: {
            type: Boolean as PropType<boolean>,
            required: false,
            default: false,
        },
        labelWithCountryCode: {
            type: Boolean as PropType<boolean>,
            required: false,
            default: false,
        },
    },
    setup(props) {

        const {
            localVariant,
        } = useBootVariant(props, 'errors', ref(null));

        const { configuration } = useConfigurationWithClassesList<VanillaSelectCountryOptionProps>(
            VanillaSelectCountryOptionConfig,
            VanillaSelectCountryOptionClassesKeys,
            localVariant,
        );

        const nameLabel = computed(() => {
            if (props.labelWithDialCode){
                return props.country.label + ' +' + props.country.dialCode;
            }

            if (props.labelWithCountryCode){
                return props.country.label + ' (' + props.country.dialCode + ')';
            }

            if (props.labelWithDialCode && props.labelWithCountryCode){
                return props.country.label + ' +' + props.country.dialCode + ' (' + props.country.dialCode + ')';
            }

            return props.country.label;
        });

        return {
            props,
            configuration,
            nameLabel,
        };
    },
});
</script>

