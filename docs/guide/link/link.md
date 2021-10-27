# Link

| Prop           | Description                                  | Accepted Values   | Default     |
| :------------- | :------------------------------------------- | :---------------- | :---------- |
| `label`        | The input's label                            | -                 | `undefined` |
| `title`        | HTML's title attribute                       | -                 | `undefined` |
| `href`         | Link's `href` attribute                      | -                 | `undefined` |
| `openOnNewTab` | Flag to enable opening the link on a new tab | `true` or `false` | `false`     |
| `disabled`     | HTML's disabled attribute                    | `true` or `false` | `false`     |

| Event   | Description                                                                               | Parameters |
| :------ | :---------------------------------------------------------------------------------------- | :--------- |
| `click` | Triggered on link click. We emit this event so that you don't need to rely on `href` only | -          |

Link

```vue
<Link label="Example link" />
```

<LinkExample />

<script setup>
import LinkExample from './LinkExample.vue'
</script>
