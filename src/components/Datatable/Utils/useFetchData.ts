import axios, { AxiosRequestConfig } from 'axios';
import { hasProperty } from '@/core';
import {
  VanillaDatatableConfiguration,
  VanillaDatatableQueryData,
} from '../index';

const useFetchData = <T extends VanillaDatatableConfiguration, Data extends VanillaDatatableQueryData>(
  config: T,
  data: Data,
) => {
  const isAction = hasProperty(data, 'action');
  const method = isAction ? config?.actionsMethod : config?.fetchMethod;
  const url = isAction ? config?.actionsEndpoint : config?.fetchEndpoint;
  const postParams = method === 'POST' ? data : {};
  const queryParams = method === 'GET' ? data : {};

  const axiosConfig = {
    method: method,
    url: url,
    data: postParams,
    params: queryParams,
  } as AxiosRequestConfig;

  return axios(axiosConfig)
  .then((response) => ({
    data: response.data?.data as Record<string, any>[],
    links: response.data?.links,
    meta: response.data?.meta,
    responses: response.data?.responses,
    resolved: true,
  }));
};

export default useFetchData;
