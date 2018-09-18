import React from 'react';
import styles from './CustomIcon.less';
export default ({ 
  url, 
  size=28, 
  text,
  onClick=()=>null,
  reverse,
  textStyle
}) => 
  <div className={ styles.wrapper } style={{
    flexDirection : reverse ? 'row-reverse' : "initial"
  }} onClick={onClick}>
    <span 
      style={{
        width : size,
        height : size,
        display: "inline-block",
        backgroundImage: `url('${url}')`
      }}
      className={ styles.icon }
    >
    </span>
    { !!text ? <span style={{ margin: '0 10px', ...textStyle  }}>{text}</span> : null }
  </div>