---
outline: deep
---

# Edit files

:::tip Work in progress
This documentation is work-in-progress. In the meantime, you can take a look at the interfaces.
:::

## Interfaces

```ts
interface EditFilesOptions {
  /**
    * The files to edit. Can use a double-star glob.
    */
  files: string | string[]

  /**
    * List of operations to perform on the given file.
    */
  operations: EditFileOperation[]
}

type EditFileOperation = (AddLineAtIndexOperation | AddLineAtOperation | AddLineWithMatchOperation | RemoveLineOperation | ReplaceVariablesOperation | UpdateContentOperation | EditJsonOperation) & {
  /**
   * Whether to skip that operation.
   */
  skipIf?: (content: string, targetFile: string) => Promisable<Boolean>
}


/*
|--------------------------------------------------------------------------
| Add line
|--------------------------------------------------------------------------
*/

interface AddLineOperation {
  type: 'add-line'

  /**
    * The lines to add.
    */
  lines: string | string[]

  /**
    * Indentation for this line addition.
    * If a number: will indent with the given amount of spaces.
    * If a string: will use the given string as indentation.
    * If true: will keep the indentation from the line before or after.
    * If false: will not indent.
    */
  indent?: number | string | boolean
}

type AddLineWithMatchOperation = AddLineOperation & {
  /**
   * Whether to add the line before or after the matched line.
   */
  position: 'after' | 'before'

  /**
   * The line to match.
   */
  match: RegExp
}

type AddLineAtOperation = AddLineOperation & {
  /**
   * Whether to prepend or append the line.
   */
  position: 'prepend' | 'append'
}

type AddLineAtIndexOperation = AddLineOperation & {
  /**
   * The index to which add the line.
   */
  position: number
}

/*
|--------------------------------------------------------------------------
| Remove line
|--------------------------------------------------------------------------
*/

interface RemoveLineOperation {
  type: 'remove-line'

  /**
    * The line to match.
    */
  match: RegExp

  /**
   * The index to start removing lines from. Defaults to 0.
   */
  start?: number

  /**
   * The amount of lines to remove. Defaults to 1, can be negative to remove previous lines.
    */
  count?: number
}

/*
|--------------------------------------------------------------------------
| Replace variables
|--------------------------------------------------------------------------
*/

interface ReplaceVariablesOperation {
  type: 'replace-variables'

  /**
    * Variable prefix. Defaults to @@.
    */
  prefix?: string

  /**
    * An object which keys are variable names and values are variable content.
    */
  variables: Record<string, string | number | ((content: string) => string | number)>
}

/*
|--------------------------------------------------------------------------
| Update content
|--------------------------------------------------------------------------
*/

interface UpdateContentOperation {
  type: 'update-content'

  /**
   * Callback that takes the file content and must return the updated content.
   */
  update: (content: string) => string
}

/*
|--------------------------------------------------------------------------
| Edit JSON
|--------------------------------------------------------------------------
*/

interface EditJsonOperation {
  type: 'edit-json'

  /**
   * Merges the given JSON object.
   */
  merge?: JsonObject

  /**
   * Replaces the given JSON object.
   * A helper is given to omit keys from the given JSON object.
   */
  replace?: (current: any, omit: (object: any, ...keys: string[]) => any) => JsonObject

  /**
   * Deletes the properties at the given paths. Paths may have dots.
   */
  delete?: string | string[]
}
```
