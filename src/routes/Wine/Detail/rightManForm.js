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

const Item = List.Item;
const RadioItem = Radio.RadioItem;
const prompt = Modal.prompt;
// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

function RightManForm({
                        phone
}){
  return (
    <List>
      <Item extra={''}>输入所有权人信息</Item>
      <InputItem
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

    {/*  <InputItem
        placeholder="start from left"
        clear
        moneyKeyboardAlign="left"
        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
      >所有权人地址</InputItem>*/}
      <TextareaItem
        title="地址"
        placeholder="所有权人收件地址"
        data-seed="logId"
        autoHeight
      />
      <GraySpace />
    </List>
  )
}

export default createForm()(RightManForm);
