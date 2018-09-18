import { orderLogistics } from '../services/wine';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
export default {
  namespace : "logistics",
  state : {
    logis : [],
    expName : "",
  },
  subscriptions : {
    setup({ history, dispatch }){
      history.listen(({ pathname, search })=>{
        if(pathname === '/orders/logistics'){
          const p = parse(search.substr(1));
          dispatch({
            type : 'query',
            payload : p
          })
        }
      })
    }
  },
  effects : {
    *query({ payload }, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : r } = yield call(orderLogistics,{
          token : localStorage.getItem('token'),
          ...payload
        });
        if(r && r.code === 200){
          yield put({ type : "querySuccess", payload : {
            logis : r.data,
            expName : r.expName
          } })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    }
  },
  reducers : {
    querySuccess(state, {payload : { expName, logis } } ){
      return {
        ...state,
        logis : logis,
        expName : expName
      }
    } 
  }
}