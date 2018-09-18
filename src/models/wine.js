import { queryClassify } from '../services/crowd';
import { queryByCategoryId, queryWineDetail, buyWine, queryAgreePortocol } from '../services/wine';
import { Toast } from 'antd-mobile'
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
export default {
  namespace : 'wine',
  state : {
    classify : [],
    loading : false,
    list : [],
    detail : {},
    showModal : false,
    showAgreeModal: false,
    agreed: false, // 默认不同意协议
    agreeContent:''
  },
  subscriptions : {
    setup({ dispatch, history }){
      history.listen(({ pathname, search })=> {
        if(pathname === "/wine"){
          dispatch({ type : "queryClassify" })
        }
        if(pathname==="/wine/detail"){
          const opt = parse(search.substr(1))
          dispatch({
            type : 'queryDetailById',
            payload : opt
          });
          dispatch({
            type : 'queryAgreeContentByType'
          })
        }
      })
    }
  },
  effects : {
    *queryClassify({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : c } = yield call(queryClassify, {...payload, typeId : 2});
        if(c && c.code === 200) {
          yield put({
            type : "queryListForId",
            payload : c.data[0].id
          })
          yield put({
            type : "queryClassifySuccess",
            payload : c.data
          })
        }else if( c && c.code === 300){
          Toast.fail(c.msg ,2 )
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : 'hideLoading'})
    },
    *queryListForId({ payload }, { call ,put }){
      yield put({ type : "showLoading"})
     try{
      const { data : c } = yield call(queryByCategoryId,{id : payload })
      if(c && c.code === 200) {
        yield put({
          type : "queryListForIdSuccess",
          payload : c.data
        })
      }else if( c && c.code === 300){
        Toast.fail(c.msg ,2 )
      }
     }catch(error){
       if(error) throw new Error(error)
     }
      yield put({ type: "hideLoading"})
    },
    *queryDetailById({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      const { data : d } = yield call(queryWineDetail,{ id : payload.id });
      if(d && d.code === 200){
        yield put({
          type : "queryDetailByIdSuccess",
          payload : d.data
        })
      }else if( d && d.code === 300){
        Toast.fail(d.msg ,2 )
      }
      yield put({ type : 'hideLoading' })
    },

    *queryAgreeContentByType({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      const { data : d } = yield call(queryAgreePortocol,{ type : 1 });
      if(d && d.code === 200){
        console.log(d.data)
        yield put({
          type : "queryAgreementContent",
          payload : d.data
        })
      }else if( d && d.code === 300){
        Toast.fail(d.msg ,2 )
      }
      yield put({ type : 'hideLoading' })
    },


    *buyWine({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : r } = yield call(buyWine,{...payload, token: localStorage.getItem('token')});
        if(r && r.code === 200){
          yield put({ type : 'hideModal' })
          Toast.success("购买成功", 2)
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001 || r.code ===2003){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        throw new Error(error)
      }
      yield put({ type : 'hideLoading' })
    }
  },
  reducers : {
    queryClassifySuccess(state,{ payload }){
      return {
        ...state,
        classify : payload
      }
    },
    queryListForIdSuccess(state,{ payload }){
      return {
        ...state,
        list : payload
      }
    },
    queryDetailByIdSuccess(state,{ payload }){
      return {
        ...state,
        detail : payload
      }
    },
    queryAgreementContent(state,{payload}){
      return {
        ...state,
        agreeContent: payload
      }
    },

    showLoading(state){
      return {
        ...state,
        loading: true
      }
    },
    hideLoading(state){
      return {
        ...state,
        loading : false
      }
    },
    showModal(state){
      return {
        ...state,
        showModal: true
      }
    },
    hideModal(state){
      return {
        ...state,
        showModal : false
      }
    },
    showAgreeModal(state){
      return {
        ...state,
        showAgreeModal: true
      }
    },
    hideAgreeModal(state){
      return {
        ...state,
        agreed : false,
        showAgreeModal: false
      }
    },
    agreePortocol(state){
      return {
        ...state,
        agreed : true,
        showAgreeModal: false,
        showModal: true
      }
    },
    agreeFalse(state){
      return {
        ...state,
        agreed : false,
      }
    }
  }
}
