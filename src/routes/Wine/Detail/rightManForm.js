import React from 'react';

import {
  Stepper,
  List,
  Button,
  InputItem,
  TextareaItem,
  Modal,
  Radio,
  Toast
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { MD5 } from "crypto-js"
import GraySpace from '../../../components/GraySpace'
import Address from './address';

const Item = List.Item;
const RadioItem = Radio.RadioItem;
const prompt = Modal.prompt;
const Brief = Item.Brief;
// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

function AddressComploent() {

  // return(
  // <Brief>姓名: {userName}{addressId}, 联系电话：{phone}</Brief>
  // <Brief>证书寄送地址：{province},{city},{dist}{detailedAddress}</Brief>
// )

}


function RightManForm({
                        addressId,userName,phone,province,city,dist,detailedAddress,onDirect
}){

  const addressForms = {
    addressId,
    userName,
    phone,
    province,
    city,
    dist,
    detailedAddress
  }
  return (
    <List>
      <Item extra={''}>所有权证书关联信息</Item>
   {/*   <InputItem
        defaultValue={""}
        placeholder="所有权人姓名"
        clear
        moneyKeyboardAlign="left"
        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
      >姓名</InputItem>

      <InputItem
        type={phone}
        placeholder="所有权人电话"
        clear
        moneyKeyboardAlign="left"
        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
      >电话号码</InputItem>

      <TextareaItem
        title="证书寄送地址"
        placeholder="证书寄送地址"
        data-seed="logId"
        autoHeight
      />*/}

      <Item
        arrow="horizontal"
        multipleLine
        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
        onClick={() => {onDirect()}}
        platform="android"
      >
        {addressId===''?'还没有寄件地址去添加':<Address {...addressForms} />}

      </Item>

      <GraySpace />
    </List>
  )
}

export default createForm()(RightManForm);
