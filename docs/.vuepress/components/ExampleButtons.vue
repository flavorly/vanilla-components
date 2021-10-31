<template>
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-button class="inline-flex">
      Primary
    </x-button>

    <x-button class="inline-flex" variant="danger">
      Danger
    </x-button>

    <x-button class="inline-flex" variant="secondary">
      Danger
    </x-button>

    <x-button class="inline-flex" :loading="true">
      Loading
    </x-button>

    <x-button class="inline-flex" :invalid="true">
      Loading
    </x-button>
  </div>
</template>

<script>
import XButton from "@/components/Buttons/Button";
export default {
  name: "ExampleButtons",
  components: {
    XButton
  }
}
</script>
