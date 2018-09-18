import { getAuthCode } from '../../services/signIn'
import { bindBankCard, updatePassword } from '../../services/safety'
import { Toast,  } from 'antd-mobile';

import { routerRedux } from 'dva/router'
export default {
  namespace : 'safety',
  state : {
    loading : false,
    modalType : "",
    showModal : false,
    disabled : false,
  },
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
      }else if( qr && qr.code === 300){
        Toast.fail(qr.msg ,2 )
      }else if( qr && qr.code ===2001 || qr.code ===2003){
        Toast.fail(qr.msg, 2)
        yield put(routerRedux.push('/login'))
      }
    },
    *bindCard({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : card } = yield call(bindBankCard,{...payload,token : localStorage.getItem('token')})
        if(card && card.code === 200) {
          yield put({ type :"hideModal" })
          Toast.success("银行卡绑定成功", 2)
        }else if( card && card.code === 300){
          Toast.fail(card.msg ,2 )
        }else if( card && card.code ===2001 || card.code ===2003){
          Toast.fail(card.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(err){
        if(err) throw new Error(err)
      }
      yield put({ type : 'hideLoading' })
    },
    *changePwd({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : res } = yield call(updatePassword, {...payload,token : localStorage.getItem('token')})
        if(res && res.code === 200){
          yield put({ type : "hideModal" })
          Toast.success(res.msg,2)
        }else if( res && res.code === 300){
          Toast.fail(res.msg ,2 )
        }else if( res && res.code ===2001 || res.code ===2003){
          Toast.fail(res.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(err){
        if(err) throw new Error(err)
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
    downTime(state) {
      return {
        ...state,
        countDown : state.countDown - 1
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
    hideModal(state) {
      return {
        ...state,
        showModal : false
      }
    },
    showModal(state, { payload }){
      return {
        ...state,
        showModal : true,
        modalType : payload
      }
    }
  }
}