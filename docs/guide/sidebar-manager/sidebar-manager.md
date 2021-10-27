# Sidebar Manager

Creating a simple Sidebar component is not difficult in itself. Issues arise when you have to manage multiple possible Sidebars and keep track of their display state simultaneosly.

Assuming you have to display multiple different Sidebars with various layouts, using only the Sidebar component previously shown, it would look probably similar to the following code snippet

```vue
<Sidebar :is-open="isFirstSidebarOpen" @close="isFirstSidebarOpen = false">
  <p>I am the first Sidebar</p>
</Sidebar>
<Sidebar :is-open="isFirstSidebarOpen" @close="isFirstSidebarOpen = false">
  <p>I am the second Sidebar</p>
</Sidebar>
<Sidebar :is-open="isFirstSidebarOpen" @close="isFirstSidebarOpen = false">
  <p>I am the third Sidebar</p>
</Sidebar>

const isFirstSidebarOpen = false const isSecondSidebarOpen = false const
isThirdSidebarOpen = false ...
```

Now this starts to become harder the more Sidebars you need to manage not taking into the consideration that there is more boilerplate code involved than the one shown above.

In this component library the solution is the SidebarManager component. This component is responsible for listening to events in an event bus and receiving a component that can be rendered close the HTML's body tag.

To use it:

1. You register the SidebarManager component in the `app.vue` of your application.

```vue
import { SidebarManager } from '@ulissesferreira/moon'

<div id="app">
  <sidebar-manager><sidebar-manager/>
</div>
```

2. You call the open function that this library provides and pass in a Sidebar layout component. This will keep all your Sidebars organized in single file components.

```vue
<Button label="Open" @click="openSidebar" />

import { EVENTS, EventBus } from '@ulissesferreira/moon' import LayoutExample
from '@/components/Sidebars/LayoutExample.vue' function openSidebar() {
EventBus.emit(EVENTS.OPEN_Sidebar, { component: LayoutExample }) }
```

<SidebarManagerExample />

<script setup>
import SidebarManagerExample from './SidebarManagerExample.vue'
</script>
