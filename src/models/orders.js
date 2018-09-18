import { queryBuyingOrders, queryOrderDetail, orderOpen, orderTransfer } from '../services/wine';
import { queryAddress } from '../services/address';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
export default {
  namespace : 'orders',
  state : {
    all : [],
    stay : [],//待窖藏
    dispose: [],//已窖藏
    out : [],//已转出
    apply : [],//申请启坛
    complete : [],
    loading: false,
    openKey : "",
    detail : {},
    modalType : "",
    showModal : false,
    address : [],
    showAddress : false,
    popShow : false
  },
  subscriptions : {
    setup({ dispatch, history }){
      history.listen(({ pathname, state, search })=> {
        if(pathname === '/application/orders' && !state){
          dispatch({ type : 'init' })
        }
        if(pathname ==="/application/orders" && state) {
          dispatch({
            type : "initOpenKey",
            payload : state
          })
          dispatch({
            type : 'query',
            payload : state
          })
        }
        if(pathname === "/application/orders/detail"){
          const opt  = parse(search.substr(1))
          dispatch({
            type : "queryDetail",
            payload : opt
          })
        }
      })
    }
  },
  effects : {
    *init({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : buy } = yield call(queryBuyingOrders,{
          token : localStorage.getItem("token"),
          status : 5
        })
        if(buy && buy.code ===200){
          yield put({ type : 'initSuccess', payload : buy.data })
        }else if( buy && buy.code === 300){
          Toast.fail(buy.msg ,2 )
        }else if( buy && buy.code ===2001){
          Toast.fail(buy.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : 'hideLoading' })
    },
    *query({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      let status = -1;
      if(payload==="all"){
        status = 5
      }
      if(payload ==="dispose"){
        status = 1
      }
      if(payload === 'apply'){
        status = 2
      }
      if(payload === 'complete'){
        status = 3
      }
      if(payload ==="stay"){
        status = 0
      }
      if(payload === "out") {
        status = 6
      }
      try{
        const { data : buy } = yield call(queryBuyingOrders,{
          token : localStorage.getItem("token"),
          status : status
        })
        if(buy && buy.code ===200){
          yield put({ type : `${payload}QuerySuccess`, payload : buy.data })
        }else if( buy && buy.code === 300){
          Toast.fail(buy.msg ,2 )
        }else if( buy && buy.code ===2001){
          Toast.fail(buy.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : 'hideLoading' })
    },
    *queryDetail({ payload }, { call, put }){
      yield put({ type:"showLoading" })
      try{
        const { data : d } = yield call(queryOrderDetail,{
          ...payload, token : localStorage.getItem('token')
        })
        if(d && d.code === 200) {
          yield put({ type : "queryDetailSuccess", payload : d.data })
          yield put({ type : 'queryAddress' })
        }else if( d && d.code === 300){
          Toast.fail(d.msg ,2 )
        }else if( d && d.code ===2001){
          Toast.fail(d.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        throw new Error(error)
      }
      yield put({ type:"hideLoading" })
    },
    *queryAddress(action,{ call, put }){
      yield put({ type : 'showLoading' })
      try {
        const { data : ad } = yield call(queryAddress,{
          token : localStorage.getItem('token')
        })
        if(ad && ad.code === 200) {
          yield put({ type : "queryAddressSuccess" , payload : ad.data })
        }else if( ad && ad.code === 300){
          Toast.fail(ad.msg ,2 )
        }else if( ad && ad.code ===2001){
          Toast.fail(ad.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        throw new Error(error)
      }
      yield put({ type :"hideLoading" })
    },
    *orderOpen({ payload }, { call, put, select }){
      yield put({ type : 'showLoading' })
      try{
        const { data : o } = yield call(orderOpen,{
          ...payload,
          token : localStorage.getItem('token')
        })
        if(o && o.code === 200) {
          Toast.success(o.msg, 2)
          yield put({ type : "hideModal" })
          yield put(routerRedux.replace({
            pathname : '/application/orders'
          }))
        }else if( o && o.code === 300){
          Toast.fail(o.msg ,2 )
        }else if( o && o.code ===2001){
          Toast.fail(o.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : 'hideLoading' })
    },
    *transferOrder({ payload }, { call, put, select }){
      yield put({ type : 'showLoading' })
      try{
        const { data : o } = yield call(orderTransfer,{
          ...payload,
          token : localStorage.getItem('token')
        })
        if(o && o.code === 200) {
          Toast.success(o.msg, 2)
          yield put({ type : "hideModal" })
          yield put(routerRedux.replace({
            pathname : '/application/orders'
          }))
        }else if( o && o.code === 300){
          Toast.fail(o.msg ,2 )
        }else if( o && o.code ===2001){
          Toast.fail(o.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : 'hideLoading' })
    }
  },
  reducers : {
    initSuccess(state, { payload }) {
      return {
        ...state,
        openKey : "all",
        all : payload
      }
    },
    initOpenKey(state, { payload }){
      return {
        ...state,
        openKey : payload
      }
    },
    allQuerySuccess(state, { payload }){
      return {
        ...state,
        all : payload
      }
    },
    stayQuerySuccess(state, { payload }){
      return {
        ...state,
        stay : payload
      }
    },
    applyQuerySuccess(state, { payload }){
      return {
        ...state,
        apply : payload
      }
    },
    outQuerySuccess(state, { payload }){
      return {
        ...state,
        out : payload
      }
    },
    disposeQuerySuccess(state, { payload }){
      return {
        ...state,
        dispose : payload
      }
    },
    completeQuerySuccess(state, { payload }){
      return {
        ...state,
        complete : payload
      }
    },
    queryDetailSuccess(state,{ payload }) {
      return {
        ...state,
        detail : payload
      }
    },
    queryAddressSuccess(state, { payload }) {
      return {
        ...state,
        address : payload
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
        modalType : payload
      }
    },
    hideModal(state) {
      return {
        ...state,
        showModal : false
      }
    },
    addressVisible(state) {
      return {
        ...state,
        showAddress : true
      }
    },
    addressHide(state) {
      return {
        ...state,
        showAddress : false
      }
    },
    showPop(state) {
      return {
        ...state,
        popShow : true
      }
    },
    hidePop(state) {
      return {
        ...state,
        popShow : false
      }
    }
  }
}