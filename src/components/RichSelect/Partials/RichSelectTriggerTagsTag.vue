<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, inject } from 'vue'
import { normalizedOptionIsDisabled, useInjectsClassesList } from '@/core'
import type { NormalizedOption } from '@/core/types'
import CloseIcon from '@/components/icons/CloseIcon.vue'

export default defineComponent({
    name: 'RichSelectTriggerTagsTag',
    components: {
        CloseIcon,
    },
    props: {
        option: {
            type: Object as PropType<NormalizedOption>,
            required: true,
        },
    },
    setup() {
        const toggleOption = inject<(option: NormalizedOption) => void>('toggleOption')!

        const classesList = useInjectsClassesList()!

        return {
            toggleOption,
            classesList,
        }
    },
    computed: {
        dataValueAttribute(): string {
            if (typeof this.option.value === 'object') {
                return JSON.stringify(this.option.value)
            }

            return String(this.option.value)
        },
        isDisabled(): boolean {
            return normalizedOptionIsDisabled(this.option)
        },
    },
    methods: {
        focus(): void {
            this.$el.focus()
        },
        getElementIndex(): number {
            const elements: HTMLElement[] = Array.from(this.$el.parentElement.children)

            return Array.from(elements).findIndex(el => el.isSameNode(this.$el))
        },
        focusNextElement(): void {
            const { parentElement } = this.$el
            const currentElementIndex = this.getElementIndex()
            const elements: HTMLElement[] = Array.from(parentElement.children)

            if (currentElementIndex < elements.length - 1) {
                elements[currentElementIndex + 1].focus()
            }
        },
        focusPrevElement(): void {
            const { parentElement } = this.$el
            const currentElementIndex = this.getElementIndex()
            const elements: HTMLElement[] = Array.from(parentElement.children)

            if (currentElementIndex > 0) {
                elements[currentElementIndex - 1].focus()
            }
        },
        async unselect(): Promise<void> {
            const { parentElement } = this.$el
            const elementIndex = this.getElementIndex()

            this.toggleOption(this.option)

            await this.$nextTick()

            const nextElement: HTMLElement | undefined = parentElement.children[elementIndex]

            if (nextElement) {
                nextElement.focus()
            }
 else if (elementIndex > 0) {
                parentElement.children[elementIndex - 1].focus()
            }
        },
    },
})
</script>

<template>
  <button
    type="button"
    :class="classesList.tag"
    :disabled="isDisabled"
    data-rich-select-focusable
    data-rich-select-tag
    :data-value="dataValueAttribute"
    @mousedown.prevent.stop="focus"
    @keydown.backspace.prevent.stop="unselect"
    @keydown.right.prevent.stop="focusNextElement"
    @keydown.left.prevent.stop="focusPrevElement"
    @keydown.enter.prevent.stop
  >
    <span :class="classesList.tagLabel">
      <slot
        name="tagLabel"
        :option="option"
        :is-disabled="isDisabled"
      >{{ option.text }}</slot>
    </span>

    <span
      v-if="!isDisabled"
      tabindex="0"
      :class="classesList.tagDeleteButton"
      data-rich-select-focusable
      @mousedown.prevent.stop="unselect"
      @keydown.backspace.prevent.stop="unselect"
      @keydown.enter.prevent.stop="unselect"
    >
      <slot
        name="tagCloseIcon"
        :option="option"
      >
        <CloseIcon
          ref="closeIcon"
          :class="classesList.tagDeleteButtonIcon"
        />
      </slot>
    </span>
  </button>
</template>
