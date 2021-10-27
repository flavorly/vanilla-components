# Sidebar

| Prop       | Description                     | Accepted Values   | Default |
| :--------- | :------------------------------ | :---------------- | :------ |
| `isOpen`   | Visibility flag for the sidebar | `true` or `false` | `false` |
| `position` | Where the sidebar is located    | `right` or `left` | `right` |

| Event   | Description                                                                                                                                            | Parameters                |
| :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ |
| `close` | Triggered when the user signals intention to close the sidebar (through `ESC` key or clicking outside of it). Can be triggered inside the Sidebar body | `newValue`: Checked state |

| Slot      | Description           |
| :-------- | :-------------------- |
| `default` | Layout inside sidebar |

Sidebar

```vue
<Button label="Open sidebar" @click="openSidebar()" />
<Sidebar :is-open="isOpen" position="right" @close="closeSidebar()">
  <div class="o-Sidebar__example">
    <h1 style="margin: 0px;">Sidebar example</h1>
    <p>
      You can see that your TAB focus is trapped here. Upon closing, TAB focus will go back to the previously focused element.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros felis, accumsan sit amet pulvinar eget,
      blandit id dolor. In at pretium massa. Aenean sit amet nunc scelerisque, gravida odio sit amet, blandit orci.
      Quisque vehicula posuere elementum. Aliquam laoreet massa eu finibus rhoncus. Donec id cursus arcu, sed molestie nunc.
      Quisque tincidunt elit magna, gravida interdum ipsum congue sit amet. Nunc interdum augue sodales, sollicitudin risus non,
      consequat odio. In imperdiet vulputate mi eu ultricies. Phasellus pulvinar nisl congue turpis venenatis, quis elementum
      mauris ornare.
    </p>
    <Button label="Close" @click="closeSidebar()" />
  </div>
</Sidebar>
```

<SidebarExample />

<script setup>
import SidebarExample from './SidebarExample.vue'
</script>
