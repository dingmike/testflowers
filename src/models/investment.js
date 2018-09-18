import { 
  queryInvestments, 
  queryInvestmentsDetail,
  transferInvestment,
  queryAccountName,
  cancelCrowd
} from "../services/application";
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { parse } from 'qs';
export default {
  namespace : 'investment',
  state : {
    open : [],
    stay : [],
    detail : {},
    loading : false,
    showModal : false,
    accountName : ""
  },
  subscriptions : {
    setup({ history, dispatch }){
      history.listen(({ pathname, search })=>{
        if(pathname === "/application/investment"){
          dispatch({
            type : 'query'
          })
        }
        if(pathname === "/application/investment/detail"){
          const opt = parse(search.substr(1));
          dispatch({
            type : 'queryDetail',
            payload : opt
          })
        }
      })
    }
  },
  effects : {
    *query(action, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const {data : open} = yield call(queryInvestments,{
          token : localStorage.getItem('token'),
          status : 1
        })
        const { data : stay } = yield call(queryInvestments, {
          token : localStorage.getItem('token'),
          status : 2
        })
        if(open && open.code === 200){
          yield put({ type : "queryOpenSuccess", payload : open.data })
        }else if( open && open.code === 300){
          Toast.fail(open.msg ,2 )
        }else if( open && open.code ===2001){
          Toast.fail(open.msg, 2)
          yield put(routerRedux.push('/login'))
        }
        if(stay && stay.code === 200){
          yield put({ type : "queryStaySuccess", payload : stay.data })
        }else if( stay && stay.code === 300){
          Toast.fail(stay.msg ,2 )
        }else if( stay && stay.code ===2001){
          Toast.fail(stay.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *queryDetail({ payload }, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : d } = yield call(queryInvestmentsDetail,{
          ...payload, token : localStorage.getItem("token")
        })
        if(d && d.code === 200){
          yield put({ type : "quyeryDetailSuccess", payload : d.data })
        }else if( d && d.code === 300){
          Toast.fail(d.msg ,2 )
        }else if( d && d.code ===2001){
          Toast.fail(d.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *transferInvest({ payload }, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : d } = yield call(transferInvestment,{
          ...payload, token : localStorage.getItem("token")
        })
        if(d && d.code === 200){
          Toast.success(d.msg, 2)
          yield put({ type : 'closeModal' })
          yield put(routerRedux.push('/application/investment'))
        }else if( d && d.code === 300){
          Toast.fail(d.msg ,2 )
        }else if( d && d.code ===2001){
          yield put({ type : 'closeModal' })
          Toast.fail(d.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *queryAccountName({ payload }, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : d } = yield call(queryAccountName,{
          phone : payload
        })
        if(d && d.code === 200){
          yield put({
            type : "queryAccountNameSuccess",
            payload : d.data
          })
        }else if( d && d.code === 300){
          yield put({
            type : "queryAccountNameSuccess",
            payload : ""
          })
          Toast.fail(d.msg ,2 )
        }else if( d && d.code ===2001){
          Toast.fail(d.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *cancelCrowd({ payload }, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : d } = yield call(cancelCrowd,{
          token : localStorage.getItem('token'),
          ...payload
        })
        if(d && d.code === 200){
          yield put(routerRedux.replace('/home'))
        }else if( d && d.code === 300){
          Toast.fail(d.msg ,2 )
        }else if( d && d.code ===2001){
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    }
  },
  reducers : {
    queryOpenSuccess(state, {payload} ){
      return {
        ...state,
        open : payload
      }
    },
    queryStaySuccess(state, { payload }){
      return {
        ...state,
        stay : payload
      }
    },
    quyeryDetailSuccess(state, { payload }){
      return {
        ...state,
        detail : payload
      }
    },
    queryAccountNameSuccess(state, { payload }){
      return {
        ...state,
        accountName : payload
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
    openModal(state) {
      return {
        ...state,
        showModal : true
      }
    },
    closeModal(state) {
      return {
        ...state,
        showModal : false,
        accountName : ""
      }
    }
  }
}