<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="isOpen"
        :css="false"
        class="c-Modal__overlay"
        @click="$emit('close')"
      />
    </transition>
    <transition
      name="fade"
      @before-enter="beforeModalOpen()"
      @enter="modalOpening()"
      @before-leave="beforeModalClose()"
      @after-leave="afterModalClose()"
    >
      <div
        v-if="isOpen"
        ref="modal"
        :css="false"
        class="c-Modal"
        role="dialog"
        tabindex="0"
        aria-modal="true"
      >
        <slot />
      </div>
    </transition>
  </teleport>
</template>
<script>
import { lockScroll, unlockScroll } from '../../index'
import { tabbable } from 'tabbable'

const ESCAPE_KEY = 27
const TAB_KEY = 9

let previouslyFocusedElement

export default {
  name: 'Modal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ['close'],
  methods: {
    beforeModalOpen() {
      previouslyFocusedElement = document.activeElement
      lockScroll()
    },
    modalOpening() {
      this.focusModal()
      document.addEventListener('keydown', this.handleKeyDown)
    },
    beforeModalClose() {
      document.removeEventListener('keydown', this.handleKeyDown)
      previouslyFocusedElement?.focus()
    },
    afterModalClose() {
      unlockScroll()
    },
    getFocusableElements() {
      return tabbable(this.$refs.modal)
    },
    focusModal() {
      const focusableElements = this.getFocusableElements()

      if (!focusableElements.length) {
        this.$refs.modal.focus()
        return
      }

      const firstFocusableElement = focusableElements[0]
      firstFocusableElement.focus()
    },
    handleKeyDown(event) {
      if (event.keyCode === ESCAPE_KEY) {
        this.$emit('close')
        return
      }

      /**
       * Trap focus inside Modal
       * SHIFT + TAB - focus previous element
       * TAB - focus next element
       */
      if (event.keyCode === TAB_KEY) {
        const focusableElements = this.getFocusableElements()

        /**
         * If there are no focusable elements, keep the focus on the modal div
         */
        if (!focusableElements.length) {
          event.preventDefault()
          this.$refs.modal.focus()
          return
        }

        const firstFocusableElement = focusableElements[0]
        const lastFocusableElement =
          focusableElements[focusableElements.length - 1]

        /**
         * If the current focus is the first focusable element and the user wants to go back
         * then let's focus on the last element
         */
        if (
          event.shiftKey &&
          document.activeElement === firstFocusableElement
        ) {
          event.preventDefault()
          lastFocusableElement.focus()
        }

        /**
         * If the current focus is the last focusable element on the modal then let's focus
         * on the first
         */
        if (
          !event.shiftKey &&
          document.activeElement === lastFocusableElement
        ) {
          event.preventDefault()
          firstFocusableElement.focus()
        }
      }
    },
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.c-Modal__overlay {
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}

.c-Modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 10px 10px rgba(174, 185, 203, 0.26),
    0px 14px 28px rgba(174, 185, 203, 0.25);
  display: flex;
  flex-direction: column;
  max-height: 90%;
  max-width: 90%;
}

@media (max-width: 768px) {
  .c-Modal {
    max-height: unset;
    max-width: unset;
    width: 100%;
    height: 100%;
  }
}
</style>
