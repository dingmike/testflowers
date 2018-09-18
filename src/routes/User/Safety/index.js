import React from 'react';
import { connect } from "dva";
import { routerRedux } from 'dva/router';
import { 
  List, 
  ActivityIndicator,
  NavBar,
  Icon,
  Modal, 
  Button,
  WingBlank
} from 'antd-mobile';
import { StickyContainer, Sticky } from "react-sticky";

import PwdForm from "./pwdForm";
import CardForm from "./bankCard";

const Item = List.Item;

function Safety({
  safety,
  dispatch
}) {
  const { 
    loading,
    showModal,
    modalType,
    disabled
  } = safety;
  const CardProps = {
    loading,
    onOk : (opt)=>dispatch({ type : 'safety/bindCard', payload : opt }),
    getAuthCode : (parmas) => dispatch({ type : 'safety/getAuthCode', payload : parmas }),
    clickModalBack : () => dispatch({
      type : 'safety/hideModal'
    }),
    disabled,
    onTimeOver : () => dispatch({type : 'safety/disabledUnLock'})
  }
  const PwdProps = {
    loading,
    onOk : (opt)=> {
      dispatch({
        type : 'safety/changePwd',
        payload : opt
      })
    },
    clickModalBack : () => dispatch({
      type : 'safety/hideModal'
    }),
    modalType
  }
  return (
    <StickyContainer>
      <Sticky>
        {
          ({
            style
          })=> (
            <NavBar
              style={{ 
                ...style, 
                zIndex: 5,
                boxShadow : "0 1px 10px #ABABAB" 
              }}
              mode="light"
              leftContent={<Icon type="left" style={{ color : '#333'}}/>}
              onLeftClick={()=>{
                dispatch(routerRedux.go(-1))
              }}
            >
              安全设置
            </NavBar>
          )
        }
      </Sticky>
      <List>
        <Item
          arrow="horizontal"
          onClick={()=>dispatch({ type: 'safety/showModal' , payload : 'pwd' })}
        >修改登录密码</Item>
        <Item
          arrow="horizontal"
          onClick={()=>dispatch({ type: 'safety/showModal' , payload : 'pany' })}
        >修改支付密码</Item>
        <Item
          arrow="horizontal"
          onClick={()=>dispatch({ type: 'safety/showModal' , payload : 'panyReset' })}
        >重置支付密码</Item>
        <Item
          arrow="horizontal"
          onClick={()=>dispatch({ type: 'safety/showModal' , payload : 'card' })}
        >绑定银行卡</Item>
      </List>
      <div style={{ marginTop : 40 }}>
        <WingBlank>
          <Button 
            type="warning"
            onClick={()=>{
              localStorage.removeItem('token')
              dispatch(routerRedux.push('/login'))
            }}
          >
            退出登录
          </Button>
        </WingBlank>
      </div>
      <ActivityIndicator animating={loading} toast text="加载中..."/>
      <Modal
        visible={showModal}
        animationType="slide"
      >
        {
          modalType === "card" ? <CardForm {...CardProps}/> :<PwdForm {...PwdProps}/>
        }
      </Modal>
    </StickyContainer>
  )
}

export default connect(({ safety })=>({ safety }))(Safety)