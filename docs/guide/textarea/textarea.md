# Textarea

| Prop          | Description                                   | Accepted Values                               | Default     |
| :------------ | :-------------------------------------------- | :-------------------------------------------- | :---------- |
| `modelValue`  | A variable for you to hook into using v-model | -                                             | `undefined` |
| `label`       | The textarea's label                          | -                                             | `undefined` |
| `placeholder` | The textarea's placeholder                    | -                                             | `undefined` |
| `name`        | The textarea's HTML name (useful for forms)   | -                                             | `undefined` |
| `required`    | HTML's required attribute                     | `true` or `false`                             | `false`     |
| `disabled`    | HTML's disabled attribute                     | `true` or `false`                             | `false`     |
| `resize`      | Textarea's resize attribute                   | `default`, `vertical`, `horizontal` or `none` | `false`     |

| Event               | Description                     | Parameters                   |
| :------------------ | :------------------------------ | :--------------------------- |
| `update:modelValue` | Triggered on native input event | `newValue`: Text on textarea |

Textarea

```vue
<p>State: {{ text }}</p>
<Textarea label="Textarea" v-model="text" />
```

<TextareaExample />

<script setup>
import TextareaExample from './TextareaExample.vue'
</script>
