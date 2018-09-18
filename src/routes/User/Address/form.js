import React, { Fragment } from 'react';
import { 
  List,
  InputItem,
  Toast,
  Button,
  WhiteSpace,
  Picker,
  TextareaItem,
  NavBar,
  Icon,
  WingBlank,
  Switch,
} from 'antd-mobile';

import { addresses } from '../../../utils';
import { createForm } from 'rc-form';
import styles from './form.less';

const Item = List.Item;

export default createForm()(({
  form : {
    getFieldProps,
    getFieldError,
    validateFields
  },
  loading,
  onOk,
  onLeftClick,
  userName="",
  phone ="",
  city="",
  province="",
  dist="",
  id,
  detailedAddress="",
  isDefault=false,
  modalType
})=>{
  return (
    <Fragment>
      <NavBar
        mode="light"
        leftContent={<Icon type="left" style={{ color : '#333'}}/>}
        onLeftClick={()=>{onLeftClick()}}
      >
        { modalType==="add" ? "新增收货地址" : "编辑收货地址" }
      </NavBar>
      <List>
        <WhiteSpace />
        <InputItem
          {
            ...getFieldProps("userName",{
              rules : [
                {
                  required: true,
                  message : "请填写收货人姓名"
                }
              ],
              initialValue : userName
            })
          }
          placeholder="收货人姓名"
          autoComplete="off"
          labelNumber={5}
          error={!!getFieldError('userName')}
          onErrorClick={() => {
            Toast.info(getFieldError('userName').join('、'),3);
          }}
        >
          真实姓名
        </InputItem>
        <WhiteSpace />
        <InputItem
          { ...getFieldProps('phone',{
            rules : [
              {
                required : true,
                message  : '手机号码不能为空'
              }, {
                pattern : /^1[345678]\d{9}$/,
                message : '手机号码格式不正确'
              }
            ],
            initialValue : phone
          })}
          labelNumber={5}
          placeholder="收货人联系电话"
          autoComplete="off"
          error={!!getFieldError('phone')}
          onErrorClick={() => {
            Toast.info(getFieldError('phone').join('、'),3);
          }}
        >
          手机号码
        </InputItem>
        <WhiteSpace />
        <Picker 
          data={addresses}
          title="请选择"
          {
            ...getFieldProps('address',{
              initialValue: province&&city&&dist ? [province, city,dist] : null
            })
          }
          extra="请选择区域"
          format={(lables)=>lables.join(' ')}
        >
          <Item
            arrow="horizontal"
          >省市地区</Item>
        </Picker>
        <WhiteSpace />
          <p className={ styles.textAreaTitle }>详细地址</p>
          <TextareaItem
            { ...getFieldProps('detailedAddress',{
              rules : [
                  {
                    required : true,
                    message : '详细地址不能为空'
                  }
                ],
                initialValue : detailedAddress
            })}
            labelNumber={5}
            autoComplete="off"
            error={!!getFieldError('detailedAddress')}
            onErrorClick={() => {
              Toast.info(getFieldError('detailedAddress').join('、'),3);
            }}
            name="详细地址"
            rows={3}
            placeholder="详细收货地址"
          >
            
          </TextareaItem>
          <Item 
            extra={
              <Switch 
                {
                  ...getFieldProps('isDefault',{
                    initialValue: isDefault,
                    valuePropName : 'checked'
                  })
                }
                color = "#9D0F14"
              />
            }
            >
            设为默认
          </Item>
      </List>
      <WingBlank>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <Button 
          type="warning" 
          loading={loading} 
          onClick={()=> {
            validateFields((errors, values)=>{
              if(errors){
                for(let name in errors ) {
                  let error = getFieldError(name) ? getFieldError(name).join(',') : null;
                  Toast.fail(error,2)
                  break;
                }
              }else {
                let [ province, city, dist ]  = values['address'];
                onOk(modalType,{
                  ...values,
                  province : province,
                  city : city,
                  dist : dist,
                  id   : id,
                  isDefault : values.isDefault? 1 : 2
                })
              }
            })
          }}
        >确定提交</Button>
      </WingBlank>
    </Fragment>
)})