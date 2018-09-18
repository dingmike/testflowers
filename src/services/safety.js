import { request } from '../utils';
import { stringify } from 'qs'
export async function bindBankCard(params) {
  return request('/front/userInfo/save', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function updatePassword(params) {
  return request('/front/user/updatePassword', {
    method: "POST",
    data : stringify(params)
  })
}