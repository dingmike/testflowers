import React, { Fragment } from 'react';
import GraySpace from '../../../components/GraySpace'
import {
  Icon,
  ActivityIndicator,
  Button,
  Modal,
} from 'antd-mobile';
import { connect } from 'dva';
import Banner from './banner';
import AgreementModal from './agreementModal';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import BuyForm from './buyForm';

function WineDetail({ dispatch, wine }) {
  const { loading, detail, showModal, showAgreeModal  } = wine;
  const {
    imgDescArr=[],
    money=0,
    name="",
    standard=0,
    largessIntegral=0,
    context="",
    id,
    imgDesc
  } = detail
  const buyFormProps = {
    money,
    id,
    onOk: (opt)=> dispatch({ type : "wine/buyWine", payload : opt })
  }
  return (
    <Fragment>
      <div className={styles.banner}>
        <div
          className={styles.back}
          onClick={()=>dispatch(routerRedux.go(-1))}
        ><Icon type="left" size="lg" style={{color : '#fff'}}/></div>
        <Banner dataSource={imgDescArr} play={loading}/>
      </div>
      <GraySpace size="xs"/>
      <div className={ styles.intro }>
        <h4 className={ styles.title }>￥{money}</h4>
        <h3>{name}</h3>
      </div>
      <GraySpace size="xs"/>
      <div className={ styles.list }>
        <span>酒量规格</span>
        <span>{standard}kg</span>
      </div>
      <div className={ styles.list }>
        <span>赠送分红积分</span>
        <span>{largessIntegral}</span>
      </div>
      <GraySpace size="xs"/>
      <div className={ styles.infoMessage }>
        <h3>种酒须知</h3>
        <p style={{
          whiteSpace: "normal",
          wordWrap : "break-word"
        }}>{context}</p>
      </div>
      <div className={ styles.infoMessage }>
        <h3>种酒介绍</h3>
        <div
          className={ styles.html }
          dangerouslySetInnerHTML={{__html : imgDesc }}
        ></div>
      </div>
      <div className={ styles.btn }>
        <Button
          type="warning"
          onClick={()=>dispatch({type:'wine/showModal'})}
        >购买</Button>
      </div>
      <Modal
        visible={showModal}
        popup
        animationType="slide-up"
        onClose={()=>dispatch({ type: 'wine/hideModal' })}
      >
        <BuyForm {...buyFormProps}/>
      </Modal>
      <ActivityIndicator animating={loading} text="加载中..." toast/>


      <AgreementModal showAgreement={showAgreeModal}/>

    </Fragment>
  )
}

export default connect(({ wine })=>({ wine }))(WineDetail)
