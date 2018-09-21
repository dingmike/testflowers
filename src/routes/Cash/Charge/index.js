import React, { Component } from 'react';

import { connect } from 'dva';
import {
  PullToRefresh,
  ActivityIndicator,
  NavBar,
  Icon,
  List,
  InputItem,
  Button,
  WingBlank,
  Modal,
  Radio,
  WhiteSpace
} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { StickyContainer, Sticky } from 'react-sticky';

const RadioItem = Radio.RadioItem;
// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
class Charge extends Component{
  componentDidMount(){
    // const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.el).offsetTop;
    this.props.dispatch({
      type : 'cash/setHeight',
      payload : ''
    })
  }

  render(){
    const { cash , dispatch} = this.props;
    const { loading, height, inOut, chargeDisabled, payMethods, choosed, showPaymethod, hideChargeModal, disabledSurePayedBtn, chargeMoney, pagination:{
      isLast=false,
      page=1,
      pageSize=10
    }} = cash;
    function hideChargeModal() {
      dispatch({ type: 'cash/hideChargeModal' })
    }
    function nowPay() {
      if(choosed==0){
        dispatch({type: 'cash/aliPayNow', payload:{money: chargeMoney, type: 2}})
      }else {
        dispatch({type: 'cash/wechatPayNow', payload:{money: chargeMoney, type: 1}})
      }

    }
    return (
      <StickyContainer>
        <Sticky>
          {
            ({
              style
            })=> (
              <NavBar
                mode="light"
                style={{
                  ...style,
                  zIndex: 5,
                  boxShadow : "0 1px 1px #ABABAB"
                }}
                leftContent={<Icon type="left" style={{ color : '#333'}}/>}
                onLeftClick={()=>{
                  dispatch(routerRedux.go(-1))
                }}
              >
                充值余额
              </NavBar>
            )
          }
        </Sticky>
        <List>
          <WhiteSpace size="xl" />
          <InputItem
            type='money'
            placeholder="输入充值金额"
            moneyKeyboardAlign="left"
            clear
            onChange={(v) => {
              if(!v){
              return dispatch({type: 'cash/disabledChargeBtn'})
              }else{
                return dispatch({type: 'cash/undisabledChargeBtn', payload: v})
              }
            }}
            onFocus={(v)=>{
              return dispatch({type: 'cash/undisabledChargeBtn'})
            }}
            onBlur={(v) => {
              v=''
            }}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >充值金额</InputItem>
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <WingBlank size="md">
            <Button type="primary" onClick={()=>{dispatch({type:'cash/showChargeModal'})}} disabled={chargeDisabled}>确认充值</Button>
          </WingBlank>

          <WhiteSpace />

        </List>

        <Modal
          popup
          visible={showPaymethod}
          maskClosable={true}
          closable={true}
          onClose={()=>{dispatch({ type: 'cash/hideChargeModal' })}}
          animationType="slide-up">

          <List renderHeader={() => '选择支付方式'}>
            <WhiteSpace size="md" />
            {payMethods.map(i => (
              <RadioItem key={i.value} checked={choosed === i.value} onChange={() => {console.log(i.value);dispatch({type:'cash/payMethodChange',payload: i.value})}}>
                {i.label}
              </RadioItem>
            ))}
          </List>
          <WhiteSpace size="md" />
          <WingBlank size="md">
          <Button type="warning" disabled={disabledSurePayedBtn} onClick={()=>{nowPay()}}>确定支付</Button><WhiteSpace />
          </WingBlank>
        </Modal>
      </StickyContainer>
    )
  }
}
export default connect(({cash})=>({cash}))(Charge)
