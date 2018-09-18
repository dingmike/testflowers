import { queryDownUser } from '../services/teams';
import { routerRedux } from 'dva/router';
import { Toast } from "antd-mobile";
import { parse } from 'qs';
const regexp = /^[/application/teams?]/;
export default {
  namespace : 'teams',
  state : {
    team : [],
    loading : false,
    showModal : false
  },
  subscriptions : {
    setup({dispatch, history}) {
      history.listen(({ pathname, search })=> {
        if(regexp.test(pathname) && !!search ){
          const opt = parse(search.substr(1));
          dispatch({ 
            type : "queryDownUser", 
            payload : {
              ...opt
            }})
        }
      })
    }
  },
  effects : {
    *queryDownUser({ payload}, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : downUser } = yield call(queryDownUser, {...payload, token : localStorage.getItem('token') })
        if(downUser && downUser.code === 200 ){
          yield put({
            type : 'queryDownUserSuccess',
            payload : downUser.data
          })
        }else if( downUser && downUser.code === 300){
          Toast.fail(downUser.msg ,2 )
        }else if( downUser && downUser.code ===2001){
          Toast.fail(downUser.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(err){
        if(err) throw new Error(err)
      }
      yield put({ type : "hideLoading" })
    }
  },
  reducers : {
    showLoading(state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading(state) {
      return {
        ...state,
        loading: false
      }
    },
    queryDownUserSuccess(state, { payload }){
      return {
        ...state,
        team : payload
      }
    },
    showModal(state) {
      return {
        ...state,
        showModal : true
      }
    },
    hideModal(state) {
      return {
        ...state,
        showModal : false
      }
    }
  }
}