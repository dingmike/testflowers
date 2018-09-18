import React from 'react';
import { 
  ActivityIndicator, 
  NavBar, 
  Icon,
  List,
  Modal,
  Button,
} from 'antd-mobile';
import CustomCropper from '../../components/CustomCropper';
import NickNameEditor from './nickNameEditor';

import GraySpace from '../../components/GraySpace';
import { connect } from 'dva';
import { StickyContainer, Sticky } from 'react-sticky'
import styles from './Settings.less';
import { routerRedux } from 'dva/router';
import DefaultImg from '../../assets/man.png';
// const qrcode = require('qrcodejs')
import QRCODE from 'qrcode.react';

function Setting({ userSettings, dispatch }) {
  const { 
    loading,
    userInfo,
    avator,
    showCropper,
    showEditor 
  } = userSettings;
  const { 
    headImg,
    nickName,
    name,
    phone,
    recommendName
  } = userInfo;
  const onEditorClose = () => dispatch({type : "userSettings/hideEditor"});
  const onEditorOpen = () => dispatch({
    type :'userSettings/showEditor'
  })
  const onEditorOk = (name) => dispatch({
    type : 'userSettings/updateNickName',
    payload : name
  })
  const gotoAddressSeting = () => dispatch(routerRedux.push('/application/address'))
  const gotoCertification = () => dispatch(routerRedux.push('/application/certification'))
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
                boxShadow : "0 1px 1px #ABABAB"
              }}
              mode="light"
              leftContent={<Icon type="left" style={{ color : '#333'}}/>}
              onLeftClick={()=>{
                dispatch(routerRedux.go(-1))
              }}
            >
              个人设置
            </NavBar>
          )
        }
      </Sticky>
      <Modal
        visible={showCropper}
        onClose={()=>dispatch({ type : 'userSettings/hideCropper' })}
        className = { styles.modal }
      >
        <CustomCropper 
          src={avator} 
          style={{height: document.body.offsetHeight - 46, width: '100%'}}
          ready={(e)=> {
            e.target.cropper.getCroppedCanvas().toBlob((blob)=>{
              dispatch({
                type : 'userSettings/cropImage',
                payload : blob
              })
            });
          }}
          cropend={(e)=>{
            e.target.cropper.getCroppedCanvas().toBlob((blob)=>{
              dispatch({
                type : 'userSettings/cropImage',
                payload : blob
              })
            });
          }}
        />
        <Button 
          type="warning"
          onClick={()=>{
            dispatch({
              type : 'userSettings/updateHeadImage'
            })
          }}
        >确定</Button>
      </Modal>
      <Modal
        visible={showEditor}
        onClose={onEditorClose}
        popup={false}
        transparent
        title="昵称修改"
      >
        <NickNameEditor 
          nickName={nickName} 
          onClose={onEditorClose}
          onOk = {onEditorOk}
        />
      </Modal>
      <List>
        <div className={styles.name}>
          <span>头像</span>
          <div className={ styles.extra }>
            <img src={!!headImg ? headImg : DefaultImg} alt=""/>
            <Icon type="right"/>
            <input 
              type="file" 
              accept="image/*"
              onChange={e=>{
                const fromRender = new FileReader()
                const obj = e.target.files[0];
                if(obj){
                  fromRender.readAsDataURL(obj)
                  fromRender.onloadstart = () => {
                    dispatch({ type : 'userSettings/showLoading' })
                  }
                  fromRender.onloadend = () => {
                    dispatch({ type : "userSettings/hideLoading" })
                  }
                  fromRender.onload = (e) => {
                    const B64 = e.target.result;
                    dispatch({ type : 'userSettings/showCropper', payload : B64 })
                  }
                }
              }}/>
          </div>
        </div>
        <div 
          className={styles.name}
          onClick={onEditorOpen}
        >
          <span>昵称</span>
          <div className={ styles.extra }>
            <span>{nickName}</span>
            <Icon type="right"/>
          </div>
        </div>
        <div 
          className={styles.name}
          onClick={name ? ()=>null : gotoCertification}
        >
          <span>实名认证</span>
          <div className={ styles.extra }>
            <span>{name ? name : "未认证"}</span>
            <Icon type="right"/>
          </div>
        </div>
        <div className={styles.name}>
          <span>绑定手机号</span>
          <div className={ styles.extra }>
            <span>{phone}</span>
          </div>
        </div>
        <div 
          className={styles.name}
          onClick={gotoAddressSeting}
        >
          <span>我的收货地址</span>
          <div className={ styles.extra }>
            <Icon type="right"/>
          </div>
        </div>
        <GraySpace size="sm"/>
        <div className={styles.name}>
          <span>推荐人</span>
          <div className={ styles.extra }>
            <span>{recommendName}</span>
          </div>
        </div>
        <div 
          className={styles.name}
          onClick={()=>{
            Modal.alert(
              <QRCODE  
                value={`http://118.31.40.33/#/signIn?referrer=${phone}`}
                renderAs="canvas"
                size={200}
              />
            )
          }}
        >
          <span>推荐二维码</span>
          <div className={ styles.extra }>
            <span>查看</span>
            <Icon type="right"/>
          </div>
        </div>
      </List>
      <ActivityIndicator animating={loading} toast text="加载中..."/>
    </StickyContainer>
  )
}

export default connect(({ userSettings }) => ({ userSettings }))(Setting)


