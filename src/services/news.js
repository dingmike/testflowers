import { request } from '../utils';
import { stringify } from 'qs';

export async function queryList(parmas) {
  return request('/front/notice/query', {
    method : 'POST',
    data : stringify(parmas)
  })
}