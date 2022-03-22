<template>
  <VanillaDialog v-model="isOpen">
    <div class="mx-auto flex flex-shrink-0  items-center justify-center h-12 w-12 rounded-full bg-red-100">
      <ExclamationIcon class="text-red-600 h-6 w-6" />
    </div>

    <div class="mt-3 text-center sm:mt-5">
      <!-- Title-->
      <h3
        v-if="title !== null && title !== ''"
        :class="[
          'text-lg leading-6 font-medium text-gray-900 dark:text-white',
          action?.before?.confirm?.classes?.title
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
          'mt-2 text-sm leading-5 text-gray-600 dark:text-gray-300',
          action?.before?.confirm?.classes?.text
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
<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from 'vue';
import { useReplacePlaceholders } from '@/core';
import { ExclamationIcon } from '@heroicons/vue/outline';
import VanillaDialog from '@/components/Dialog/Dialog.vue';
import VanillaButton from '@/components/Button/Button.vue';

export default defineComponent({
    name: 'VanillaDatatableDialogConfirmAction',
    components: {
        VanillaDialog,
        VanillaButton,
        ExclamationIcon,
    },
    props: {
        action: {
            type: [Object, undefined] as PropType<object | undefined>,
            required: false,
            default: undefined,
        },
        countSelected: {
            type: [Number, String] as PropType<number | string>,
            required: true,
        },
        textTitle: {
            type: [String] as PropType<string>,
            required: true,
        },
        textConfirmActionText: {
            type: [String] as PropType<string>,
            required: true,
            default: 'Are you sure you want to perform this action?',
        },
        textConfirmActionButton: {
            type: [String] as PropType<string>,
            required: true,
            default: 'Yes, I\'v Confirmed',
        },
        textCancelActionButton: {
            type: [String] as PropType<string>,
            required: true,
            default: 'Nah, Cancel',
        },
    },
    emits: [
        'update:modelValue',
        'actionCanceled',
        'actionConfirmed',
    ],
    setup(props, { emit }){

        const isOpen = ref(false);

        const cancelAction = () => {
            isOpen.value = false;
            emit('actionCanceled', props.action);
        };

        const confirmAction = () => {
            isOpen.value = false;
            emit('actionConfirmed', props.action);
        };

        const title = computed(() => {
            const value =  props.action?.before?.confirm?.title || props.textTitle;
            return useReplacePlaceholders(value, { name: props.action?.label });
        });

        const text = computed(() => {
            const value =  props.action?.before?.confirm?.text || props.textConfirmActionText;
            return useReplacePlaceholders(value, { name: '<b>' + props.action?.label + '</b>', itemsSelected: '<b>' + props.countSelected + '</b>' });
        });

        const confirmText = computed(() => {
            const value =  props.action?.before?.confirm?.confirmButton || props.textConfirmActionButton;
            return useReplacePlaceholders(value, { name: props.action?.label, itemsSelected: props.countSelected });
        });

        const cancelText = computed(() => {
            const value =  props.action?.before?.confirm?.cancelButton || props.textCancelActionButton;
            return useReplacePlaceholders(value, { name: props.action?.label, itemsSelected: props.countSelected });
        });

        watch(isOpen, (val: boolean) => {
            emit('update:modelValue', val);
        });

        return {
            title,
            text,
            confirmText,
            cancelText,
            isOpen,
            cancelAction,
            confirmAction,
        };
    },
});
</script>
