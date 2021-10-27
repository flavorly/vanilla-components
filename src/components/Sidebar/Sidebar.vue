<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      :css="false"
      class="c-Sidebar__overlay"
      @click="$emit('close')"
    />
  </transition>
  <transition
    :name="slideAnimation"
    @before-enter="beforeSidebarOpen()"
    @enter="sidebarOpening()"
    @before-leave="beforeSidebarClose()"
    @after-leave="afterSidebarClose()"
  >
    <div
      v-if="isOpen"
      ref="sidebar"
      :css="false"
      class="c-Sidebar"
      :class="sidebarClassObject"
      role="dialog"
      tabindex="0"
    >
      <slot />
    </div>
  </transition>
</template>
<script>
import { lockScroll, unlockScroll } from '../../index'
import { tabbable } from 'tabbable'

const ESCAPE_KEY = 27
const TAB_KEY = 9

let previouslyFocusedElement

export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
      required: false,
    },
    position: {
      type: String,
      required: false,
      default: 'right',
      validator(type) {
        return ['right', 'left'].includes(type)
      },
    },
  },
  emits: ['close'],
  computed: {
    sidebarClassObject() {
      return {
        'is-right': this.position === 'right',
        'is-left': this.position === 'left',
      }
    },
    slideAnimation() {
      return this.position === 'right' ? 'slideFromRight' : 'slideFromLeft'
    },
  },
  methods: {
    beforeSidebarOpen() {
      previouslyFocusedElement = document.activeElement
      lockScroll()
    },
    sidebarOpening() {
      this.focusSidebar()
      document.addEventListener('keydown', this.handleKeyDown)
    },
    beforeSidebarClose() {
      document.removeEventListener('keydown', this.handleKeyDown)
      previouslyFocusedElement?.focus()
    },
    afterSidebarClose() {
      unlockScroll()
    },
    getFocusableElements() {
      return tabbable(this.$refs.sidebar)
    },
    focusSidebar() {
      const focusableElements = this.getFocusableElements()

      if (!focusableElements.length) {
        this.$refs.sidebar.focus()
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
          this.$refs.sidebar.focus()
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

.slideFromRight-enter-active,
.slideFromRight-leave-active {
  transform: unset;
  transition: transform 0.2s;
}

.slideFromRight-enter-from,
.slideFromRight-leave-to {
  transform: translateX(100%);
}

.slideFromLeft-enter-active,
.slideFromLeft-leave-active {
  transform: unset;
  transition: transform 0.2s;
}

.slideFromLeft-enter-from,
.slideFromLeft-leave-to {
  transform: translateX(-100%);
}

.c-Sidebar__overlay {
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}

.c-Sidebar {
  position: fixed;
  top: 0;
  z-index: 11;
  background-color: white;
  box-shadow: 0px 10px 10px rgba(174, 185, 203, 0.26),
    0px 14px 28px rgba(174, 185, 203, 0.25);
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 40%;
}

.c-Sidebar.is-left {
  left: 0;
}

.c-Sidebar.is-right {
  right: 0;
}

@media (max-width: 768px) {
  .c-Sidebar {
    width: 100%;
  }
}
</style>
