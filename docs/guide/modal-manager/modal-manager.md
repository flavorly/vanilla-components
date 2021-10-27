# Modal Manager

Creating a simple Modal component is not difficult in itself. Issues arise when you have to manage multiple possible Modals and keep track of their display state simultaneosly.

Assuming you have to display multiple different modals with various layouts, using only the Modal component previously shown, it would look probably similar to the following code snippet

```vue
<Modal :is-open="isFirstModalOpen" @close="isFirstModalOpen = false">
  <p>I am the first Modal</p>
</Modal>
<Modal :is-open="isFirstModalOpen" @close="isFirstModalOpen = false">
  <p>I am the second Modal</p>
</Modal>
<Modal :is-open="isFirstModalOpen" @close="isFirstModalOpen = false">
  <p>I am the third Modal</p>
</Modal>

const isFirstModalOpen = false const isSecondModalOpen = false const
isThirdModalOpen = false ...
```

Now this starts to become harder the more Modals you need to manage not taking into the consideration that there is more boilerplate code involved than the one shown above.

In this component library the solution is the ModalManager component. This component is responsible for listening to events in an event bus and receiving a component that can be rendered close the HTML's body tag.

To use it:

1. You register the ModalManager component in the `app.vue` of your application.

```vue
import { ModalManager } from '@ulissesferreira/moon'

<div id="app">
  <modal-manager><modal-manager/>
</div>
```

2. You call the open function that this library provides and pass in a modal layout component. This will keep all your Modals organized in single file components.

```vue
<Button label="Open" @click="openModal" />

import { EVENTS, EventBus } from '@ulissesferreira/moon' import LayoutExample
from '@/components/Modals/LayoutExample.vue' function openModal() {
EventBus.emit(EVENTS.OPEN_MODAL, { component: LayoutExample }) }
```

<ModalManagerExample />

<script setup>
import ModalManagerExample from './ModalManagerExample.vue'
</script>
