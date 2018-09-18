import React from 'react';
import styles from './CustomRadio.less';

export default ({ 
  checked=false, 
  children=null,
  onClick=()=>null 
}) => {
  return (
    <div 
      className={ styles.box }
      onClick={checked ? null : onClick} >
      <div className={ checked ? styles.checked : styles.not }>
      </div>
      <span className={ styles.text }>{ children }</span>
    </div>
  )
}