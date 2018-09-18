import { queryRefers, queryReferDetailsById } from '../services/home';
import { parse } from 'qs'
import { Toast } from 'antd-mobile'
import { routerRedux } from 'dva/router'
export default {
  namespace : 'refers',
  state : {
    loading : false,
    detail : [],
    refersList : [],
    countPage : 0,
    pagination : {},
    detailTitle : ""
  },
  subscriptions: {
    detailSetup({ dispatch, history }){
      history.listen(({ pathname, search })=> {
        if(pathname === '/home/refers/detail'){
          const  { id, name }  = parse(search.substr(1))
          dispatch({ type : "queryDetail" , payload : {
            id : id,
            name : name
          } })
        }
        if(pathname === '/home/refers'){
          dispatch({
            type : 'initQueryRefersList'
          })
        }
      })
    },
  },
  effects : {
    *queryDetail({ payload }, { call ,put }) {
      yield put({ type : "showLoading" })
      try{
        const { data : res } = yield call(queryReferDetailsById,{ id : payload.id })
        if(res && res.code === 200) {
          yield put({ 
            type : 'queryDetailSuccess', 
            payload :  {
              title : payload.name,
              data : res.data
            }
          })
        }else if( res && res.code === 300){
          Toast.fail(res.msg ,2 )
        }else if( res && res.code ===2001){
          Toast.fail(res.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(err){
        if(err) throw new Error(err)
      }
      yield put({ type : 'hideLoading' })
    },
    *initQueryRefersList({ payload }, { call, put }) {
      yield put({ type : 'showLoading' })
      try{
        const { data: list } = yield call(queryRefers)
        if(list && list.code === 200) {
          yield put({ 
            type : "initQueryRefersListSuccess",
            payload : list.data
          })
        }
      }catch(err){
        if(err) throw new Error(err)
      }
      yield put({ type : 'hideLoading' })
    },
    *queryMoreList({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data: list } = yield call(queryRefers,{
          pageNo : payload.nextPage,
          pageSize : payload.pageSize
        })
        if(list && list.code === 200) {
          yield put({ 
            type : "queryMoreListSuccess",
            payload : list.data
          })
        }else if( list && list.code === 300){
          Toast.fail(list.msg ,2 )
        }else if( list && list.code ===2001){
          Toast.fail(list.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(err){
        if(err) throw new Error(err)
      }
      yield put({ type : 'hideLoading' })
    }
  },
  reducers : {
    queryDetailSuccess(state,{ payload }) {
      return {
        ...state,
        detail : payload.data,
        detailTitle : payload.title
      }
    },
    initQueryRefersListSuccess(state, { payload }) {
      return {
        ...state,
        refersList : payload.contebt,
        countPage : payload.page.PageCount,
        pagination : {
          page : payload.page.pogeNo,
          pageSize : payload.page.pogeSize
        }
      }
    },
    queryMoreListSuccess(state, { payload }){
      return {
        ...state,
        refersList : state.refersList.concat(payload.contebt),
        countPage : payload.page.PageCount,
        pagination : {
          page : payload.page.pogeNo,
          pageSize : payload.page.pogeSize
        }
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
  }
}