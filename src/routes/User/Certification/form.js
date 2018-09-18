import { 
  List,
  InputItem,
  Toast,
  Button,
  WhiteSpace
} from 'antd-mobile';
// import CountDown from '../../../components/CountDown';

import { createForm } from 'rc-form';

export default createForm()(({
  form : {
    getFieldProps,
    getFieldError,
    validateFields,
    // getFieldValue
  },
  // disabled,
  // onTimeOver,
  // getAuthCode,
  loading,
  onOk
})=>{
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
  return (
    <div>
      <List 
        renderHeader={()=>
          <p>为了不影响您的正常使用，请填写您的真实信息。</p> 
        }
        renderFooter={()=>
          <p>完成实名认证后，您的账户将得到更完善的保护。</p>
        }
      >
        <WhiteSpace />
        <InputItem
          {
            ...getFieldProps("realName",{
              rules : [
                {
                  required: true,
                  message : "真实姓名不能为空"
                }
              ]
            })
          }
          labelNumber={5}
          autoComplete="off"
          error={!!getFieldError('realName')}
          onErrorClick={() => {
            Toast.info(getFieldError('realName').join('、'),3);
          }}
        >
          真实姓名
        </InputItem>
        <WhiteSpace />
        <InputItem
          { ...getFieldProps("idCard",{
            rules : [
              {
                required : true,
                message : '身份证号不能为空'
              },{
                pattern : /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                message : "请检查身份号是否正确"
              }
            ]
          })}
          labelNumber={5}
          autoComplete="off"
          error={!!getFieldError('idCard')}
          onErrorClick={() => {
            Toast.info(getFieldError('idCard').join('、'),3);
          }}
        >
          身份证号
        </InputItem>   
      </List>
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
              onOk(values)
            }
          })
        }}
      >确定提交</Button>
    </div>
)})