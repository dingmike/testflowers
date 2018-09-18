import axios from 'axios';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

const prefix = "";
// const prefix = "http://192.168.9.102:8080/huahai";
// const prefix = "http://yangxiao.tunnel.qydev.com/huahai";

export default function request(url, options) {
  const prefixUrl = prefix + url;
  return axios(prefixUrl, options)
    .then(checkStatus)
    .then(({ data })=>{
      if(data.code === 200){
        return data
      }
      if( data.code === 300){
        const error = new Error(data.msg);
        throw error
      }
      if( data.code === 2001){}
    })
    .catch(err => ({ err }));
}
