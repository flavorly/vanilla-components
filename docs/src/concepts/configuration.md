---
outline: deep
---

# Templates

## Overview

Templates are the files in a preset that may be extracted to the target directory.

They can be organized however you want, but most presets will simply copy the file hierarchy inside the template directory to the target directory.

## Template directory

By default, the template directory is `/templates` at the root of the preset project, but it can be changed with per extract action:

```ts
export default definePreset({
  // ...
  handler: async () => {
    extractTemplates({
      templates: 'preset/templates'
    })
  }
})
```

For more information about templates, refer to [the template extraction action](/action/extract-templates) in the documentation.
