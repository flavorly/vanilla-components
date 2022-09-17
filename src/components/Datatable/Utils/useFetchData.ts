import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

import type {
  VanillaDatatableConfiguration,
  VanillaDatatableFetchDataPromise,
  VanillaDatatableQueryData,
} from '../index'

const useFetchData = <T extends VanillaDatatableConfiguration, Data extends VanillaDatatableQueryData>(
  config: T,
  data: Data,
): VanillaDatatableFetchDataPromise => {
  const isAction = data.action !== null
  const method = isAction ? config?.actionsMethod : config?.fetchMethod
  const url = isAction ? config?.actionsEndpoint : config?.fetchEndpoint
  const postParams = method === 'POST' ? data : {}
  const queryParams = method === 'GET' ? data : {}

  const axiosConfig = {
    method,
    url,
    data: postParams,
    params: queryParams,
  } as AxiosRequestConfig

  return axios(axiosConfig)
  .then(response => ({
    data: response.data?.data,
    links: response.data?.links,
    meta: response.data?.meta,
    responses: response.data?.responses,
    resolved: true,
  }))
}

export default useFetchData
