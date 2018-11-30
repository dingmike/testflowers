function setupWebViewJavascriptBridge(callback) {
  //iOS使用相机桥接代码
  //iOS使用
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }

  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }

  window.WVJBCallbacks = [callback];

  var WVJBIframe = document.createElement('iframe');

  WVJBIframe.style.display = 'none';

  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';

  document.documentElement.appendChild(WVJBIframe);

  setTimeout(function () {

    document.documentElement.removeChild(WVJBIframe)

  }, 0)

  //Android使用

  if (window.WebViewJavascriptBridge) {

    return callback(window.WebViewJavascriptBridge)

  } else {

    document.addEventListener(
      'WebViewJavascriptBridgeReady',

      function () {

        return callback(window.WebViewJavascriptBridge)

      },

      false
    );

  }
}

export const webViewBridge = setupWebViewJavascriptBridge;
// 和ios android对接
/*
* @params name  调用ios和android的方法名
* @params type  需要传递的参数对象
*
* */

export function bridegWithPhone(name,type) {
  return new Promise((resolve, reject)=> {
    setupWebViewJavascriptBridge(async function(brideg){
      await brideg.callHandler(name,type, async (res)=> {
        const response = await JSON.parse(res);
        if(response.respCode==='0' || response.respCode === 0 ) {
          // 支付 成功
          resolve(response)
        }else {
          reject(response.msg)
        }
      })
    })
  })
}

//  const { data } = await bridegWithPhoto('loadPicture', { type : 'Photo' }); 调用
export async function bridegWithPhoto(name,type) {
  return new Promise((resolve, reject)=> {
    setupWebViewJavascriptBridge(async function(brideg){
      await brideg.callHandler(name,type,async (res)=> {
        const response = await JSON.parse(res);
        if(response.ret_code==='1' || response.ret_code === 1 ) {
          resolve(response.ret_msg)
        }else {
          reject(response.ret_msg)
        }
      })
    })
  })
}
