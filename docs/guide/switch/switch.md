# Switch

| Prop         | Description                                   | Accepted Values   | Default     |
| :----------- | :-------------------------------------------- | :---------------- | :---------- |
| `modelValue` | A variable for you to hook into using v-model | -                 | `undefined` |
| `label`      | The switch's label                            | -                 | `undefined` |
| `disabled`   | HTML's disabled attribute                     | `true` or `false` | `false`     |

| Event               | Description                      | Parameters               |
| :------------------ | :------------------------------- | :----------------------- |
| `update:modelValue` | Triggered on switch state change | `newValue`: Switch state |

The switch provides you with a different kind of checkbox

```vue
<p>State: {{ state }}</p>
<Switch label="Switch" v-model="state" />
```

<SwitchExample />

<script setup>
import SwitchExample from './SwitchExample.vue'
</script>
