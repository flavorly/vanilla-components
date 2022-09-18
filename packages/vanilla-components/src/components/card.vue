<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, provide, ref } from 'vue'
import { useBootVariant, useConfigurationWithClassesList, useVariantProps } from '../core/use'
import { hasSlot } from '../core/helpers'
import VanillaCardFooter from './card/card-footer.vue'
import type { VanillaCardProps } from './card'
import { VanillaCardClassesKeys, VanillaCardConfig } from './card'

export default defineComponent({
    components: {
        VanillaCardFooter,
    },
    inheritAttrs: true,
    props: {
        ...useVariantProps<VanillaCardProps>(),
        title: {
            type: [String] as PropType<string>,
            default: undefined,
        },
        subtitle: {
            type: [String] as PropType<string>,
            default: undefined,
        },
        as: {
            type: [String] as PropType<string>,
            default: 'div',
        },
        bodyDivided: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        bodyDarker: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        bodyWithPadding: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        bodyClasses: {
            type: [String] as PropType<string>,
            default: '',
        },
    },
    setup(props) {
        const { localVariant } = useBootVariant(props, 'errors', ref(null))

        const { configuration } = useConfigurationWithClassesList<VanillaCardProps>(
            VanillaCardConfig,
            VanillaCardClassesKeys,
            localVariant,
        )

        /**
         * Provided data
         */
        provide('configuration_vanilla', configuration)

        return {
            configuration,
            localVariant,
            hasSlot,
        }
    },
})
</script>

<template>
  <component
    :is="as"
    :class="configuration.classesList.card"
    v-bind="$attrs"
  >
    <div
      v-if="hasSlot($slots.title) || hasSlot($slots.subtitle) || hasSlot($slots.actions) || title !== undefined || subtitle !== undefined"
      :class="[
        configuration.classesList.header,
      ]"
    >
      <div
        :class="[
          configuration.classesList.headerInner,
        ]"
      >
        <!--  Title and Subtitle -->
        <div :class="configuration.classesList.titleWrapper">
          <div>
            <h3
              v-if="hasSlot($slots.title) || title !== undefined"
              :class="configuration.classesList.title"
            >
              <slot name="title">
                <span
                  v-html="title"
                />
              </slot>
            </h3>
            <p
              v-if="hasSlot($slots.subtitle) || subtitle !== undefined"
              :class="configuration.classesList.subtitle"
            >
              <slot name="subtitle">
                <span
                  v-if="subtitle !== ''"
                  v-html="subtitle"
                />
              </slot>
            </p>
          </div>
        </div>
        <!--  Actions -->
        <div
          v-if="hasSlot($slots.actions)"
          :class="configuration.classesList.actions"
        >
          <slot name="actions" />
        </div>
        <!--  End Actions -->
      </div>
    </div>

    <div
      :class="[
        configuration.classesList.body,
        bodyDivided && !bodyDarker ? configuration.classesList.bodyDivided : '',
        bodyDivided && bodyDarker ? configuration.classesList.bodyDividedDarker : '',
        bodyWithPadding ? configuration.classesList.bodyWithPadding : '',
        bodyDarker ? configuration.classesList.bodyDarker : '',
        bodyClasses,
      ]"
    >
      <slot name="default" />
    </div>

    <div
      v-if="hasSlot($slots.footer)"
      :class="configuration.classesList.footer"
    >
      <slot name="footer" />
    </div>

    <div
      v-if="hasSlot($slots.footerActions)"
      :class="configuration.classesList.footer"
    >
      <VanillaCardFooter>
        <slot name="footerActions" />
      </VanillaCardFooter>
    </div>

    <slot name="footerVanilla" />
  </component>
</template>

