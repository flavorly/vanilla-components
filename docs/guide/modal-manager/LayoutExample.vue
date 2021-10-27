<template>
  <div class="o-Modal__example">
    <h1 style="margin: 0px">Modal example</h1>
    <p>
      You can see that your TAB focus is trapped here. Upon closing, TAB focus
      will go back to the previously focused element.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros
      felis, accumsan sit amet pulvinar eget, blandit id dolor. In at pretium
      massa. Aenean sit amet nunc scelerisque, gravida odio sit amet, blandit
      orci. Quisque vehicula posuere elementum. Aliquam laoreet massa eu finibus
      rhoncus. Donec id cursus arcu, sed molestie nunc. Quisque tincidunt elit
      magna, gravida interdum ipsum congue sit amet. Nunc interdum augue
      sodales, sollicitudin risus non, consequat odio. In imperdiet vulputate mi
      eu ultricies. Phasellus pulvinar nisl congue turpis venenatis, quis
      elementum mauris ornare.
    </p>
    <Button label="Close" @click="closeModal()" />
  </div>
</template>
<script>
import { Button } from '../../../src/index'

export default {
  components: {
    Button,
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>
<style scoped>
.o-Modal__example {
  padding: 1rem;
}
</style>
