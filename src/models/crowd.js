import { queryClassify, queryList, queryDetail, buycrowd } from '../services/crowd';
import { parse } from 'qs';
import { Toast } from 'antd-mobile'
import { routerRedux } from 'dva/router'
export default {
  namespace : 'crowd',
  state : {
    loading : false,
    pr : [],
    sa : [],
    detail : {},
    showModal : false
  },
  subscriptions : {
    setup({ dispatch, history }){
      history.listen(({ pathname, search })=> {
        if(pathname === '/crowd/detail'){
          const opt = parse(search.substr(1));
          dispatch({
            type : "queryCrowdDetail",
            payload : opt
          })
        }
        if(pathname === '/crowd'){
          dispatch({ type : 'query' })
        }
      })
    }
  },
  effects : {
    *query(action, { call, put }){
      yield put({ type: 'showLoading' })
      try{
        const { data: pr } = yield call(queryClassify, { typeId: 1 });
        if(pr && pr.code === 200) {
          yield put({ 
            type : 'queryPrSuccess',
            payload : pr.data
          })
          const { data : sa } = yield call(queryClassify, { typeId : 1, pid : pr.data[0].id })
          if(sa && sa.code === 200) {
            for(let i = 0; i < sa.data.length; i++){
                let { data : one } = yield call( queryList, { typeId : 1, pid : sa.data[i].id })
                if(one && one.code === 200){
                  sa.data[i].list = one.data
                }else if( one && one.code === 300){
                  Toast.fail(one.msg ,2 )
                }
              }
            yield put({ 
              type : 'querySaSuccess',
              payload : sa.data
            })
        }else if( sa && sa.code === 300){
          Toast.fail(sa.msg ,2 )
        }
        }else if( pr && pr.code === 300){
          Toast.fail(pr.msg ,2 )
        }
      }catch(err){
        throw new Error(err)
      }
      yield put({ type: 'hideLoading' })
    },
    *querySaTab({ payload }, { call, put }) {
      yield put({ type : 'showLoading' })
      try{
        const { data : sa } = yield call(queryClassify, { typeId : 1, ...payload })
        if(sa && sa.code === 200) {
          for(let i = 0; i < sa.data.length; i++){
              let { data : one } = yield call( queryList, { typeId : 1, pid : sa.data[i].id })
              if(one && one.code === 200){
                sa.data[i].list = one.data
              }else if( one && one.code === 300){
                Toast.fail(one.msg ,2 )
              }
            }
          yield put({ 
            type : 'querySaSuccess',
            payload : sa.data
          })
        }else if( sa && sa.code === 300){
          Toast.fail(sa.msg ,2 )
        }
      }catch(err){
        throw new Error(err)
      }
      yield put({ type: 'hideLoading' })
    },
    *queryCrowdDetail({payload}, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : d } = yield call(queryDetail,{...payload});
        if(d && d.code === 200) {
          yield put({ 
            type : 'queryCrowdDetailSuccess',
            payload : d.data
          })
        }else if( d && d.code === 300){
          Toast.fail(d.msg ,2 )
        }
      }catch(err){
        throw new Error(err)
      }
      yield put({ type: 'hideLoading' })
    },
    *buycrowd({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : r } = yield call(buycrowd, {
          ...payload,
          token : localStorage.getItem("token")
        })
        if(r && r.code ===200) {
          yield put({ type : 'hideModal' })
          Toast.success(r.msg, 2)
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(err){
        throw new Error(err)
      }
      yield put({ type: 'hideLoading' })
    }
  },
  reducers : {
    showLoading(state) {
      return {
        ...state,
        loading : true
      }
    },
    showModal(state){
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
    },
    hideLoading(state) {
      return {
        ...state,
        loading : false
      }
    },
    queryPrSuccess(state,{ payload }) {
      return {
        ...state,
        pr : payload
      }
    },
    querySaSuccess(state, { payload }) {
      return {
        ...state,
        sa : payload
      }
    },
    queryCrowdDetailSuccess(state, { payload }){
      return {
        ...state,
        detail : payload
      }
    }
  }
}