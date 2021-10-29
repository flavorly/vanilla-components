<template>
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-select class="inline-flex" :options="[
                {value: 'false', label: 'One Option'},
                {value: 'true', label: 'Two Options'}
            ]">
    </x-select>
  </div>
</template>

<script>
import XSelect from "../../../src/components/Inputs/Select";
export default {
  name: "ExampleSelect",
  components: {
    XSelect
  }
}
</script>
