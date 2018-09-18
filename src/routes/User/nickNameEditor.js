import React, { Fragment } from 'react';
import { 
  InputItem,
  List,
  Button,
  Flex,
  WhiteSpace
} from 'antd-mobile';
import { createForm } from 'rc-form';
export default createForm()(({
  form : {
    getFieldProps,
    getFieldValue
  },
  nickName,
  onClose,
  onOk
}) => (
  <Fragment>
    <List>
      <WhiteSpace />
      <InputItem 
        type="text" 
        {...getFieldProps("nickName",{
          initialValue : nickName
        })}
      >
          昵称
        </InputItem>
    </List>
    <Flex>
      <Flex.Item>
        <Button 
          style={{ marginTop : 20 }}
          type="ghost"
          onClick={()=>{
            const name = getFieldValue("nickName")
            onOk(name)
          }}
        >修改</Button>
      </Flex.Item>
      <Flex.Item>
        <Button
          style={{ marginTop : 20 }}
          type = "warning"
          onClick={onClose}
        >
          取消
        </Button>
      </Flex.Item>
    </Flex>
  </Fragment>
))