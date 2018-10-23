import { queryClassify } from '../services/crowd';
import { queryByCategoryId, queryWineDetail, buyWine, queryAgreePortocol, aliPayBuy, wechatPayBuy, queryAgreeAddress } from '../services/wine';
import { Toast } from 'antd-mobile'
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { bridegWithPhone } from '../utils/origin';
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
    agreeContent:'',
    showApprove: false,
    choosed: 0, //默认选择支付宝
    agreementAddress:{
      addressId: '',
      userId: '',
      userName: "",
      phone: "",
      province: "",
      city: "",
      dist: "",
      detailedAddress: "",
      isDefault: ''
    }, //寄件地址
    payMethods:[
      { value: 0, label: '支付宝', extra: 'details' },
      { value: 1, label: '微信支付', extra: 'details' },
      { value: 2, label: '余额支付', extra: 'details' },
    ]
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
          });
          dispatch({
            type : 'queryAddress'
          })
        }
      })
    }
  },
  effects : {
    *wechatPayNow({payload}, {call, put}){
      yield put({ type : 'showLoading'})
      try {
        const {data : t } = yield call(wechatPayBuy, {
          ...payload, token : localStorage.getItem('token')
        })
        if(t && t.code === 200){
          yield put({ type : "hideLoading" })
          yield put({ type : 'hideModal' })
          Toast.success(t.msg, 2)
          let dataRess =  yield bridegWithPhone('loadThreePay',{
            'pay': 'WeChat',
            'data': t.data.sign
          }).then((ress) => {
            return ress;
          })
          if (dataRess.respCode == 0) {
            // 支付成功跳转余额页面
            // yield put(routerRedux.push('/application/cash'))
            yield put(routerRedux.push('/application/orders'))
          }else if(dataRess.respCode == -2) {
            Toast.success('取消支付', 2)
          }
        }else if(t && t.code === 2001){
          Toast.fail(t.msg,2)
          yield put(routerRedux.push('/login'))
        }else if(t && t.code > 200 && t.code !==2001) {
          Toast.fail(t.msg,2)
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *aliPayNow({payload}, {call, put}){
      yield put({ type : 'showLoading'})
      try {
        const {data : t } = yield call(aliPayBuy, {
          ...payload, token : localStorage.getItem('token')
        })
        if(t && t.code === 200){
          yield put({ type : "hideLoading" })
          yield put({ type : 'hideModal' })
          Toast.success(t.msg, 2)
          let dataRess =  yield bridegWithPhone('loadThreePay',{
            'pay': 'Alipay',
            'data': t.data.sign
          }).then((ress) => {
            return ress;
          })
          if (dataRess.respCode == 0) {
            // 支付成功跳转余额页面
            // yield put(routerRedux.push('/application/cash'))
            yield put(routerRedux.push('/application/orders'))
          }else if(dataRess.respCode == -2) {
            Toast.success('取消支付', 2)
          }
        }else if(t && t.code === 2001){
          Toast.fail(t.msg,2)
          yield put(routerRedux.push('/login'))
        }else if(t && t.code > 200 && t.code !==2001) {
          Toast.fail(t.msg,2)
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
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

    // 查询寄件地址
    *queryAddress({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      const { data : d } = yield call(queryAgreeAddress, { token : localStorage.getItem('token') });
      if(d && d.code === 200){
        console.log(d.data)
        if(d.data!==null){
          d.data.addressId=d.data.id;
          yield put({
            type : "queryAddressContent",
            payload : d.data
          })
        }else{
          yield put({
            type : "queryAddressContent",
            payload : {  addressId: '',
              userId: '',
              userName: "",
              phone: "",
              province: "",
              city: "",
              dist: "",
              detailedAddress: "",
              isDefault: ''}
          })
        }
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
          if(!r.data){
            yield put({type: 'showApproveModal'})
          }
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

    queryAddressContent(state, {payload}){
      return {
        ...state,
        agreementAddress: payload
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
    },

    hideApproveModal(state){
      return {
        ...state,
        showApprove : false,
      }
    },
    showApproveModal(state){
      return {
        ...state,
        showApprove : true,
      }
    },
    payMethodChange(state,{payload}){
      return {
        ...state,
        choosed: payload
      }
    }
  }
}
