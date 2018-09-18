import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { connect } from 'dva';
import { 
  NavBar,
  Icon,
  List,
  Button,
  Modal,
  ActivityIndicator
} from 'antd-mobile';
import TransForm from './form';
import { routerRedux } from 'dva/router';
import styles from './index.less'
import  GraySpace  from '../../components/GraySpace';
function Integral({ dispatch, integral }){
  const {
    info : {
      fhIntegral=0,
      prIntegral=0
    },
    showModal,
    accountName,
    loading
  } = integral;
  const onCloseModal = () => dispatch({ type : 'integral/closeModal' })
  const onCheckAccountName = (phone) => dispatch({
    type : 'integral/checkAccountName',
    payload : phone
  })
  const onTransfer = (opt) => dispatch({
    type : 'integral/transferIntegral',
    payload : opt
  })
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
              分红积分
            </NavBar>
          )
        }
      </Sticky>
      <GraySpace size="xs"/>
      <List>
        <List.Item
          extra={fhIntegral}
        >
          分红积分
        </List.Item>
        <List.Item
          arrow="horizontal"
          extra={prIntegral}
          onClick={()=>dispatch(routerRedux.push({
            pathname : '/application/integral/invests'
          }))}
        >
          已投资分红积分
        </List.Item>
      </List>
      <GraySpace size="sm"/>
      <List>
        <List.Item
          arrow="horizontal"
          onClick={()=>dispatch(routerRedux.push({
            pathname : '/application/integral/inIntegral'
          }))}
        >
          转入积分
        </List.Item>
        <List.Item
          arrow="horizontal"
          onClick={()=>dispatch(routerRedux.push({
            pathname : '/application/integral/outIntegral'
          }))}
        >
          转出积分
        </List.Item>
      </List>
      <div className={ styles.bottomBtn }>
        <div className={ styles.btn }>
          <Button 
            type="warning"
            onClick={()=>dispatch({type:'integral/openModal'})}
          >积分转出</Button>
        </div>
      </div>
      <Modal 
        visible={showModal}
      >
        <TransForm 
          onCloseModal={onCloseModal}
          money = {fhIntegral}
          onCheckAccountName={onCheckAccountName}
          accountName={accountName}
          onTransfer={onTransfer}
        />
      </Modal>
      <ActivityIndicator animating={loading} text="加载中..." toast/>
    </StickyContainer>
  )
}

export default connect(({ integral }) => ({ integral }))(Integral)