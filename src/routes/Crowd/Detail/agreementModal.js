/**
 * Created by admin on 2018/9/18.
 *
 */

import React from 'react';
import {Modal} from 'antd-mobile';

// import styles from './banner.less';

export default ({showAgreement, agreed, hideAgreement, agreePortocol, agreementContent}) => {
  return <Modal
    visible={showAgreement&&!agreed}
    onClose={()=> hideAgreement()}
    transparent
    popup={true}
    maskClosable={false}
    closable={true}
    title="参与众筹协议"
    footer={[{ text: '关闭', onPress: () => { console.log('ok'); hideAgreement() } },{text: '同意', onPress:()=>{ console.log('tongyi'); agreePortocol();}}]}
  >


    <div
      style={{ height: 420, overflow: 'scroll' }}
      dangerouslySetInnerHTML={{__html : agreementContent }}
    ></div>
  </Modal>
}



