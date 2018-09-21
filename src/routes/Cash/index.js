import React from 'react';

import {
  StickyContainer,
  Sticky,
} from 'react-sticky';
import {
  NavBar,
  Icon,
  Button,
  List,
  Modal,
  ActivityIndicator
} from 'antd-mobile';
import GraySpace from '../../components/GraySpace';
import WTForm from './Form';
import FormTrans from './FormTransfer';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './index.less'
const Item = List.Item;
function Cash({ dispatch, cash }) {
  const {
    money,
    showModal,
    showTransferModal,
    modalType,
    actual,
    tax,
    formalities,
    loading,
    accountName
  } = cash;
  const onCloseModal = () => dispatch({ type : 'cash/hideModal' })
  const onRateCalculation = (money) => dispatch({ type : 'cash/rateCalculation', payload : money })
  const onCheckAccountName = (phone) => dispatch({
    type : 'cash/checkAccountName',
    payload : phone
  })
  const onTransfer = (opt) => dispatch({
    type : 'cash/transferCash',
    payload : opt
  })

  const onTransferToCounts = (opt) => dispatch({
    type : 'cash/transferToCounts',
    payload : opt
  })


  const onOk = (type,opt) => {
    if(type === "withdraw") {
      dispatch({ type : 'cash/applyWithdrawals', payload: opt })
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
              现金余额
            </NavBar>
          )
        }
      </Sticky>
      <GraySpace size="xs"/>
      <div className={ styles.head }>
        <p className={ styles.text }>可用现金余额（元）</p>
        <div className={ styles.money }>
          <p>{money}</p>
          {/*<Button
            size="small"
            inline
            style={{ background : '#1EB788', color : "#fff"}}
            onClick={()=>dispatch(routerRedux.push('/wine'))}
          >购买种酒</Button>*/}
          <Button  size="small"
                   inline
                   style={{ background : '#1EB788', color : "#fff"}}
                   onClick={()=>dispatch(routerRedux.push({pathname:'/application/cash/charge'}))}>
            充  值
          </Button>
          <Button
            size="small"
            inline
            style={{ background : '#cc6709', color : "#fff"}}
            onClick={()=>dispatch({type:'cash/showTransferModal',payload:"transferCounts"})}
          >转积分</Button>
        </div>
      </div>
      <GraySpace size="sm"/>
      <List>
        <Item
          arrow="horizontal"
          onClick={()=>dispatch(routerRedux.push({
            pathname : '/application/cash/recharges'
          }))}
        >
          现金充值明细
        </Item>
        <Item
          arrow="horizontal"
          onClick={()=>dispatch(routerRedux.push({
            pathname : '/application/cash/wines'
          }))}
        >
          购买种酒明细
        </Item>
        <Item
          arrow="horizontal"
          onClick={()=>dispatch(routerRedux.push({
            pathname : '/application/cash/inOut'
          }))}
        >
          转入/转出明细
        </Item>
        <Item
          arrow="horizontal"
          onClick={()=>dispatch(routerRedux.push({
            pathname : '/application/cash/withdrawals'
          }))}
        >
          提现明细
        </Item>
        <Item
          arrow="horizontal"
          onClick={()=>dispatch(routerRedux.push({
            pathname : '/application/cash/dividend'
          }))}
        >
          项目分红
        </Item>

      </List>
      <div className={ styles.bottomBtn }>
        <div className={ styles.btn }>
          <Button
            type="warning"
            style={{
              background : "#CF9357",
              color : "#fff"
            }}
            onClick={()=>dispatch({type:'cash/showModal',payload:"withdraw"})}
          >提现</Button></div>
        <div className={ styles.btn }>
          <Button
            type="warning"
            onClick={()=>dispatch({type:'cash/showModal',payload:"transfer"})}
          >转账</Button>
        </div>
      </div>
      <Modal
        visible={showModal}>
        <WTForm
          onCloseModal={onCloseModal}
          modalType ={ modalType }
          money = {money}
          actual ={actual}
          tax = {tax}
          formalities ={formalities}
          onRateCalculation={onRateCalculation}
          onCheckAccountName={onCheckAccountName}
          onOk={onOk}
          accountName={accountName}
          onTransfer={onTransfer}
        />
      </Modal>

      <Modal visible={showTransferModal}>
      <FormTrans
        onCloseModal={onCloseModal}
        modalType ={ modalType }
        money = {money}
        actual ={actual}
        tax = {tax}
        formalities ={formalities}
        onRateCalculation={onRateCalculation}
        onCheckAccountName={onCheckAccountName}
        onOk={onOk}
        accountName={accountName}
        onTransferToCounts={onTransferToCounts}
       />
      </Modal>

      <ActivityIndicator toast animating={loading} text="使劲处理中..."/>
    </StickyContainer>
  )
}

export default connect(({ cash })=> ({ cash }))(Cash)
