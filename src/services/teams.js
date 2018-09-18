import { request } from '../utils';
import { stringify } from 'qs'
export async function queryDownUser(params) {
  return request('/front/user/queryDowmUser', {
    method : 'POST',
    data : stringify(params)
  })
}