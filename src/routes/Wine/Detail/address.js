/**
 * Created by admin on 2018/10/23.
 */

import React from 'react';
import {List} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
// import styles from './banner.less';

export default ({addressId,
                  userName,
                  phone,
                  province,
                  city,
                  dist,
                  detailedAddress}) => {
  return (
    <div>
      <Brief>姓名: {userName}, 联系电话：{phone}</Brief>
      <Brief>证书寄送地址：{province},{city},{dist}{detailedAddress}</Brief>
    </div>

  )
}



