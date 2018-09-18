import { request } from '../utils';
import { stringify } from 'qs'
export async function getAuthCode(params) {
  return request('/front/user/getCode',{
    method : 'POST',
    data : stringify(params)
  })
}

export async function register(params) {
  return request('/front/user/register', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function pwdRest(params) {
  return request('/front/user/forgetPassword', {
    method : 'POST',
    data : stringify(params)
  })
}