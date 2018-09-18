// import { setPwd } from '../services/retrieve';
import { getAuthCode, pwdRest } from '../services/signIn';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {
  namespace : 'retrieve',
  state : {
    loading : false,
    loadingText : '加载中...',
    disabled : false,
    countDown : 60
  },
  effects : {
    *getAuthCode({ payload }, { call, put }){
      const { data : qr } = yield call(getAuthCode, payload);
      yield put({ type : 'disabledLock' })
      if(qr.code === 200) {
        Toast.success(
          <div>
            <p>验证码已发送</p>
            <p>如未收到,请稍后重试</p>
          </div>,2)
      }else if( qr && qr.code === 300){
        Toast.fail(qr.msg ,2 )
      }
    },
    *passwordRest({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : r } = yield call(pwdRest,payload);
        if(r && r.code ===200){
          Toast.success(r.msg, 2)
          yield put(routerRedux.push({
            pathname : '/login'
          }))
        }else if(r && r.code ===300){
          Toast.success(r.msg, 2)
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : 'hideLoading' })
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
    }
  }
}