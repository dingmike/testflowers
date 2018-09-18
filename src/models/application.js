import { query, companyInfo, updateAreaRatio } from '../services/application';
import { routerRedux } from 'dva/router';
export default {
  namespace : 'application',
  state : {
    userInfo : {},
    loading : false,
    team : [],
    companyInfo : {},
    showModal : false,
    modalType : ""
  },
  subscriptions : {
    setup({ history, dispatch }){
      history.listen(({ pathname })=> {
        if(pathname === '/application'){
          dispatch({
            type : 'query'
          })
        }
      })
    }
  },
  effects : {
    *query(action, { call, put }) {
      yield put({ type : 'showLoading' })
      try{
        const { data : userInfo } = yield call(query,{ token : localStorage.getItem('token')} )
        if(userInfo && userInfo.code === 200) {
          yield put({
            type : 'querySuccess',
            payload : userInfo.data
          })
        }else if(userInfo && (userInfo.code === 2001 || userInfo.code === 2003) ) {
          // Toast.fail(userInfo.msg,2)
          yield put(routerRedux.push({
            pathname : '/login',
            state :  '/application'
          }))
        }
        const { data : company } = yield call(companyInfo);
        if(company && company.code === 200) {
          yield put({
            type : "quueryCompanyInfoSuccess",
            payload : company.data
          })
        }else if( company && company.code ===300) {
          throw new Error(company.msg)
        }
        yield call(updateAreaRatio,{ token : localStorage.getItem("token")})
      }catch(err) {
        if(err) throw new Error(err)
      }
      yield put({ type : 'hideLoading' })
    },
  },
  reducers : {
    querySuccess(state, { payload }) {
      return {
        ...state,
        userInfo : payload
      }
    },
    quueryCompanyInfoSuccess(state, { payload }){
      return {
        ...state,
        companyInfo : payload
      }
    },
    showLoading(state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading(state) {
      return {
        ...state,
        loading: false
      }
    },
    queryDowmUserSuccess(state, { payload }){
      return {
        ...state,
        team : payload
      }
    },
    openModal(state, { payload }){
      return {
        ...state,
        showModal : true,
        modalType : payload
      }
    },
    closeModal(state){
      return {
        ...state,
        showModal : false
      }
    }
  }
}