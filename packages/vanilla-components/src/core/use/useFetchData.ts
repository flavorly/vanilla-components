import { useCookies } from '@vueuse/integrations/useCookies'
import merge from 'lodash/merge'
import { urlHelper } from '../helpers'

export default function useFetchData(
  url: string,
  query: null | object = null,
  options: RequestInit = {},
): Promise<any> {
  // Extract proper token from cookies ( Laravel )
  const token = useCookies().get('XSRF-TOKEN')

  // Check for full qualified URL

  const finalUrl = urlHelper(url, query)

  const finalOptions = merge({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': token ? decodeURIComponent(token) : '',
    },
    credentials: 'include',
    ...options,
  })

  return fetch(finalUrl, finalOptions).then(response => response.json())
}
