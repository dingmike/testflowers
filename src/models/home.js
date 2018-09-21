import {
  queryBanner,
  queryRollBanner,
  queryScenic,
  queryRefers,
  updateVersion
} from '../services/home';
import { Toast } from 'antd-mobile';

export default {
  namespace : 'home',
  state : {
    loading : false,
    banner : [],
    rollBanner : [],
    scenics : [],
    refers : [],
    showVersionModal: false,
    showCloseBtn: false,
    updateWord:'',
    updateUrl:''
  },
  subscriptions : {
    setup({ history, dispatch }){
      dispatch({ type : 'askUpdateVersion' })
      history.listen(({ pathname })=> {
        if(pathname === "/home") {
          dispatch({ type : 'query' })
        }
      })
    }
  },
  effects : {
    *askUpdateVersion(action,{call, put}){
      // 1:android  2: ios, 3:h5
      let updateData = {type: 2, version: '1.0.0'}
      const {data} = yield call(updateVersion, updateData);
      if (data.code == 3011) { // 强制更新app版本
        yield put({type : 'showUpdateVersionModal',payload: {updateWord:'去更新',updateUrl:data.url, showCloseBtn: false}})
      }else if(data.code== 3012){
        yield put({type : 'showUpdateVersionModal',payload:{updateWord:'是否去更新?',updateUrl:data.url, showCloseBtn: true}})
      }else if(data.code == 3013){
        yield put({type : 'showUpdateVersionModal',payload:{updateWord:data.msg, updateUrl:data.url, showCloseBtn: true}})
      }
    },
    *query(action, { call, put }){
      yield put({ type : 'showLoading' })
      try{

        // 获取轮播图begin******************************
        const { data : banners  } = yield call(queryBanner)
        if(banners && banners.code === 200) {
          yield put({ type : 'queryBannerSuccess', payload : banners.data })
        }else if( banners && banners.code === 300){
          Toast.fail(banners.msg ,2 )
        }
        // 获取轮播图END！******************************


        // 获取新闻资讯begin******************************
        const { data : rolls } = yield call(queryRollBanner,{ type : 1 })
        if(rolls && rolls.code === 200) {
          yield put({ type : "queryRollBannerSuccess", payload : rolls.data })
        }else if(rolls && rolls.code === 300 ) {
          Toast.fail(rolls.message,2)
        }
        // 获取新闻资讯end********************************

        // 获取景点展示begin
        const { data : scenic } = yield call(queryScenic)
        if( scenic && scenic.code === 200){
          yield put({ type : 'queryScenicSuccess', payload : scenic.data.contebt })
        }else if( scenic && scenic.code === 300) {
          Toast.fail(scenic.message,2)
        }
        // 获取景点展示end

        const { data: refers } = yield call(queryRefers)
        if( refers && refers.code === 200) {
          yield put({ type : 'queryRefersSuccess', payload: refers.data.contebt
        })
        }else if(refers && refers.code === 300 )  {
          Toast.fail(refers.message)
        }
      }catch(err) {
        if(err) throw new Error(err)
      }
      yield put({ type : 'hideLoading' })
    },
  },
  reducers : {
    queryBannerSuccess(state, { payload }){
      return {
        ...state,
        banner : payload
      }
    },
    queryRollBannerSuccess(state, { payload }) {
      return {
        ...state,
        rollBanner : payload
      }
    },
    queryScenicSuccess(state, {payload}) {
      return {
        ...state,
        scenics : payload
      }
    },
    queryRefersSuccess(state, { payload }){
      return {
        ...state,
        refers : payload
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
    updateVersion(state, {payload}) {
      return {
        ...state,
        version : payload
      }
    },
    showUpdateVersionModal(state, {payload}){
      return {
        ...state,
        showVersionModal : true,
        updateWord:payload.updateWord,
        updateUrl: payload.updateUrl,
        showCloseBtn: payload.showCloseBtn
      }
    },
    hideUpdateVersionModal(state){
      return {
        ...state,
        showVersionModal : false
      }
    }
  }
}
