import { parse } from 'qs';
import {
  queryWines,
  queryRechargesAndDividend,
  queryInOutRecord,
  queryWithdrawals,
  rateCalculation,
  applyWithdrawals,
  queryAccountName,
  transferCash,
  transferToCounts,
  queryRecharges,
  wechatPay,
  aliPay
} from '../services/application';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { bridegWithPhone, setupWebViewJavascriptBridge } from '../utils/origin';
export default {
  namespace : 'cash',
  state : {
    money : 0,
    payDetail : [],
    wines : [],
    recharges : [],
    withdrawals : [],
    inOut : [],
    dividend : [],
    bonus : [],
    loading : false,
    pagination : {},
    height : 0,
    showModal: false,
    showTransferModal: false,
    modalType : "",
    actual: "0.00",//实际到账金额
    tax : "0.00", //税
    formalities : "0.00",//手续费,
    accountName : "",
    chargeDisabled: true,
    choosed: 0, //默认选择支付宝
    showPaymethod:false,
    disabledSurePayedBtn:false,
    chargeMoney:0,
    payMethods:[
      { value: 0, label: '支付宝', extra: 'details' },
      { value: 1, label: '微信支付', extra: 'details' },
    ]
  },
  subscriptions : {
    setup({ dispatch, history }){
      history.listen(({ pathname, search })=> {
        if(pathname === '/application/cash'){
          const opt = parse(search.substr(1))
          dispatch({type : "setupSuccess", payload : opt})
        }
        if(pathname === "/application/cash/wines"){
          dispatch({type : 'queryWinesDetails'})
        }
        if(pathname === '/application/cash/recharges'){
          dispatch({ type :"queryRecharges" })
        }
        if(pathname==="/application/cash/dividend"){
          dispatch({ type : "queryDividend"})
        }
        if(pathname==="/application/cash/inOut"){
          dispatch({ type : "queryInOut"})
        }
        if(pathname==="/application/cash/withdrawals"){
          dispatch({ type : 'queryWithdrawals' })
        }
      })
    }
  },
  effects : {
    *queryWinesDetails({ payload }, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data: p } = yield call(queryWines, { token : localStorage.getItem('token') })
        if(p && p.code === 200) {
          yield put({ type : "queryWinesDetailsSuccess", payload : p.data });
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *queryRecharges({ payload }, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : r } = yield call(queryRecharges,{
          token : localStorage.getItem('token'),
          status : 1,
          page : 1,
          size : 10
        });
        if(r && r.code === 200){
          yield put({ type : "queryRechargesSuccess", payload : r.data })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *queryMoreRecharges({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data: r } = yield call(queryRecharges,{
          token : localStorage.getItem('token'),
          status : 1,
          page : payload.nextPage,
          size : payload.pageSize
        })
        if(r && r.code === 200){
          yield put({ type : "queryMoreRechargesSuccess", payload : r.data })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error);
      }
      yield put({ type : 'hideLoading' })
    },
    *queryDividend({ payload }, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : r } = yield call(queryRechargesAndDividend,{
          token : localStorage.getItem('token'),
          pageNo : 1,
          pagesize : 10
        });
        if(r && r.code === 200){
          yield put({ type : "queryDividendSuccess", payload : r.data })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *queryMoreDividend({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data: r } = yield call(queryRechargesAndDividend,{
          token : localStorage.getItem('token'),
          pageNo : payload.nextPage,
          pagesize : payload.pageSize
        })
        if(r && r.code === 200){
          yield put({ type : "queryMoreDividendSuccess", payload : r.data })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error);
      }
      yield put({ type : 'hideLoading' })
    },
    *queryInOut({ payload }, { call, put }){
      yield put({ type : "showLoading" })
      try{
        const { data : r } = yield call(queryInOutRecord,{
          token : localStorage.getItem('token'),
          inOut : 3,
          page : 1,
          size : 10
        });
        if(r && r.code === 200){
          yield put({ type : "queryInOutSuccess", payload : r.data })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *queryMoreInOut({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data: r } = yield call(queryInOutRecord,{
          token : localStorage.getItem('token'),
          inOut : 3,
          page : payload.nextPage,
          size : payload.pageSize
        })
        if(r && r.code === 200){
          yield put({ type : "queryMoreInOutSuccess", payload : r.data })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error);
      }
      yield put({ type : 'hideLoading' })
    },
    *queryWithdrawals({ payload }, { call, put }) {
      yield put({ type : "showLoading" })
      try{
        const { data : r } = yield call(queryWithdrawals,{
          token : localStorage.getItem('token'),
          page : 1,
          size : 10,
          status : 4
        });
        if(r && r.code === 200){
          yield put({ type : "queryWithdrawalsSuccess", payload : r.data })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *queryMoreWithdrawals({ payload }, { call, put }) {
      yield put({ type : "showLoading" })
      try{
        const { data : r } = yield call(queryWithdrawals,{
          token : localStorage.getItem('token'),
          page : payload.nextPage,
          size : payload.pageSize,
          status : 4
        });
        if(r && r.code === 200){
          yield put({ type : "queryMoreWithdrawalsSuccess", payload : r.data })
        }else if( r && r.code === 300){
          Toast.fail(r.msg ,2 )
        }else if( r && r.code ===2001){
          Toast.fail(r.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *rateCalculation({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : rc } = yield call(rateCalculation,{
          money : payload
        });
        if(rc && rc.code === 200){
          yield put({ type : "rateCalculationSuccess", payload : rc.data })
        }else if( rc && rc.code === 300){
          Toast.fail(rc.msg ,2 )
        }else if( rc && rc.code ===2001){
          Toast.fail(rc.msg, 2)
          yield put(routerRedux.push('/login'))
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *applyWithdrawals({ payload }, { call, put }) {
      yield put({ type : 'showLoading' })
      try{
        const { data : rc } = yield call(applyWithdrawals,{
          ...payload, token : localStorage.getItem('token')
        });
        if(rc && rc.code === 200){
          yield put({ type : 'hideModal' })
          Toast.success(rc.msg, 2)
          yield put(routerRedux.push('/application'))
        }else if(rc && rc.code === 2001){
          Toast.fail(rc.msg,2)
          yield put(routerRedux.push('/login'))
        }else if(rc && rc.code > 200 && rc.code !==2001) {
          Toast.fail(rc.msg,2)
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *checkAccountName({ payload }, { call, put }){
      yield put({ type : 'showLoading'})
      try {
        const {data : n } = yield call(queryAccountName,{phone : payload}
        )
        if(n && n.code === 200){
          yield put({
            type : 'checkAccountNameSuccess',
            payload : n.data
          })
        }else if(n && n.code ===300){
          yield put({
            type : 'checkAccountNameSuccess',
            payload : ""
          })
          Toast.fail(n.msg, 2)
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })

    },
    *transferToCounts({ payload }, { call, put }){
      yield put({ type : 'showLoading' })
      try{
        const { data : rc } = yield call(transferToCounts,{
          ...payload, token : localStorage.getItem('token')
        });
        if(rc && rc.code === 200){
          yield put({ type : 'hideModal' })
          Toast.success(rc.msg, 2)
          yield put(routerRedux.push('/application'))
        }else if(rc && rc.code === 2001){
          Toast.fail(rc.msg,2)
          yield put(routerRedux.push('/login'))
        }else if(rc && rc.code > 200 && rc.code !==2001) {
          Toast.fail(rc.msg,2)
        }
      }catch(error){
        if(error) throw new Error(error)
      }
      yield put({ type : "hideLoading" })
    },
    *transferCash({ payload }, { call, put }){
      yield put({ type : 'showLoading'})
      try {
        const {data : t } = yield call(transferCash,{
          ...payload, token : localStorage.getItem('token')
        })
        if(t && t.code === 200){
          yield put({ type : 'hideModal' })
          Toast.success(t.msg, 2)
          yield put(routerRedux.push('/application'))
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
    *wechatPayNow({payload}, {call, put}){
      yield put({ type : 'showLoading'})
      try {
        const {data : t } = yield call(wechatPay, {
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
           yield put(routerRedux.push('/application'))
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
        const {data : t } = yield call(aliPay, {
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
            yield put(routerRedux.push('/application'))
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
    }
  },
  reducers : {
    checkAccountNameSuccess(state, { payload }){
      return {
        ...state,
        accountName : payload
      }
    },
    setupSuccess(state,{ payload }){
      return {
        ...state,
        money : payload.money
      }
    },
    rateCalculationSuccess(state,{ payload }){
      return {
        ...state,
        actual: payload.actual,//实际到账金额
        tax : payload.tax, //税
        formalities : payload.formalities//手续费
      }
    },
    queryWinesDetailsSuccess(state,{ payload }){
      return {
        ...state,
        wines : payload
      }
    },
    queryRechargesSuccess(state,{ payload }){
      return {
        ...state,
        recharges : payload.content,
        pagination : {
          isLast : payload.last,
          page : payload.numberOfElements,
          pageSize : payload.size,
          total : payload.totalPages
        }
      }
    },
    queryMoreRechargesSuccess(state, { payload }){
      return {
        ...state,
        recharges : state.recharges.concat(payload.content),
        pagination : {
          isLast : payload.last,
          page : payload.numberOfElements,
          pageSize : payload.size,
          total : payload.totalPages
        }
      }
    },
    queryInOutSuccess(state,{ payload }){
      return {
        ...state,
        inOut : payload.content,
        pagination : {
          isLast : payload.last,
          page : payload.numberOfElements,
          pageSize : payload.size,
          total : payload.totalPages
        }
      }
    },
    queryMoreInOutSuccess(state, { payload }){
      return {
        ...state,
        inOut : state.inOut.concat(payload.content),
        pagination : {
          isLast : payload.last,
          page : payload.numberOfElements,
          pageSize : payload.size,
          total : payload.totalPages
        }
      }
    },
    queryDividendSuccess(state,{ payload }){
      return {
        ...state,
        dividend : payload.content,
        pagination : {
          isLast : payload.last,
          page : payload.numberOfElements,
          pageSize : payload.size,
          total : payload.totalPages
        }
      }
    },
    queryMoreDividendSuccess(state, { payload }){
      return {
        ...state,
        dividend : state.dividend.concat(payload.content),
        pagination : {
          isLast : payload.last,
          page : payload.numberOfElements,
          pageSize : payload.size,
          total : payload.totalPages
        }
      }
    },
    queryWithdrawalsSuccess(state, { payload }){
      return {
        ...state,
        withdrawals : payload.content,
        pagination : {
          page : payload.page.pogeNo,
          pageSize : payload.page.pageSize,
          total : payload.page.PageCount
        }
      }
    },
    queryMoreWithdrawalsSuccess(state, { payload }){
      return {
        ...state,
        withdrawals : state.withdrawals.concat(payload.content),
        pagination : {
          page : payload.page.pogeNo,
          pageSize : payload.page.pageSize,
          total : payload.page.PageCount
        }
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
    setHeight(state, { payload }) {
      return {
        ...state,
        height : payload
      }
    },
    showModal(state,{ payload }){
      return {
        ...state,
        showModal : true,
        modalType : payload
      }
    },
    showTransferModal(state,{payload}){
      return {
        ...state,
        showTransferModal : true,
        modalType : payload
      }
    },
    hideModal(state){
      return {
        ...state,
        showModal : false,
        showTransferModal : false,
      }
    },
    disabledChargeBtn(state){
      return {
        ...state,
        chargeDisabled : true
      }
    },
    undisabledChargeBtn(state, {payload}){
      return {
        ...state,
        chargeDisabled : false,
        chargeMoney: payload
      }
    },
    showChargeModal(state){
      return {
        ...state,
        showPaymethod : true
      }
    },
    hideChargeModal(state){
      return {
        ...state,
        showPaymethod : false
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
