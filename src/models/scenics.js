import { queryDetailsById, queryScenic } from '../services/home';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux} from 'dva/router'
export default {
  namespace : 'scenics',
  state : {
    loading : false,
    detail : {},
    scenicsList : [],
    countPage : 0,
    pagination : {}
  },
  subscriptions: {
    detailSetup({ dispatch, history }){
      history.listen(({ pathname, search })=> {
        if(pathname === '/home/scenics/detail'){
          const  { id, name }  = parse(search.substr(1))
          dispatch({ type : "queryDetail" , payload : {
            id : id,
            name : name
          } })
        }
        if(pathname === '/home/scenics'){
          dispatch({
            type : 'initQueryScenicsList'
          })
        }
      })
    },
  },
  effects : {
    *queryDetail({ payload }, { call ,put }) {
      yield put({ type : "showLoading" })
      try{
        const { data : res } = yield call(queryDetailsById,{ id : payload.id })
        if(res && res.code === 200) {
          yield put({ 
            type : 'queryDetailSuccess', 
            payload :  res.data
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
    *initQueryScenicsList({ payload }, { call, put }) {
      yield put({ type : 'showLoading' })
      try{
        const { data: list } = yield call(queryScenic)
        if(list && list.code === 200) {
          yield put({ 
            type : "initQueryScenicsListSuccess",
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
    },
    *queryMoreList({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data: list } = yield call(queryScenic,{
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
        detail : payload
      }
    },
    initQueryScenicsListSuccess(state, { payload }) {
      return {
        ...state,
        scenicsList : payload.contebt,
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
        scenicsList : state.scenicsList.concat(payload.contebt),
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