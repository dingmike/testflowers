import { queryRollBanner } from '../services/home';
import { parse } from 'qs';
export default {
  namespace : 'news',
  state : {
    loading : false,
    newsList : [],
    showModal: false,
    detail : {}
  },
  subscriptions : {
    setup({ dispatch, history }){
      history.listen(({ pathname, search })=> {
        if(pathname === "/news"){
          dispatch({
            type : 'queryList'
          })
        }
        if(pathname === "/news/detail"){
          const opt = parse(search.substr(1))
          dispatch({ type : 'queryDetail' , payload : opt })
        }
      })
    }
  },
  effects : {
    *queryList({ payload }, { call, put, select }){
      yield put({ type : "showLoading" })
      try{
        const { data : l } = yield call(queryRollBanner,{
          type : 1
        })
        if(l && l.code ===200) {
          yield put({
            type: "queryListSuccess",
            payload : l.data
          })
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *queryDetail({ payload }, { call, put }) {
      yield put({ type : "showLoading" })
      try{
        const { data : l } = yield call(queryRollBanner,{
          ...payload
        })
        if(l && l.code ===200) {
          yield put({
            type: "queryDetailSuccess",
            payload : l.data[0]
          })
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    }
  },
  reducers : {
    queryListSuccess(state, { payload }) {
      return {
        ...state,
        newsList : payload
      }
    },
    queryDetailSuccess(state, { payload }){
      return {
        ...state,
        detail : payload
      }
    },
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
    showModal(state, { payload }) {
      return {
        ...state,
        showModal : true,
        detail : payload
      }
    },
    hideModal(state) {
      return {
        ...state,
        showModal : false,
        detail : {}
      }
    }
  }
}