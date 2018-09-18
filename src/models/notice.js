import { queryRollBanner } from '../services/home';
import { Toast } from 'antd-mobile'
export default {
  namespace : 'notice',
  state : {
    loading : false,
    noticeList : [],
    showModal: false,
    detail : {}
  },
  subscriptions : {
    setup({ dispatch, history }){
      history.listen(({ pathname })=> {
        if(pathname === "/notice"){
          dispatch({
            type : 'queryList'
          })
        }
      })
    }
  },
  effects : {
    *queryList({ payload }, { call, put, select }){
      yield put({ type : "showLoading" })
      try{
        const { data : l } = yield call(queryRollBanner,{
          type : 2
        })
        if(l && l.code ===200) {
          yield put({
            type: "queryListSuccess",
            payload : l.data
          })
        }else if( l && l.code === 300){
          Toast.fail(l.msg ,2 )
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
        noticeList : payload
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