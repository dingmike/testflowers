import { request } from '../utils'
import { stringify } from 'qs'
export async function setPwd(params){
  return request('',{
    method : 'POST',
    data : stringify(params)
  })
}