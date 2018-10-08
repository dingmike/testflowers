import { getAuthCode, register } from '../services/signIn';
import { Toast } from 'antd-mobile';
// import { routerRedux } from 'dva/router'
import { parse } from 'qs';

export default {
  namespace : 'signIn',
  state : {
    loading : false,
    loadingText : '加载中...',
    disabled : false,
    countDown : 60,
    referrer : ""
  },
  subscriptions: {
    setup({ dispatch, history }){
      history.listen(({ pathname, search })=> {
        if(pathname === '/signIn' && !!search ){
          const opt = parse(search.substr(1));
          dispatch({
            type : "referrerInit",
            payload : opt
          })
        }
      })
    }
  },
  effects : {
    *getAuthCode({ payload }, { call, put }){
      yield put({ type : "showLoading" })
      const { data : qr } = yield call(getAuthCode, payload);
      yield put({
        type : 'disabledLock'
      })
      if(qr && qr.code === 200) {
        Toast.success(
          <div>
            <p>验证码已发送</p>
            <p>如未收到,请稍后重试</p>
          </div>,
          2)
        }else if(qr && qr.code === 300){
          Toast.fail(qr.msg, 2)
        }
        yield put({ type : "hideLoading" })
      },
      *signIn({ payload }, { call, put }){
        yield put({ type : "showLoading" })
        const { data: sn } = yield call(register,payload)
        if(sn && sn.code === 200) {
          Toast.success(sn.msg, 2)
          // h5页面跳转到蒲公英下载app页面
        window.open("https://www.pgyer.com/tfuy")
        // // app跳转到登陆界面
          // yield put(routerRedux.replace('/login'))
        }else if(sn && sn.code ===300) {
          Toast.fail(sn.msg, 2)
        }
        yield put({ type : "hideLoading" })
    }
  },
  reducers : {
    showLoading(state,{ payload }) {
      return {
        ...state,
        loading: true,
        loadingText : payload
      }
    },
    hideLoading(state) {
      return {
        ...state,
        loading: false,
        loadingText : '加载中'
      }
    },
    disabledLock(state) {
      return {
        ...state,
        disabled : true
      }
    },
    disabledUnLock(state) {
      return {
        ...state,
        disabled : false
      }
    },
    referrerInit(state, { payload : { referrer } }) {
      return {
        ...state,
        referrer : referrer
      }
    }
  }
}
