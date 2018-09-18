import React from 'react';
import { 
  ActivityIndicator, 
  NavBar, 
  Icon,
  Button,
  Modal,
} from 'antd-mobile';
import Card from './card';

import { connect } from 'dva';
import { StickyContainer, Sticky } from 'react-sticky'
import styles from './index.less';
import { routerRedux } from 'dva/router';
import AddressForm from './form'; 


function Address({ address, dispatch }) {
  const { loading, addresses, modalType, showModal, currentAddress } = address;
  const onDelete = (id) => {
    dispatch({
      type : "address/deleteAddress",
      payload : id
    })
  }
  const onDefault = (id) => {
    dispatch({
      type : 'address/setDefaultAddress',
      payload : id
    })
  }
  const openModal = ( modalType, currentAddress ) => {
    dispatch({
      type : 'address/showModal',
      payload : {
        modalType : modalType,
        currentAddress : currentAddress
      }
    })
  }
  const onOk = ( modalType, opt ) => {
    if(modalType === "add"){
      dispatch({ type : 'address/add', payload: opt })
    }
    if(modalType==="editor"){
      dispatch({ type : "address/editor", payload : opt })
    }
  }
  const closeModal = () => {
    dispatch({
      type : 'address/hideModal'
    })
  }
  return (
    <StickyContainer>
      <Sticky>
        {
          ({
            style
          })=> (
            <NavBar
              style={{ ...style, zIndex: 5 }}
              mode="light"
              leftContent={<Icon type="left" style={{ color : '#333'}}/>}
              onLeftClick={()=>{
                dispatch(routerRedux.go(-1))
              }}
            >
              我的收货地址
            </NavBar>
          )
        }
      </Sticky>
      {
        addresses.length > 0 ? <div className={ styles.cardBox }>
        { addresses.map((add, index)=>(
          <Card 
            {...add} 
            key={`${add.id}-${index}`} 
            onDelete={onDelete}
            onDefault={onDefault}
            onEditor = {openModal}
            closeModal={closeModal}
          />
        ))}
      </div> : <p className={ styles.empty }>快来添加你的收货地址吧~~</p>
      }
      <Modal 
        visible={showModal}
        onClose={closeModal}
      >
        <AddressForm 
          modalType ={modalType}
          onLeftClick={closeModal}
          onOk={onOk}
          {...currentAddress}
        />
      </Modal>
      <ActivityIndicator animating={loading} toast text="加载中..."/>
      <Button 
        type="warning"
        style={{
          position : "fixed",
          bottom : 0,
          left : 0,
          width : "100%"
        }}
        onClick={()=>openModal('add')}
      >
        <span>+ </span> 添加地址
      </Button>
    </StickyContainer>
  )
}

export default connect(({ address }) => ({ address }))(Address)


