import { getAuthCode } from '../../services/signIn';
import { realName } from '../../services/application';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
export default {
  namespace : 'certification',
  state : {
    loading : false,
    disabled : false,
  },
  subscriptions : {},
  effects : {
    *getAuthCode({ payload }, { call, put }){
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
      }else if(qr && qr.code === 300) {
        Toast.success(
          qr.msg, 
          2
        )
      }
    },
    *submitInfo({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : rname } = yield call(realName,{...payload, token : localStorage.getItem('token')});
        if(rname && rname.code === 200) {
          Toast.info(rname.msg,2)
          yield put(routerRedux.go(-1))
        }else if( rname && rname.code === 300){
          Toast.fail(rname.msg ,2 )
        }else if( rname && rname.code ===2001 || rname.code ===2003){
          Toast.fail(rname.msg, 2)
          yield put(routerRedux.push('/login'))
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