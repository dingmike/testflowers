import { query, updateHeadImage, upLoadHeadImage, updateNickName } from "../../services/application";
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {
  namespace : 'userSettings',
  state : {
    loading : false,
    userInfo : {},
    avator : "",
    avatorFile : null,
    showCropper : false,
    showEditor : false,
  },
  subscriptions : {
    setup({ history, dispatch }){
      history.listen(({ pathname })=> {
        if(pathname === '/application/userSettings'){
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
        }else if(userInfo && (userInfo.code === 2001 || userInfo.code) ===2003) {
          Toast.fail(userInfo.msg, 2)
          yield put(routerRedux.push({
            pathname : '/login',
            state :  '/application'
          }))
        }
      }catch(err) {
        if(err) throw new Error(err)
      }
      yield put({ type : 'hideLoading' })
    },
    *updateHeadImage(action, { call, put, select }){
      yield put({ type: 'showLoading' })
      const img = yield select(({ userSettings })=>userSettings.avatorFile);
      const param = new FormData();
      param.append("file",img, "head.png")
      const { data : res } = yield call(upLoadHeadImage,param)
      if(res && res.code ===200) {
        const { data : up } = yield call(updateHeadImage,{
          token : localStorage.getItem('token'),
          imgUrl : res.data
        })
        if(up && up.code === 200) {
          yield put({ type : "query" })
        }
      }else if(res && (res.code === 2001 || res.code === 2003) ){
        yield put(routerRedux.push('/login'))
      }else if(res && res.code === 300){
        Toast.fail(res.msg, 2)
      }
      // 在这里处理上传图片后再次更新用户状态
      yield put({ type : 'hideLoading' })
      yield put({ type : 'hideCropper' })
    },
    *updateNickName( {payload}, { call ,put } ){
      yield put({ type : 'showLoading' })
      try{
        const { data : u } = yield call(updateNickName,{
          nickName : payload,
          token : localStorage.getItem("token")
        })
        if(u && u.code === 200){
          Toast.success(u.msg, 2)
          yield put({ type : "query" })
        }else if(u && u.code ===300){
          Toast.fail(u.msg, 2)
        }else if(u && (u.code ===2001 || u.code === 2003)){
          Toast.fail(u.msg, 2)
          yield put(routerRedux.push('/login'))
        }
        yield put({ type : "hideEditor" })
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : 'hideLoading'})
    }
  },
  reducers : {
    querySuccess(state, { payload }) {
      return {
        ...state,
        userInfo : payload
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
    showCropper(state,{ payload }) {
      return {
        ...state,
        showCropper : true,
        avator : payload
      }
    },
    hideCropper(state) {
      return {
        ...state,
        showCropper : false
      }
    },
    cropImage(state, { payload }) {
      return {
        ...state,
        avatorFile : payload
      }
    },
    showEditor(state) {
      return {
        ...state,
        showEditor : true
      }
    },
    hideEditor(state) {
      return {
        ...state,
        showEditor : false
      }
    }
  }
}