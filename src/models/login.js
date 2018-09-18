import { routerRedux } from 'dva/router';
import { login } from '../services/login';
import { Toast } from 'antd-mobile';
import { delay } from '../utils';

export default {
  namespace : 'login',
  state : {
    prevRouter : '/home',
    loading : false
  },
  subscriptions : {
    setup({ history, dispatch }){
      history.listen(({ pathname, state })=> {
        if(pathname === '/login'){
          dispatch({
            type : 'prevRouterUpdate',
            payload : state
          })
        }
      })
    }
  },
  effects : {
    *login({ payload },{ call, put, select }){
      yield put({ type : 'showLoading' })
      yield call(delay, 2000)
      const { data : lg } =  yield call(login,payload)
      if(lg && lg.code === 200) {
        localStorage.setItem('token',lg.data.token)
        yield put({ type : 'hideLoading' })
        const prevR = yield select(state=> state.login.prevRouter);
        yield put(routerRedux.replace(!!prevR ? prevR : '/'))
      }else if(lg && (lg.code === 300 || lg.code === 2003) ) {
        Toast.fail(lg.msg,2)
      }
      yield put({ type : 'hideLoading' })
    }
  },
  reducers : {
    showLoading(state) {
      return {
        ...state,
        loading : true
      }
    },
    hideLoading(state) {
      return {
        ...state,
        loading : false
      }
    },
    prevRouterUpdate(state, { payload }){
      return {
        ...state,
        prevRouter : payload
      }
    }
  } 
}