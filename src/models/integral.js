import { 
  queryIntegral,
  queryInvests,
  queryIntegralInAndOut,
  transferIntegral,
  queryAccountName
} from '../services/application';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
export default {
  namespace : 'integral',
  state : {
    info : {},
    invests : [],
    loading : false,
    inIntegral : [],
    outIntegral : [],
    pagination : {},
    height : 0,
    showModal : false,
    accountName : ""
  },
  subscriptions : {
    setup({ dispatch, history }){
      history.listen(({ pathname })=> {
        if(pathname === "/application/integral"){
          dispatch({ type : 'query' })
        }
        if(pathname === "/application/integral/invests"){
          dispatch({ type : 'queryInvests' })
        }
        if(pathname === "/application/integral/inIntegral"){
          dispatch({ type : "queryInIntegral" })
        }
        if(pathname === "/application/integral/outIntegral"){
          dispatch({ type : "queryOutIntegral" })
        }
      })
    }
  },
  effects : {
    *query(_,{ call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : r } = yield call(queryIntegral,{
          token : localStorage.getItem('token')
        });
        if(r && r.code === 200){
          yield put({ type : "querySuccess", payload : r.data })
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
    },
    *queryInvests(_,{ call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : r } = yield call(queryInvests,{
          token : localStorage.getItem('token')
        });
        if(r && r.code === 200){
          yield put({ type : "queryInvestsSuccess", payload : r.data })
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
    },
    *queryInIntegral(action, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : r } = yield call(queryIntegralInAndOut,{
          token : localStorage.getItem('token'),
          pageNo : 1,
          pagesize : 10,
          type : 1
        });
        if(r && r.code === 200){
          yield put({ type : "queryInIntegralSuccess", payload : r.data })
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
    },
    *queryMoreInIntegral({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data: r } = yield call(queryIntegralInAndOut,{
          token : localStorage.getItem('token'),
          type : 1,
          pageNo : payload.nextPage,
          pagesize : payload.pageSize
        })
        if(r && r.code === 200){
          yield put({ type : "queryMoreInIntegralSuccess", payload : r.data })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error);
      }
      yield put({ type : 'hideLoading' })
    },
    *queryOutIntegral(action, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : r } = yield call(queryIntegralInAndOut,{
          token : localStorage.getItem('token'),
          pageNo : 1,
          pagesize : 10,
          type : 2
        });
        if(r && r.code === 200){
          yield put({ type : "queryOutIntegralSuccess", payload : r.data })
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
    },
    *queryMoreOutIntegral({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data: r } = yield call(queryIntegralInAndOut,{
          token : localStorage.getItem('token'),
          type : 2,
          pageNo : payload.nextPage,
          pagesize : payload.pageSize
        })
        if(r && r.code === 200){
          yield put({ type : "queryMoreOutIntegralSuccess", payload : r.data })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error);
      }
      yield put({ type : 'hideLoading' })
    },
    *transferIntegral({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data: r } = yield call(transferIntegral,{
          token : localStorage.getItem('token'),
          ...payload
        })
        if(r && r.code === 200){
          yield put({ type : 'closeModal' })
          yield put({ type : "query" })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error);
      }
      yield put({ type : 'hideLoading' })
    },
    *checkAccountName({ payload }, { call, put }){
      yield put({ type : 'showLoading'})
      try {
        const {data : n } = yield call(queryAccountName,{phone : payload}
        )
        if(n && n.code === 200){
          yield put({
            type : 'checkAccountNameSuccess',
            payload : n.data
          })
        }else if(n && n.code ===300){
          yield put({
            type : 'checkAccountNameSuccess',
            payload : ""
          })
          Toast.fail(n.msg, 2)
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
  },
  reducers : {
    checkAccountNameSuccess(state, { payload }){
      return {
        ...state,
        accountName : payload
      }
    },
    querySuccess(state, {payload} ){
      return {
        ...state,
        info : payload
      }
    },
    queryInvestsSuccess(state, { payload }){
      return {
        ...state,
        invests : payload
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
    queryOutIntegralSuccess(state, { payload }) {
      return {
        ...state,
        outIntegral : payload.contebt,
        pagination : {
          page : payload.page.pogeNo,
          pageSize : payload.page.pageSize,
          total : payload.page.PageCount
        }
      }
    },
    queryMoreOutIntegralSuccess(state, { payload }) {
      return {
        ...state,
        outIntegral : state.outIntegral.concat(payload.content),
        pagination : {
          page : payload.page.pogeNo,
          pageSize : payload.page.pageSize,
          total : payload.page.PageCount
        }
      }
    },
    queryInIntegralSuccess(state, { payload }) {
      return {
        ...state,
        inIntegral : payload.contebt,
        pagination : {
          page : payload.page.pogeNo,
          pageSize : payload.page.pageSize,
          total : payload.page.PageCount
        }
      }
    },
    queryMoreInIntegralSuccess(state, { payload }) {
      return {
        ...state,
        inIntegral : state.inIntegral.concat(payload.content),
        pagination : {
          page : payload.page.pogeNo,
          pageSize : payload.page.pageSize,
          total : payload.page.PageCount
        }
      }
    },
    setHeight(state, { payload }) {
      return {
        ...state,
        height : payload
      }
    },
    openModal(state) {
      return {
        ...state,
        showModal : true
      }
    },
    closeModal(state) {
      return {
        ...state,
        showModal : false
      }
    }
  }
}