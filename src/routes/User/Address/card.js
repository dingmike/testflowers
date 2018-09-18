import React from 'react';
import styles from './card.less';
import { 
  Modal
} from 'antd-mobile';
import CustomRadio from '../../../components/CustomRadio';

// const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
export default ({
  id,
  userName,
  phone,
  city,
  province,
  dist,
  detailedAddress,
  isDefault,
  onDelete,
  onDefault,
  onEditor
}) => (
  <div className={ styles.wrapper }>
    <div className={ styles.user }>
      <p>{userName}</p>
      <span>{phone}</span>
    </div>
    <p>{province} {city} {dist} {detailedAddress}</p>
    <div className={ styles.handle}>
      <CustomRadio
        checked={isDefault===1}
        onClick={()=>onDefault(id)}
      >
        设为默认
      </CustomRadio>
      <div>
        <div></div>
      </div>
      <div className={ styles.operation }>
        <span 
          className={ styles.remove }
          onClick= {
            ()=>Modal.alert('确定要删除该收货人？','该操作无法恢复',[
              {
                text : "确定",
                onPress : () => onDelete(id),
                style : {
                  background : "#fff"
                }
              },{
                text : '取消',
                onPress : () => null,
                style : {
                  background : '#fff',
                  color : '#9D0F14'
                }
              }
            ])
          }
        >删除</span>
        <span onClick={()=>onEditor("editor",{id, userName,phone,province,city,dist,detailedAddress,isDefault})}>编辑</span>
      </div>
    </div>
  </div>
)