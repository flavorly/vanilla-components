<template>
  <div style="margin-bottom: 16px">
    <Button label="Open right sidebar" @click="openRightSidebar()" />
  </div>
  <div>
    <Button label="Open left sidebar" @click="openLeftSidebar()" />
  </div>
  <Sidebar :is-open="isOpenRight" position="right" @close="closeRightSidebar()">
    <div class="o-Sidebar__example">
      <h1 style="margin: 0px">Sidebar example</h1>
      <p>
        You can see that your TAB focus is trapped here. Upon closing, TAB focus
        will go back to the previously focused element.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros
        felis, accumsan sit amet pulvinar eget, blandit id dolor. In at pretium
        massa. Aenean sit amet nunc scelerisque, gravida odio sit amet, blandit
        orci. Quisque vehicula posuere elementum. Aliquam laoreet massa eu
        finibus rhoncus. Donec id cursus arcu, sed molestie nunc. Quisque
        tincidunt elit magna, gravida interdum ipsum congue sit amet. Nunc
        interdum augue sodales, sollicitudin risus non, consequat odio. In
        imperdiet vulputate mi eu ultricies. Phasellus pulvinar nisl congue
        turpis venenatis, quis elementum mauris ornare.
      </p>
      <Button label="Close" @click="closeRightSidebar()" />
    </div>
  </Sidebar>
  <Sidebar :is-open="isOpenLeft" position="left" @close="closeLeftSidebar()">
    <div class="o-Sidebar__example">
      <h1 style="margin: 0px">Sidebar example</h1>
      <p>
        You can see that your TAB focus is trapped here. Upon closing, TAB focus
        will go back to the previously focused element.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros
        felis, accumsan sit amet pulvinar eget, blandit id dolor. In at pretium
        massa. Aenean sit amet nunc scelerisque, gravida odio sit amet, blandit
        orci. Quisque vehicula posuere elementum. Aliquam laoreet massa eu
        finibus rhoncus. Donec id cursus arcu, sed molestie nunc. Quisque
        tincidunt elit magna, gravida interdum ipsum congue sit amet. Nunc
        interdum augue sodales, sollicitudin risus non, consequat odio. In
        imperdiet vulputate mi eu ultricies. Phasellus pulvinar nisl congue
        turpis venenatis, quis elementum mauris ornare.
      </p>
      <Button label="Close" @click="closeLeftSidebar()" />
    </div>
  </Sidebar>
</template>
<script>
import { Button, Sidebar } from '../../../src/index'

export default {
  name: 'SidebarExample',
  components: {
    Button,
    Sidebar,
  },
  data() {
    return {
      isOpenRight: false,
      isOpenLeft: false,
    }
  },
  methods: {
    openRightSidebar() {
      this.isOpenRight = true
    },
    closeRightSidebar() {
      this.isOpenRight = false
    },
    openLeftSidebar() {
      this.isOpenLeft = true
    },
    closeLeftSidebar() {
      this.isOpenLeft = false
    },
  },
}
</script>
<style scoped>
.o-Sidebar__example {
  padding: 1rem;
}
</style>
