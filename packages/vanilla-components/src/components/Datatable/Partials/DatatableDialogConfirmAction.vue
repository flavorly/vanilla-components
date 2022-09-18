<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import type { VanillaDatatableAction } from '../index'
import { useInjectDatatableTranslations } from '../Utils'
import VanillaDialog from '../../Dialog/Dialog.vue'
import VanillaButton from '../../Button/Button.vue'
import { useInjectsClassesList, useReplacePlaceholders } from '../../../core'
import ExclamationTriangleIcon from '../../Icons/Hero/Outline/ExclamationTriangleIcon.vue'
import CheckIcon from '../../Icons/Hero/Outline/CheckIcon.vue'
import SignalIcon from '../../Icons/Hero/Outline/SignalIcon.vue'
import InformationCircleIcon from '../../Icons/Hero/Outline/InformationCircleIcon.vue'

export default defineComponent({
    name: 'VanillaDatatableDialogConfirmAction',
    components: {
        VanillaDialog,
        VanillaButton,
        ExclamationTriangleIcon,
        CheckIcon,
        SignalIcon,
        InformationCircleIcon,
    },
    props: {
        action: {
            type: [Object, undefined] as PropType<VanillaDatatableAction | undefined>,
            required: false,
            default: undefined,
        },
        countSelected: {
            type: [Number, String] as PropType<number | string>,
            required: true,
        },
    },
    emits: [
        'update:modelValue',
        'actionCanceled',
        'actionConfirmed',
    ],
    setup(props, { emit }) {
        const isOpen = ref(false)

        const cancelAction = () => {
            isOpen.value = false
            emit('actionCanceled', props.action)
        }

        const confirmAction = () => {
            isOpen.value = false
            emit('actionConfirmed', props.action)
        }

        // Provide Translations
        const translations = useInjectDatatableTranslations()!
        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!

        const title = computed(() => {
            const value = props.action?.before?.confirm?.title || translations.value.actionConfirmTitle
            return useReplacePlaceholders(value, { name: props.action?.label })
        })

        const text = computed(() => {
            const value = props.action?.before?.confirm?.text || translations.value.actionConfirmText
            return useReplacePlaceholders(value, { name: `<b>${props.action?.label}</b>`, itemsSelected: `<b>${props.countSelected}</b>` })
        })

        const confirmText = computed(() => {
            const value = props.action?.before?.confirm?.confirmButton || translations.value.actionConfirmButton
            return useReplacePlaceholders(value, { name: props.action?.label, itemsSelected: props.countSelected })
        })

        const cancelText = computed(() => {
            const value = props.action?.before?.confirm?.cancelButton || translations.value.actionCancelButton
            return useReplacePlaceholders(value, { name: props.action?.label, itemsSelected: props.countSelected })
        })

        watch(isOpen, (val: boolean) => {
            emit('update:modelValue', val)
        })

        return {
            title,
            text,
            confirmText,
            cancelText,
            isOpen,
            cancelAction,
            confirmAction,
            translations,
            classesList,
        }
    },
})
</script>

<template>
  <VanillaDialog v-model="isOpen">
    <slot
      name="icon"
      v-bind="{
        action,
        title,
        text,
        confirmText,
        cancelText,
      }"
    >
      <div
        :class="[
          classesList.actionIconContainer,
          action?.icon === 'success' ? classesList.actionIconContainerSuccess : '',
          action?.icon === 'danger' || action?.icon === undefined ? classesList.actionIconContainerDanger : '',
          action?.icon === 'warning' ? classesList.actionIconContainerWarning : '',
          action?.icon === 'info' ? classesList.actionIconContainerInfo : '',
        ]"
      >
        <ExclamationTriangleIcon
          v-if="action?.icon === undefined || action?.icon === 'danger'"
          :class="[
            classesList.actionIcon,
            classesList.actionIconDanger,
          ]"
        />
        <CheckIcon
          v-if="action?.icon === 'success'"
          :class="[
            classesList.actionIcon,
            classesList.actionIconSuccess,
          ]"
        />
        <SignalIcon
          v-if="action?.icon === 'warning'"
          :class="[
            classesList.actionIcon,
            classesList.actionIconWarning,
          ]"
        />
        <InformationCircleIcon
          v-if="action?.icon === 'info'"
          :class="[
            classesList.actionIcon,
            classesList.actionIconInfo,
          ]"
        />
      </div>
    </slot>

    <slot
      name="default"
      v-bind="{
        action,
        title,
        text,
        confirmText,
        cancelText,
      }"
    >
      <div :class="classesList.actionsContentContainer">
        <!-- Title -->
        <h3
          v-if="title !== null && title !== ''"
          :class="[
            classesList.actionsTitle,
            action?.before?.confirm?.classes?.title,
          ]"
        >
          <span
            v-if="action?.before?.confirm?.safe"
            v-html="title"
          />
          <span v-else>{{ title }}</span>
        </h3>
        <!-- Body -->
        <div
          :class="[
            classesList.actionsText,
            action?.before?.confirm?.classes?.text,
          ]"
        >
          <p
            v-if="action?.before?.confirm?.safe"
            v-html="text"
          />
          <p v-else>
            {{ text }}
          </p>
        </div>
      </div>
    </slot>

    <!-- Footer -->
    <template #footer>
      <VanillaButton
        :label="cancelText"
        tabindex="1"
        focus-on-mount
        @click="cancelAction"
      />
      <VanillaButton
        tabindex="2"
        variant="primary"
        :label="confirmText"
        @click="confirmAction"
      />
    </template>
  </VanillaDialog>
</template>
