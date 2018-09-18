import React  from 'react';
import { 
  List,
  InputItem,
  NavBar,
  Icon,
  WhiteSpace,
  Picker,
  Toast,
  Button,
  WingBlank
} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import  GraySpace  from '../../../components/GraySpace'
// import CountDown from '../../../components/CountDown';
import createForm  from 'rc-form/lib/createDOMForm';
import { addresses } from '../../../utils';
const Item = List.Item;
class Form extends React.Component {
  constructor(props){
    super(props)
    this.el = null
  }
  render(){
    const { 
      form : {
        getFieldProps,
        getFieldError,
        validateFields,
        // getFieldValue,
      },
      // disabled,
      // onTimeOver,
      // getAuthCode,
      clickModalBack,
      onOk
     } = this.props;
    // const handleClickAuthCode = (cb) => {
    //   if(disabled) return false;
    //   validateFields(['phone'],(errors)=>{
    //     if(errors){
    //       for( let name in errors){
    //         let error = getFieldError(name) ? 
    //         getFieldError(name).join(',') : null;
    //         Toast.fail(error,2)
    //         break;
    //       }
    //     }else {
    //       cb()
    //       const phoneNum = getFieldValue('phone')
    //       getAuthCode({phone : phoneNum, type: 1})
    //     }
    //   })
    // }
    // const setHeightAndScroll = (h,to) => {
    //   let ch = this.ele.node.offsetHeight;
    //   setTimeout(()=>{
    //     this.ele.node.style= `height:${ch+h}px`
    //     this.ele.node.parentNode.scrollTo({
    //       top : to,
    //       behavior : 'smooth'
    //     })
    //   },200)
    // }
    return (
      <StickyContainer
        ref={ (el)=> this.ele = el }
      >
        <Sticky>
          {
            ({
              style
            })=> (
              <NavBar
                style={{ ...style, zIndex: 5 }}
                mode="light"
                leftContent={<Icon type="left" style={{ color : '#333'}}/>}
                onLeftClick={()=>clickModalBack()}
              >
                绑定银行卡
              </NavBar>
            )
          }
        </Sticky>
        <List>
          <WhiteSpace />
          <InputItem
            {
              ...getFieldProps('bankName',{
                rules : [
                  {
                    required : true,
                    message  : "所属银行不能为空"
                  }
                ]
              })
            }
            placeholder="银行名称"
            autoComplete="off"
            error={!!getFieldError('bankName')}
            onErrorClick={() => {
              Toast.info(getFieldError('bankName').join('、'),3);
            }}
          ><span style={{
            letterSpacing : "8px"
          }}>银行卡</span></InputItem>
          <WhiteSpace />
          <InputItem
            {
              ...getFieldProps('bankNum',{
                rules : [
                  {
                    required : true,
                    message  : "银行卡号不能为空"
                  }
                ]
              })
            }
            placeholder="借记卡或信用卡卡号"
            error={!!getFieldError('bankNum')}
            autoComplete="off"
            onErrorClick={() => {
              Toast.info(getFieldError('bankNum').join('、'),3);
            }}
          ><span style={{
            letterSpacing : "30px"
          }}>卡号</span></InputItem>
          <WhiteSpace />
          <InputItem
            {
              ...getFieldProps('userName',{
                rules : [
                  {
                    required : true,
                    message  : "持卡人姓名不能为空"
                  }
                ]
              })
            }
            placeholder="持卡人姓名"
            autoComplete="off"
            error={!!getFieldError('userName')}
            onErrorClick={() => {
              Toast.info(getFieldError('userName').join('、'),3);
            }}
          ><span style={{
            letterSpacing : "30px"
          }}>姓名</span></InputItem>
          <WhiteSpace />
          <Picker 
            data={addresses}
            title="请选择"
            {
              ...getFieldProps('area',{
                rules : [
                  {
                    required : true,
                    message  : "开户地址不能为空"
                  }
                ]
              })
            }
            extra="请选择区域"
            format={(lables)=>lables.join(' ')}
          >
            <Item
              arrow="horizontal"
            >开户地址</Item>
          </Picker>
          <WhiteSpace />
          <InputItem
            {
              ...getFieldProps('zhName', {
                rules : [
                  {
                    required : true,
                    message  : "请填写开户所在支行"
                  }
                ]
              })
            }
            onBlur={() => { this.ele.node.style = ""} }
            autoComplete="off"
          >开户支行</InputItem>
        </List>
        <GraySpace />
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
          <Button 
            type="warning"
            onClick={()=>{
              validateFields((errors,values)=>{
                if(errors){
                  for( let name in errors){
                    let error = getFieldError(name) ? 
                    getFieldError(name).join(',') : null;
                    Toast.fail(error,2)
                    break;
                  }
                }else {
                  const v = {
                    bankName : values.bankName,
                    bankAddress : values.area.join(','),
                    bankNum : values.bankNum,
                    userName : values.userName,
                    zhName : values.zhName
                  }
                  onOk(v)
                }
              })
            }}
          >确定</Button>
        </WingBlank>
      </StickyContainer>
    )
  }
}

export default createForm()(Form)