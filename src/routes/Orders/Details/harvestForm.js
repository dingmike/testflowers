import React from "react";
import { 
  List,
  InputItem,
  Icon,
  DatePicker,
  Picker,
  Button,
  Toast,
  Popover,
  WingBlank,
  WhiteSpace
} from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import { MD5 } from 'crypto-js';
import GraySpace from '../../../components/GraySpace';
import styles from './harvestForm.less';
const ListItem = List.Item;
const harvestType = [
  {
    value : 1,
    label : "自提"
  },{
    value : 2,
    label : '邮寄'
  }
]
export default createForm()(({
  form : {
    getFieldProps,
    getFieldValue,
    setFieldsValue,
    validateFields,
    getFieldError
  },
  detail : {
    name="酒品名称",
    number=0,
    orderId
  },
  closeModal,
  address = [],
  showAd,
  hideAd,
  showAddress,
  popShow,
  showPop,
  hidePop,
  onOpen
})=> {
  const overlays = address.map(
    (ad,index)=> 
      <div 
        className={styles.overlay }
        style={{
          width : document.body.clientWidth - 50
        }}
        onClick={()=>{
          setFieldsValue({
            address : `${ad.province}${ad.city}${ad.dist}${ad.detailedAddress}`
          })
          hidePop()
        }}
      >
        <p style={{
          width: document.body.clientWidth - 50,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow:"ellipsis",
          margin : 5
        }}> <Icon type="check"/> {ad.province} {ad.city} {ad.dist} {ad.detailedAddress}</p>
      </div>
  )
  return (
    <div>
      <div className={ styles.close }>
        <Icon type="cross" size="lg" style={{
          color : '#333'
        }} onClick={closeModal}/>
      </div>
      <h3>申请启坛</h3>
      <h4 className={ styles.title }>{name}</h4>
      <GraySpace size="xs"/>
      <List>
        <InputItem
          type="number"
          {...getFieldProps("number",{
            rules: [
              {
                required : true,
                message : '数量不能为空'
              }
            ]
          })}
          onBlur={()=>{
            const v = getFieldValue('number')
            const min = Math.min(v,number)
            setFieldsValue({
              number : min
            })
          }}
          placeholder="填写启坛数量"
        >
          启坛数量
        </InputItem>
        <DatePicker 
          mode="date"
          minDate={new Date(Date.now())}
          {...getFieldProps('time',{
            initialValue : new Date(Date.now())
          })}
          title="选择启坛时间"
        >
          <ListItem wrap>启坛时间</ListItem>
        </DatePicker>
        <Picker 
          data={harvestType}
          title="请选择"
          {
            ...getFieldProps('type',{
              rules : [
                {
                  required : true,
                  message  : "请选择提货方式"
                }
              ],
              initialValue : [1],
              onChange : (value)=> {
                let v = value.join("")
                if(v === "2" || v === 2){
                  showAd()
                }else {
                  hideAd()
                }
              }
            })
          }
          extra="请选择"
          cols={1}
        >
          <ListItem
            arrow="horizontal"
          >提货方式</ListItem>
        </Picker>
        {
          showAddress ? 
          <Popover 
            visible={popShow}
            overlay={overlays}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            overlayStyle={{ color: 'currentColor' }}
            mask
          >
            <ListItem
              {...getFieldProps('address',{
                initialValue : '',
                rules : [
                  (rule, value, cb)=> {
                    const type = getFieldValue('type');
                    const typeString = type.join('')
                    let error = []
                    if(typeString === "2" && !value ){
                      error.push(new Error('请选择收货地址'))
                    }
                    cb(error)
                  }
                ]
              })}
              onClick={showPop}
              extra={<span>{!!getFieldValue("address") ? getFieldValue("address"):<Icon type="down"/> }</span>}
            >
              收货地址  
            </ListItem> 
          </Popover>  : null
        }
        <InputItem
          type="password"
          {
            ...getFieldProps('payPassword',{
              rules : [
                {
                  required : true,
                  message  : '请输入账户支付密码'
                }
              ],
              
            })
          }
          placeholder="账户支付密码"
        >
          支付密码
        </InputItem>
        <WingBlank>
        <WhiteSpace size="lg"/>
        <Button onClick={()=>{
          validateFields((errors,values)=>{
              if(errors){
                for( let name in errors){
                  let error = getFieldError(name) ? 
                  getFieldError(name).join(',') : null;
                  Toast.fail(error,2)
                  break;
                }
              }else {
                const opt = {
                  ...values,
                  type : values.type.join(""),
                  payPassword : MD5(values.payPassword).toString(),
                  orderId : orderId,
                  time : moment(values.time).format('YYYY-MM-DD')
                }
                onOpen(opt)
              }
            })
          }}
          type='primary'
        >启坛</Button>
        <WhiteSpace size="lg"/>
        </WingBlank>
      </List>
      
    </div>
  )
})
