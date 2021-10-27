<template>
  <Progress :value="progress" max="1" />
</template>
<script>
import { Progress } from '../../../src/index'

let randomProgressGenerator

export default {
  name: 'ProgressExample',
  components: {
    Progress,
  },
  data() {
    return {
      progress: 0.03,
    }
  },
  mounted() {
    randomProgressGenerator = setInterval(() => {
      this.progress = Math.random()
    }, 1500)
  },
  beforeUnmount() {
    clearInterval(randomProgressGenerator)
  },
}
</script>
