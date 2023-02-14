import type { DatatableAction, DatatableConfiguration, DatatableQueryData } from '@flavorly/vanilla-components'
import { router } from '@inertiajs/vue3'

export interface InertiaDatatableOptions {
  actionsCallback?: boolean
}

export interface InertiaDatatableAction {
  url: string
  reload: boolean
  query: string[]
  options: {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete'
    data: Record<string, any>
    headers: Record<string, any>
    preserveScroll: boolean
    preserveState: boolean
    only: string[]
    [key: string]: any
  }
}

export default function useInertiaDatatable(
  configuration: DatatableConfiguration,
  options: InertiaDatatableOptions = {
    actionsCallback: true,
  },
): DatatableConfiguration {
  // After actions dispatch a inertia request/visit
  if (options.actionsCallback && configuration.actions?.length > 0) {
    // foreach action inject a new callback while preserving the old one
    configuration.actions = configuration.actions.map((action: DatatableAction) => {
      // Has inertia action, and also has a url
      if (action.after?.inertia) {
        action.after.callback = (action: DatatableAction, data: DatatableQueryData, datatable: DatatableConfiguration) => {
          const inertia = action.after?.inertia as InertiaDatatableAction

          // Should reload only
          if (inertia && inertia.reload) {
            router.reload({
              ...inertia.options,
              data: {
                ...inertia.options?.data || {},
                datatable: {
                  [datatable.name]: data,
                },
              },
            })
          }

          // Should visit the url
          if (inertia && !inertia.reload && action.after?.inertia?.url) {
            router.visit(inertia.url, {
              ...inertia.options,
              data: {
                ...inertia.options?.data || {},
                datatable: {
                  [datatable.name]: data,
                },
              },

              // data: inertia.options.data ? { ...inertia.options.data, ...data } : data,
            })
          }
        }
      }

      return action
    })
  }

  // TODO: Datatable itself can be pulled with inertia as well, we can hook the request function here

  return configuration
}
