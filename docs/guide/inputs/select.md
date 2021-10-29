# Select

Plain select for vue

## Properties

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `label`    | The button's text         | -                               | `undefined` |
| `title`    | HTML title attribute      | -                               | `undefined` |
| `type`     | Visual type of button     | `default`, `outlined` or `text` | `default`   |
| `disabled` | HTML's disabled attribute | `true` or `false`               | `false`     |

## Events

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `click` | Triggered on button click | `$event` |
| `reset` | Triggered on button to reset | `$event` |

## Example
```vue
<x-button variant="any-variant" :loading="true" :invalid="false">
Submit Something
</x-button>
```

## Preview
<x-wrapper src="input-select" />
