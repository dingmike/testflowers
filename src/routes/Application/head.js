import React from 'react';
// import PropTypes from 'prop-types'
import DefaultImg from '../../assets/man.png'
import styles from './head.less';
export default function Head({
  nickName="",
  headImg=null,
  rankName='',
  statusName,
  status
}){
  return (
    <div className={ styles.wrapper }>
      <div className={styles.avatar}>
        <img src={!!headImg ? headImg : DefaultImg} alt="头像"/>
        <div className={ styles.info }>
          <p>{nickName}</p>
          <p>{rankName}{status === 0 ? `(${statusName})` : null }</p>
        </div>
      </div>
    </div>
  )
}