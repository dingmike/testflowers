import { request } from '../utils';
import { stringify } from 'qs';
export async function login(params) {
  return request('/front/user/login',{
    method : 'post',
    data : stringify(params)
  })
}