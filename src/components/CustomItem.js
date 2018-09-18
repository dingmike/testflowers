import React from 'react';
import { Badge } from 'antd-mobile'
import styles from './CustomItem.less';

export default ({
  onClick=()=>null,
  icon = '',
  text = "",
  badge=null
}) => 
  <div
    onClick={onClick}
    className={ styles.wrapper }
  >
    <div className={ styles.box }>
      <Badge text={badge} >
        <span 
          style={{
            backgroundImage : `url('${icon}')`,
            display : "inline-block"
          }}
          className={ styles.icon }
        ></span>
      </Badge>
      <span style={{ letterSpacing : 1 }}>{text}</span>
    </div>
  </div>