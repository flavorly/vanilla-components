import type { DatatableAction, DatatableConfiguration, DatatableQueryData } from '@flavorly/vanilla-components'
import { router } from 'hybridly'

export interface HybridlyDatatableOptions {
  actionsCallback?: boolean
}

export interface HybridlyDatatableAction {
  url: string
  reload: boolean
  query: string[]
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  data: Record<string, any>
  headers: Record<string, any>
  preserveScroll: boolean
  preserveState: boolean
  only: string[]
  except: string[]
  [key: string]: any
}

export default function useHybridlyDatatable(
  configuration: DatatableConfiguration,
  options: HybridlyDatatableOptions = {
    actionsCallback: true,
  },
): DatatableConfiguration {
  // After actions dispatch a hybridly request/visit
  if (options.actionsCallback && configuration.actions?.length > 0) {
    // foreach action inject a new callback while preserving the old one
    configuration.actions = configuration.actions.map((action: DatatableAction) => {
      // Has hybridly action, and also has a url
      if (action.after?.hybridly) {
        action.after.callback = (action: DatatableAction, data: DatatableQueryData, datatable: DatatableConfiguration) => {
          const hybridly = action.after?.hybridly as HybridlyDatatableAction

          // Should reload only
          if (hybridly && hybridly.reload) {
            router.reload({
              ...hybridly.options,
              data: {
                ...hybridly.options?.data || {},
                datatable: {
                  [datatable.name]: data,
                },
              },
            })
          }

          // Should visit the url
          if (hybridly && !hybridly.reload && action.after?.hybridly?.url) {
            router.navigate({
              ...hybridly.options,
              data: {
                ...hybridly.options?.data || {},
                datatable: {
                  [datatable.name]: data,
                },
              },
            })
          }
        }
      }

      return action
    })
  }

  // TODO: Datatable itself can be pulled with hybridly as well, we can hook the request function here

  return configuration
}
