import { request } from '../utils';
import { stringify } from 'qs'

export async function queryAddress(params) {
  return request('/front/ReceivingAddress/query', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function deleteAddress(params) {
  return request('/front/ReceivingAddress/delete', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function updateAddress(params) {
  return request('/front/ReceivingAddress/update', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function setDefaultAddress(params) {
  return request('/front/ReceivingAddress/Isdefault', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function addAddress(params) {
  return request('/front/ReceivingAddress/save', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function editorAddress(params) {
  return request('/front/ReceivingAddress/update', {
    method : 'POST',
    data : stringify(params)
  })
}