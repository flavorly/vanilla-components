import type * as Types from '../config'

const validator = (config: Types.DatatableConfiguration) => {
    // Validate if columns exists
    if (typeof config?.columns === 'undefined' || config?.columns === null || config?.columns.length <= 0) {
      throw new Error('You must define the columns for this table')
    }

    // Ensure all columns have a name
    config?.columns.forEach((column: Types.DatatableColumn) => {
        if (!column.name) {
          throw new Error(`You must define a name for this column ${column.name}`)
        }
    })

    // Ensure we have either a callback for fecth data or endpoints are set
    if (config?.fetchData === undefined && (config?.fetchEndpoint === undefined || config?.actionsEndpoint === undefined)) {
      throw new Error('You must define fetchData function to fetch the data or fetchEndpoint & actionsEndpoint to allow the default function to take care of it.')
    }
}

export default validator
