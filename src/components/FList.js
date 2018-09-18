import React from 'react';
import styles from './Flist.less';
const FList = ({ children, style })=> 
  <div className={styles.list} style={style}>{children}</div>

FList.Item = ({ children, style, onClick }) => 
  <div className={styles.item} style={ style } onClick={onClick}>
    {children}
  </div>

export default FList