import { 
  queryAddress, 
  deleteAddress, 
  setDefaultAddress,
  addAddress
} from '../../services/address';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {
  namespace : 'address',
  state : {
    loading : false,
    addresses: [],
    modalType : '',
    showModal : false,
    // 修改地址时传入modal的参数
    currentAddress : {}
  },
  subscriptions : {
    setup({ dispatch, history }){
      history.listen(({ pathname })=> {
        if(pathname === "/application/address"){
          dispatch({ type : 'query' })
        }
      })
    }
  },
  effects : {
    *query(action, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : address } = yield call( queryAddress,{ token : localStorage.getItem('token')} );
        if(address && address.code === 200) {
          yield put({ 
            type : "querySuccess",
            payload : address.data
          })
        }else if(address && address.code === 2001 || address.code === 2003){
          Toast.fail(address.msg,2)
          yield put(routerRedux.push('/login'));
        }
      }catch(error){
        if(error){
          throw new Error(error)
        }
      }
      yield put({ type : 'hideLoading' })
    },
    *deleteAddress({ payload }, { call, put }){
      yield put({ type : 'hideModal' })
      yield put({ type : 'showLoading' })
      try{
        const { data: res } = yield call( deleteAddress, {
          token: localStorage.getItem('token'),
          id : payload
        })
        if(res && res.code === 200){
          Toast.success(res.msg, 2)
          yield put({ type : 'query' })
        }else if(res && res.code === 2001 || res.code === 2003) {
          yield put(routerRedux.push('/login'));
        }
      }catch(err){
        if(err) throw new Error(err)
      }
      yield put({ type : 'hideLoading' })
    },
    *setDefaultAddress({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data: res } = yield call( setDefaultAddress, {
          token: localStorage.getItem('token'),
          id : payload
        })
        if(res && res.code === 200){
          Toast.success(res.msg, 2)
          yield put({ type : 'query' })
        }else if(res && res.code === 2001 || res.code === 2003 ) {
          yield put(routerRedux.push('/login'));
        }
      }catch(err){
        if(err) throw new Error(err)
      }
      yield put({ type : 'hideLoading' })
    },
    *add({ payload }, { call, put }) {
      yield put({ type : 'showLoading' })
      try{
        const { data: res } = yield call( addAddress, {
          token: localStorage.getItem('token'),
          ...payload
        })
        if(res && res.code === 200){
          Toast.success(res.msg, 2)
          yield put({ type : 'hideModal' })
          yield put({ type : 'query' })
        }else if(res && res.code === 2001 || res.code === 2003) {
          yield put(routerRedux.push('/login'));
        }
      }catch(err){
        if(err) throw new Error(err)
      }
      yield put({ type : 'hideLoading' })
    },
    *editor({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data: res } = yield call( addAddress, {
          token: localStorage.getItem('token'),
          ...payload
        })
        if(res && res.code === 200){
          Toast.success(res.msg, 2)
          yield put({ type : 'hideModal' })
          yield put({ type : 'query' })
        }else if(res && res.code === 2001 || res.code === 2003) {
          yield put(routerRedux.push('/login'));
        }else {
          Toast.fail(res.msg,2)
        }
      }catch(err){
        if(err) throw new Error(err)
      }
      yield put({ type : 'hideLoading' })
    }
  },
  reducers : {
    querySuccess(state,{ payload }) {
      return {
        ...state,
        addresses : payload
      }
    },
    showLoading(state){
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
        ...payload
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